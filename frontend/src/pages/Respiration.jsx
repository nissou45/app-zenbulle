import { useState, useEffect } from "react";
import Header from "../components/Header";

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
    <div className="min-h-screen bg-ivoire flex flex-col">
      <Header retour="/dashboard" />

      <main className="flex-1 flex flex-col justify-center items-center px-8 gap-10">
        <p className="text-[11px] tracking-[0.18em] text-terre uppercase font-cormorant">
          prends un moment
        </p>

        <h1 className="font-cormorant text-[40px] font-light italic text-encre">
          respiration guidée
        </h1>

        <div className="w-8 h-[0.5px] bg-sable" />

        <div
          className={`w-40 h-40 rounded-full border border-sable bg-white/50 flex items-center justify-center transition-transform duration-[800ms] ease-in-out ${phaseIndex === 2 ? "scale-90" : "scale-[1.2]"}`}
        >
          <div className="w-20 h-20 rounded-full bg-sable opacity-50" />
        </div>

        <p className="font-cormorant italic text-2xl text-encre">
          {actif ? phases[phaseIndex].label : "bravo, c'est terminé 🫧"}
        </p>

        <p className="font-cormorant text-lg text-terre">
          {`0:${timer < 10 ? "0" + timer : timer}`}
        </p>

        <button
          onClick={reset}
          className="px-10 py-3.5 bg-transparent text-encre font-cormorant italic text-lg border border-encre rounded-[40px] cursor-pointer"
        >
          recommencer
        </button>
      </main>
    </div>
  );
};

export default Respiration;
