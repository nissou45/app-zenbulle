import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const emotions = [
  {
    label: "joyeux",
    value: "joie",
    couleur: "#D4A853",
    bg: "rgba(212,168,83,0.08)",
  },
  {
    label: "calme",
    value: "calme",
    couleur: "#7BA7BC",
    bg: "rgba(123,167,188,0.08)",
  },
  {
    label: "triste",
    value: "triste",
    couleur: "#8B7BA8",
    bg: "rgba(139,123,168,0.08)",
  },
  {
    label: "anxieux",
    value: "anxieux",
    couleur: "#BC7B7B",
    bg: "rgba(188,123,123,0.08)",
  },
  {
    label: "fatigué",
    value: "fatigue",
    couleur: "#8B9E8B",
    bg: "rgba(139,158,139,0.08)",
  },
];

const EmotionDuJour = () => {
  const navigate = useNavigate();

  const handleEmotion = async (emotion) => {
    try {
      await api.post("/moods", { mood: emotion.value });
      localStorage.setItem("moodDuJour", emotion.value);
      navigate("/citations");
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
          padding: "0 32px",
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
          aujourd'hui
        </p>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "40px",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#2C2016",
            lineHeight: 1.15,
          }}
        >
          comment tu te sens ?
        </h1>

        <div
          style={{ width: "32px", height: "0.5px", background: "#D4C5B0" }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "100%",
            maxWidth: "320px",
          }}
        >
          {emotions.map((emotion) => (
            <button
              key={emotion.value}
              onClick={() => handleEmotion(emotion)}
              style={{
                padding: "18px 32px",
                background: emotion.bg,
                border: `0.5px solid ${emotion.couleur}`,
                borderRadius: "40px",
                cursor: "pointer",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "22px",
                color: emotion.couleur,
                letterSpacing: "0.04em",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(0,0,0,0.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = emotion.bg)
              }
            >
              {emotion.label}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EmotionDuJour;
