import { useNavigate } from "react-router-dom";

const ComingSoon = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        minHeight: 220,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "#2193b0",
        fontWeight: 600,
        fontSize: "1.2rem",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(33,147,176,0.07)",
        margin: "0 auto",
        position: "relative",
        maxWidth: 480,
        padding: 32,
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          left: 16,
          top: 16,
          background: "none",
          border: "none",
          fontSize: 24,
          color: "#2193b0",
          cursor: "pointer",
        }}
        aria-label="Back"
      >
        ←
      </button>
      <span style={{ fontSize: "2.2rem", marginBottom: 8 }}>🚧</span>
      {title} — Coming Soon!
    </div>
  );
};

export default ComingSoon;
