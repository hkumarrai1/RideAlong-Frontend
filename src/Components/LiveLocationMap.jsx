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
        height: 180,
        width: "100%",
        maxWidth: 420,
        margin: "12px auto",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(33,147,176,0.10)",
        background: "rgba(255,255,255,0.10)",
        padding: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        overflow: "hidden",
        touchAction: "none",
        userSelect: "none",
        fontSize: "0.93rem",
      }}
    >
      <MapContainer
        center={position || [20, 77]}
        zoom={15}
        scrollWheelZoom={true}
        style={{
          height: 140,
          width: "100%",
          borderRadius: 8,
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
