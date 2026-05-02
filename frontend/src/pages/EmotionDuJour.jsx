import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { ROUTES } from "../constants/routes";
import { STORAGE_KEYS } from "../constants/storage";
import { EMOTIONS } from "../constants/emotions";
import api from "../services/api";
import Header from "../components/Header";
import FloatingBubbles from "../components/FloatingBubbles";

const EmotionDuJour = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmotion = async (emotion) => {
    setIsSubmitting(true);
    try {
      await api.post("/moods", { mood: emotion.value });
      localStorage.setItem(STORAGE_KEYS.mood, emotion.value);
      navigate(ROUTES.citations);
    } catch {
      setError("une erreur est survenue, réessaie");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden font-cormorant" 
      style={{ background: theme.bg, color: theme.text }}
    >
      <FloatingBubbles />
      <Header retour={ROUTES.dashboard} />

      <main className="flex-1 flex flex-col justify-center items-center px-8 relative z-10 gap-10 text-center">
        <p className="text-[11px] tracking-[0.18em] uppercase font-medium" style={{ opacity: 0.7 }}>
          aujourd'hui
        </p>

        <h1 className="text-[40px] font-light italic leading-tight">
          comment tu te sens ?
        </h1>

        <div className="w-8 h-[0.5px]" style={{ background: theme.border }} />

        {error && (
          <p className="italic text-[15px] text-[#a85100]">{error}</p>
        )}

        <div className="flex flex-col gap-3 w-full max-w-xs">
          {EMOTIONS.map((emotion) => (
            <button
              key={emotion.value}
              onClick={() => handleEmotion(emotion)}
              disabled={isSubmitting}
              style={{
                background: `rgba(${parseInt(emotion.hex.slice(1,3), 16)}, ${parseInt(emotion.hex.slice(3,5), 16)}, ${parseInt(emotion.hex.slice(5,7), 16)}, 0.08)`,
                border: `0.5px solid ${emotion.hex}`,
                color: emotion.hex,
              }}
              className={`px-8 py-[18px] rounded-[40px] italic text-[22px] tracking-[0.04em] transition-all font-cormorant ${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-black/5"}`}
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
