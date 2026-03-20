import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Connexion = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setErreur("Email ou mot de passe incorrect");
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
          bon retour
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
          ta bulle t'attend
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
            maxWidth: "360px",
          }}
        >
          <input
            type="email"
            placeholder="ton email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "14px 20px",
              borderRadius: "40px",
              border: "1px solid #D4C5B0",
              background: "rgba(255,255,255,0.6)",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "16px",
              color: "#2C2016",
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="ton mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "14px 20px",
              borderRadius: "40px",
              border: "1px solid #D4C5B0",
              background: "rgba(255,255,255,0.6)",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "16px",
              color: "#2C2016",
              outline: "none",
            }}
          />

          {erreur && (
            <p
              style={{
                color: "#a85100",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {erreur}
            </p>
          )}

          <button
            type="submit"
            style={{
              marginTop: "8px",
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
            entrer dans ma bulle →
          </button>
        </form>

        <Link
          to="/inscription"
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
          pas encore de bulle ? créer un compte
        </Link>
      </main>
    </div>
  );
};

export default Connexion;
