import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { ROUTES } from "../constants/routes";
import { STORAGE_KEYS } from "../constants/storage";
import api from "../services/api";
import Header from "../components/Header";
import FloatingBubbles from "../components/FloatingBubbles";
import ThemedButton from "../components/ThemedButton";

const Citations = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [citation, setCitation] = useState("");
  const [loading, setLoading] = useState(true);
  const mood = localStorage.getItem(STORAGE_KEYS.mood);

  useEffect(() => {
    let isMounted = true;
    api
      .get(`/citations${mood ? `?mood=${mood}` : ""}`)
      .then((res) => {
        if (isMounted) setCitation(res.data.text);
      })
      .catch(() => {
        if (isMounted) setCitation("sois doux avec toi-même aujourd'hui");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, [mood]);

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden font-cormorant text-center" 
      style={{ background: theme.bg, color: theme.text }}
    >
      <FloatingBubbles />
      <Header retour={ROUTES.dashboard} />

      <main className="flex-1 flex flex-col justify-center items-center px-12 relative z-10 gap-10">
        <p className="text-[11px] tracking-[0.18em] uppercase font-medium" style={{ opacity: 0.7 }}>
          pour toi aujourd'hui
        </p>

        <div className="w-8 h-[0.5px]" style={{ background: theme.border }} />

        {loading ? (
          <p className="italic text-xl opacity-60">
            chargement...
          </p>
        ) : (
          <blockquote className="italic text-[28px] font-light leading-[1.6] max-w-[520px] m-0">
            "{citation}"
          </blockquote>
        )}

        <div className="w-8 h-[0.5px]" style={{ background: theme.border }} />

        <ThemedButton variant="primary" onClick={() => navigate(ROUTES.journal)}>
          écrire dans mon journal →
        </ThemedButton>
      </main>
    </div>
  );
};

export default Citations;
