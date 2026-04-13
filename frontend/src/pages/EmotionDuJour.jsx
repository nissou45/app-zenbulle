import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";

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
  const [error, setError] = useState("");

  const handleEmotion = async (emotion) => {
    try {
      await api.post("/moods", { mood: emotion.value });
      localStorage.setItem("moodDuJour", emotion.value);
      navigate("/citations");
    } catch {
      setError("une erreur est survenue, réessaie");
    }
  };

  return (
    <div className="min-h-screen bg-ivoire flex flex-col">
      <Header retour="/dashboard" />

      <main className="flex-1 flex flex-col justify-center items-center px-8 gap-10 text-center">
        <p className="text-[11px] tracking-[0.18em] text-terre uppercase font-cormorant">
          aujourd'hui
        </p>

        <h1 className="font-cormorant text-[40px] font-light italic text-encre leading-[1.15]">
          comment tu te sens ?
        </h1>

        <div className="w-8 h-[0.5px] bg-sable" />

        {error && (
          <p className="font-cormorant italic text-[15px] text-terre">{error}</p>
        )}

        <div className="flex flex-col gap-3 w-full max-w-xs">
          {emotions.map((emotion) => (
            <button
              key={emotion.value}
              onClick={() => handleEmotion(emotion)}
              style={{
                background: emotion.bg,
                border: `0.5px solid ${emotion.couleur}`,
                color: emotion.couleur,
              }}
              className="px-8 py-[18px] rounded-[40px] cursor-pointer font-cormorant italic text-[22px] tracking-[0.04em] transition-all"
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
