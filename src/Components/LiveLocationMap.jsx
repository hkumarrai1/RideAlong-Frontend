import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 👇 Recenter the map whenever position updates
const RecenterMap = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), {
        animate: true,
        duration: 0.5,
        easeLinearity: 0.25,
      });
    }
  }, [position, map]);

  return null;
};

const LiveLocationMap = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div
      style={{
        height: 340, // Larger for desktop
        width: "100%",
        maxWidth: 540, // Wider for desktop
        margin: "32px auto",
        borderRadius: 16,
        boxShadow: "0 4px 18px rgba(255,0,0,0.10)",
        background: "rgba(255,255,255,0.12)",
        padding: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        overflow: "hidden",
        touchAction: "none",
        userSelect: "none",
        fontSize: "0.97rem",
      }}
    >
      <MapContainer
        center={position || [20, 77]}
        zoom={15}
        scrollWheelZoom={true}
        style={{
          height: 320,
          width: "100%",
          borderRadius: 14,
          maxWidth: "100vw",
          minWidth: 0,
        }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        {position && (
          <>
            <Marker position={position} />
            <RecenterMap position={position} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default LiveLocationMap;
