import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const emotions = [
  { label: "joyeux", emoji: "😊", value: "joie" },
  { label: "calme", emoji: "😌", value: "calme" },
  { label: "triste", emoji: "😔", value: "triste" },
  { label: "anxieux", emoji: "😰", value: "anxieux" },
  { label: "fatigué", emoji: "😴", value: "fatigue" },
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

        {/* Emotions */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {emotions.map((emotion) => (
            <button
              key={emotion.value}
              onClick={() => handleEmotion(emotion)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                padding: "20px 24px",
                background: "rgba(255,255,255,0.6)",
                border: "0.5px solid #D4C5B0",
                borderRadius: "16px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.border = "0.5px solid #2C2016")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.border = "0.5px solid #D4C5B0")
              }
            >
              <span style={{ fontSize: "32px" }}>{emotion.emoji}</span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "15px",
                  color: "#2C2016",
                }}
              >
                {emotion.label}
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EmotionDuJour;
