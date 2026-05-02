import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { ROUTES } from "../constants/routes";
import api from "../services/api";
import Header from "../components/Header";
import FloatingBubbles from "../components/FloatingBubbles";
import ThemedButton from "../components/ThemedButton";

const Journal = () => {
  const { theme } = useTheme();
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setMessage("écris quelque chose avant d'envoyer ta bulle 🫧");
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post("/journal", { content });
      setContent("");
      setMessage("ta bulle est enregistrée 🫶");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("une erreur est survenue");
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

      <main className="flex-1 flex flex-col justify-center items-center px-8 relative z-10 gap-8">
        <p className="text-[11px] tracking-[0.18em] uppercase font-medium opacity-70">
          ce soir
        </p>

        <h1 className="text-[40px] font-light italic leading-[1.15] text-center">
          journal du soir
        </h1>

        <div className="w-8 h-[0.5px]" style={{ background: theme.border }} />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-[480px]">
          <textarea
            placeholder="écris ta pensée du soir..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="px-6 py-5 rounded-[20px] border bg-white/40 font-cormorant text-[17px] outline-none resize-none leading-[1.8] transition-all focus:bg-white/60"
            style={{ borderColor: theme.border, color: theme.text }}
          />

          {message && (
            <p className="italic text-[15px] text-center opacity-80">
              {message}
            </p>
          )}

          <ThemedButton type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Envoi..." : "envoyer ma bulle →"}
          </ThemedButton>
        </form>

        <ThemedButton variant="ghost" onClick={() => window.location.href = ROUTES.mesBulles}>
          voir mes bulles précédentes
        </ThemedButton>
      </main>
    </div>
  );
};

export default Journal;
