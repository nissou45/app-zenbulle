import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Journal = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setMessage("écris quelque chose avant d'envoyer ta bulle 🫧");
      return;
    }
    try {
      await api.post("/journal", { content });
      setContent("");
      setMessage("ta bulle est enregistrée 🫶");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("une erreur est survenue");
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 32px",
          gap: "32px",
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
          ce soir
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
          }}
        >
          journal du soir
        </h1>

        <div
          style={{ width: "32px", height: "0.5px", background: "#D4C5B0" }}
        />

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            width: "100%",
            maxWidth: "480px",
          }}
        >
          <textarea
            placeholder="écris ta pensée du soir..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            style={{
              padding: "20px 24px",
              borderRadius: "20px",
              border: "1px solid #D4C5B0",
              background: "rgba(255,255,255,0.6)",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "17px",
              color: "#2C2016",
              outline: "none",
              resize: "none",
              lineHeight: 1.8,
            }}
          />

          {message && (
            <p
              style={{
                color: "#8B6F52",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
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
            envoyer ma bulle →
          </button>
        </form>

        <Link
          to="/mes-bulles"
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
          voir mes bulles précédentes
        </Link>
      </main>
    </div>
  );
};

export default Journal;
