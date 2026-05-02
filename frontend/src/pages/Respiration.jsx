import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { ROUTES } from "../constants/routes";
import { PHASES, DUREE_EXERCICE } from "../constants/respiration";
import Header from "../components/Header";
import FloatingBubbles from "../components/FloatingBubbles";
import ThemedButton from "../components/ThemedButton";
import { useBreakpoint } from "../hooks/useBreakpoint";

const Respiration = () => {
  const { theme } = useTheme();
  const { isDesktop, isTablet } = useBreakpoint();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timer, setTimer] = useState(DUREE_EXERCICE);
  const [actif, setActif] = useState(true);

  useEffect(() => {
    if (!actif) return;

    const phase = PHASES[phaseIndex];
    const timeout = setTimeout(() => {
      setPhaseIndex((prev) => (prev + 1) % PHASES.length);
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
    setTimer(DUREE_EXERCICE);
    setPhaseIndex(0);
    setActif(true);
  };

  const bubbleSize = isDesktop ? '220px' : isTablet ? '200px' : '160px';

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden font-cormorant" 
      style={{ background: theme.bg, color: theme.text }}
    >
      <FloatingBubbles />
      <Header retour={ROUTES.dashboard} />

      <main 
        className="flex-1 flex flex-col justify-center items-center px-8 relative z-10 gap-10"
        style={{
          maxWidth: isDesktop ? '480px' : isTablet ? '600px' : '100%',
          margin: (isDesktop || isTablet) ? '0 auto' : '0'
        }}
      >
        <p className="text-[11px] tracking-[0.18em] uppercase font-medium style={{ opacity: 0.7 }}">
          prends un moment
        </p>

        <h1 className="text-[40px] font-light italic">
          respiration guidée
        </h1>

        <div className="w-8 h-[0.5px]" style={{ background: theme.border }} />

        <div
          className="rounded-full border flex items-center justify-center transition-transform duration-[800ms] ease-in-out bg-white/50"
          style={{ 
            width: bubbleSize,
            height: bubbleSize,
            borderColor: theme.border,
            transform: phaseIndex === 2 ? 'scale(0.9)' : 'scale(1.2)'
          }}
        >
          <div className="w-20 h-20 rounded-full opacity-50" style={{ background: theme.accent }} />
        </div>

        <p className="italic text-2xl">
          {actif ? PHASES[phaseIndex].label : "bravo, c'est terminé 🫧"}
        </p>

        <p className="text-lg opacity-70">
          {`0:${timer < 10 ? "0" + timer : timer}`}
        </p>

        <ThemedButton variant="outline" onClick={reset}>
          recommencer
        </ThemedButton>
      </main>
    </div>
  );
};

export default Respiration;
