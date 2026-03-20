import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Citations = () => {
  const navigate = useNavigate();
  const [citation, setCitation] = useState("");
  const [loading, setLoading] = useState(true);
  const mood = localStorage.getItem("moodDuJour");

  useEffect(() => {
    api
      .get(`/citations${mood ? `?mood=${mood}` : ""}`)
      .then((res) => setCitation(res.data.text))
      .catch(() => setCitation("prends soin de toi aujourd'hui 🫧"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F0EA",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 32px",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'Caveat Brush', cursive",
            fontSize: "22px",
            color: "#2C2016",
            textDecoration: "none",
          }}
        >
          ZenBulle
        </Link>
        <Link
          to="/dashboard"
          style={{
            fontSize: "13px",
            color: "#8B6F52",
            border: "0.5px solid #D4C5B0",
            borderRadius: "20px",
            padding: "6px 16px",
            textDecoration: "none",
          }}
        >
          retour
        </Link>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 48px",
          gap: "40px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            color: "#8B6F52",
            textTransform: "uppercase",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          pour toi aujourd'hui
        </p>

        <div
          style={{ width: "32px", height: "0.5px", background: "#D4C5B0" }}
        />

        {loading ? (
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              color: "#8B6F52",
              fontSize: "20px",
            }}
          >
            chargement...
          </p>
        ) : (
          <blockquote
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "28px",
              fontWeight: 300,
              color: "#2C2016",
              lineHeight: 1.6,
              maxWidth: "520px",
              margin: 0,
            }}
          >
            "{citation}"
          </blockquote>
        )}

        <div
          style={{ width: "32px", height: "0.5px", background: "#D4C5B0" }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => navigate("/journal")}
            style={{
              padding: "14px 40px",
              background: "transparent",
              color: "#2C2016",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "18px",
              border: "1px solid #2C2016",
              borderRadius: "40px",
              cursor: "pointer",
            }}
          >
            écrire dans mon journal →
          </button>

          <Link
            to="/dashboard"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              color: "#8B6F52",
              fontSize: "14px",
              textDecoration: "none",
              borderBottom: "0.5px solid #8B6F52",
              paddingBottom: "2px",
            }}
          >
            retourner à ma bulle
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Citations;
