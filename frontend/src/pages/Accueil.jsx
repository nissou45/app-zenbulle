import { useNavigate } from "react-router-dom";

const Accueil = () => {
  const navigate = useNavigate();

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
        <span
          style={{
            fontFamily: "'Caveat Brush', cursive",
            fontSize: "22px",
            color: "#2C2016",
          }}
        >
          ZenBulle
        </span>
        <button
          onClick={() => navigate("/menu")}
          style={{
            fontSize: "13px",
            color: "#8B6F52",
            border: "0.5px solid #D4C5B0",
            borderRadius: "20px",
            padding: "6px 16px",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          menu
        </button>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 32px",
          textAlign: "center",
          gap: "24px",
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
          ton espace intérieur
        </p>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "48px",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#2C2016",
            lineHeight: 1.15,
          }}
        >
          ferme les yeux
          <br />
          sur le monde
        </h1>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "18px",
            color: "#8B6F52",
            lineHeight: 1.8,
          }}
        >
          un moment rien que pour toi.
          <br />
          respire, ressens, écris.
        </p>

        <div
          style={{ width: "32px", height: "0.5px", background: "#D4C5B0" }}
        />

        <button
          onClick={() => navigate("/connexion")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "transparent",
            color: "#2C2016",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "18px",
            padding: "14px 40px",
            border: "1px solid #2C2016",
            borderRadius: "40px",
            cursor: "pointer",
          }}
        >
          découvrir ma bulle <span>→</span>
        </button>

        <button
          onClick={() => navigate("/inscription")}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            color: "#2C2016",
            fontSize: "14px",
            background: "transparent",
            border: "none",
            borderBottom: "1px solid #2C2016",
            cursor: "pointer",
            paddingBottom: "2px",
          }}
        >
          quelques questions pour commencer
        </button>
      </main>
    </div>
  );
};

export default Accueil;
