import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const phases = [
  { label: "inspire...", duree: 4000 },
  { label: "bloque...", duree: 2000 },
  { label: "expire...", duree: 6000 },
];

const Respiration = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timer, setTimer] = useState(60);
  const [actif, setActif] = useState(true);

  useEffect(() => {
    if (!actif) return;

    const phase = phases[phaseIndex];
    const timeout = setTimeout(() => {
      setPhaseIndex((prev) => (prev + 1) % phases.length);
    }, phase.duree);

    return () => clearTimeout(timeout);
  }, [phaseIndex, actif]);

  useEffect(() => {
    if (!actif) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setActif(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [actif]);

  const reset = () => {
    setTimer(60);
    setPhaseIndex(0);
    setActif(true);
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
          gap: "40px",
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
          prends un moment
        </p>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "40px",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#2C2016",
          }}
        >
          respiration guidée
        </h1>

        <div
          style={{ width: "32px", height: "0.5px", background: "#D4C5B0" }}
        />

        {/* Cercle animé */}
        <div
          style={{
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            border: "1px solid #D4C5B0",
            background: "rgba(255,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.8s ease",
            transform:
              phaseIndex === 0
                ? "scale(1.2)"
                : phaseIndex === 1
                  ? "scale(1.2)"
                  : "scale(0.9)",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "#D4C5B0",
              opacity: 0.5,
            }}
          />
        </div>

        {/* Phase */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "24px",
            color: "#2C2016",
          }}
        >
          {actif ? phases[phaseIndex].label : "bravo, c'est terminé 🫧"}
        </p>

        {/* Timer */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "18px",
            color: "#8B6F52",
          }}
        >
          {`0:${timer < 10 ? "0" + timer : timer}`}
        </p>

        {/* Bouton reset */}
        <button
          onClick={reset}
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
          recommencer
        </button>
      </main>
    </div>
  );
};

export default Respiration;
