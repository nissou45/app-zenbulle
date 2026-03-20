import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const MesBulles = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/journal")
      .then((res) => setEntries(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/journal/${id}`);
      setEntries(entries.filter((e) => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F0EA",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
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

      {/* Contenu */}
      <main
        style={{
          flex: 1,
          padding: "32px",
          maxWidth: "600px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            color: "#8B6F52",
            textTransform: "uppercase",
            fontFamily: "'Cormorant Garamond', serif",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          ton voyage intérieur
        </p>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "40px",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#2C2016",
            lineHeight: 1.15,
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          mes bulles
        </h1>

        {loading && (
          <p
            style={{
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              color: "#8B6F52",
            }}
          >
            chargement...
          </p>
        )}

        {!loading && entries.length === 0 && (
          <p
            style={{
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              color: "#8B6F52",
              fontSize: "18px",
            }}
          >
            tu n'as encore écrit aucune bulle 🫧
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {entries.map((entry) => (
            <div
              key={entry.id}
              style={{
                background: "rgba(255,255,255,0.6)",
                border: "0.5px solid #D4C5B0",
                borderRadius: "16px",
                padding: "20px 24px",
                position: "relative",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  color: "#8B6F52",
                  fontFamily: "'Cormorant Garamond', serif",
                  marginBottom: "10px",
                }}
              >
                {new Date(entry.created_at).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "17px",
                  color: "#2C2016",
                  lineHeight: 1.8,
                  whiteSpace: "pre-wrap",
                }}
              >
                {entry.content}
              </p>

              <button
                onClick={() => handleDelete(entry.id)}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#D4C5B0",
                  fontSize: "16px",
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MesBulles;
