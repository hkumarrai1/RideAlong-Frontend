import { useState, useEffect, useRef } from "react";
import axiosInstance from "./axiosInstance";
import Loading from "./Loading";
import styles from "./NormalRide.module.css";
import fetchLatLonFromAddress from "../../utility/fetchLatLonFromAddress";

const NormalRide = ({ setRideOptions }) => {
  const [CurrentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);
  const debounceRef = useRef();
  const destinationDebounceRef = useRef();

  const handleSearchRides = async () => {
    try {
      setLoading(true);
      setError("");
      const currentLocCoords = await fetchLatLonFromAddress(CurrentLocation);
      const destCoords = await fetchLatLonFromAddress(destination);
      if (!currentLocCoords || !destCoords) {
        setError("Could not geocode one or both addresses.");
        setLoading(false);
        return;
      }
      const response = await axiosInstance.post("/api/rides/bookRide", {
        currentLocation: currentLocCoords,
        destination: destCoords,
      });
      setRideOptions(response.data.options || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Error fetching ride options. See console for details.");
    }
  };

  const fetchAddress = async (lat, lon) => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEOAPIFY_KEY;
      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        setCurrentLocation(
          data.features[0].properties.formatted ||
            data.features[0].properties.address_line1 ||
            data.features[0].properties.city ||
            "Address not found"
        );
      } else {
        setCurrentLocation("Address not found");
      }
    } catch (err) {
      setCurrentLocation("Error fetching address");
    } finally {
      setLoading(false);
    }
  };

  // Generic fetchSuggestions for both fields
  const fetchSuggestions = async (input, setFn) => {
    if (!input) {
      setFn([]);
      return;
    }
    const apiKey = import.meta.env.VITE_GEOAPIFY_KEY;
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      input
    )}&limit=5&apiKey=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setFn(data.features || []);
    } catch {
      setFn([]);
    }
  };

  const handleCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchAddress(lat, lon);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCurrentLocation(value);
    setSuggestions([]);
    setFocusedInput("current"); // Ensure suggestions show on typing
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value, setSuggestions);
    }, 200);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    setDestinationSuggestions([]);
    setFocusedInput("destination"); // Ensure suggestions show on typing
    if (destinationDebounceRef.current)
      clearTimeout(destinationDebounceRef.current);
    destinationDebounceRef.current = setTimeout(() => {
      fetchSuggestions(value, setDestinationSuggestions);
    }, 400);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setCurrentLocation(
      suggestion.properties.formatted ||
        suggestion.properties.address_line1 ||
        suggestion.properties.city ||
        ""
    );
    setSuggestions([]);
  };

  const handleDestinationSuggestionClick = (suggestion) => {
    setDestination(
      suggestion.properties.formatted ||
        suggestion.properties.address_line1 ||
        suggestion.properties.city ||
        ""
    );
    setDestinationSuggestions([]);
  };

  return (
    <div className={styles.normalRideContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          name="CurrentLocation"
          value={CurrentLocation}
          onChange={handleInputChange}
          onFocus={() => setFocusedInput("current")}
          onBlur={() => setTimeout(() => setFocusedInput(null), 150)}
          onClick={() => {
            if (!CurrentLocation) {
              handleCurrentLocation();
            }
          }}
          placeholder="Enter Current Location or just Click To fetch it"
          className={styles.normalRideInput}
          autoComplete="off"
        />
        {suggestions.length > 0 && focusedInput === "current" && (
          <ul className={styles.suggestionList}>
            {suggestions.map((s, idx) => (
              <li
                key={(s.properties.place_id || "") + "-" + idx}
                className={styles.suggestionItem}
                onMouseDown={() => handleSuggestionClick(s)} // changed from onClick to onMouseDown
              >
                {s.properties.formatted ||
                  s.properties.address_line1 ||
                  s.properties.city}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          name="destination"
          value={destination}
          onChange={handleDestinationChange}
          onFocus={() => setFocusedInput("destination")}
          onBlur={() => setTimeout(() => setFocusedInput(null), 150)}
          placeholder="Enter Destination"
          className={styles.normalRideInput}
          autoComplete="off"
          style={{ marginTop: 18 }}
        />
        {destinationSuggestions.length > 0 &&
          focusedInput === "destination" && (
            <ul className={styles.suggestionList}>
              {destinationSuggestions.map((s, idx) => (
                <li
                  key={(s.properties.place_id || "") + "-" + idx}
                  className={styles.suggestionItem}
                  onMouseDown={() => handleDestinationSuggestionClick(s)} // changed from onClick to onMouseDown
                >
                  {s.properties.formatted ||
                    s.properties.address_line1 ||
                    s.properties.city}
                </li>
              ))}
            </ul>
          )}
      </div>
      <button
        className={styles.searchRideBtn}
        style={{ marginTop: 32 }}
        onClick={handleSearchRides}
      >
        Search For Rides
      </button>
      {loading && (
        <div className={styles.normalRideLoaderOverlay}>
          <Loading type="circle" />
        </div>
      )}
    </div>
  );
};

export default NormalRide;
