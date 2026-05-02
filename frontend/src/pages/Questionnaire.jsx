import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { ROUTES } from "../constants/routes";
import { STORAGE_KEYS } from "../constants/storage";
import { QUESTIONS } from "../constants/questions";
import FloatingBubbles from "../components/FloatingBubbles";

const Questionnaire = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [step, setStep] = useState(0);
  const [reponses, setReponses] = useState({});

  const currentQuestion = QUESTIONS[step];

  const handleOptionClick = (option) => {
    const updatedReponses = { ...reponses, [currentQuestion.name]: option };
    setReponses(updatedReponses);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem(STORAGE_KEYS.prefs, JSON.stringify(updatedReponses));
      navigate(ROUTES.dashboard);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigate(ROUTES.accueil);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden font-cormorant" 
      style={{ background: theme.bg, color: theme.text }}
    >
      <FloatingBubbles />

      {/* Header personnalisé */}
      <header className="flex justify-between items-center px-8 py-6 relative z-20">
        <button 
          onClick={handleBack}
          className="bg-transparent border-0 cursor-pointer text-sm tracking-wide opacity-70 hover:opacity-100 transition-opacity flex items-center gap-2"
          style={{ color: theme.text }}
        >
          ← retour
        </button>
        <span className="text-[13px] font-medium opacity-50" style={{ color: theme.muted }}>
          {step + 1} / {QUESTIONS.length}
        </span>
      </header>

      <main 
        key={step} // Force le re-render pour l'animation fadeIn
        className="flex-1 flex flex-col items-center justify-center px-8 pb-12 relative z-10 gap-10 animate-fadeIn"
      >
        <div className="flex flex-col gap-2 items-center text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase font-medium opacity-70">
            AVANT DE COMMENCER
          </p>
          <h1 className="text-[40px] font-light italic leading-tight max-w-[600px]">
            {currentQuestion.question}
          </h1>
        </div>

        <div className="w-8 h-[0.5px]" style={{ background: theme.border }} />

        <div className="flex flex-col gap-3 w-full max-w-[420px]">
          {currentQuestion.options.map((option) => {
            const isSelected = reponses[currentQuestion.name] === option;
            return (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="flex items-center px-6 py-[18px] rounded-[16px] border transition-all hover:-translate-y-0.5 text-left cursor-pointer"
                style={{ 
                  background: isSelected ? theme.cardGrad : "rgba(255, 255, 255, 0.7)",
                  borderColor: isSelected ? theme.accent : theme.border,
                  boxShadow: isSelected ? `0 4px 15px ${theme.accent}20` : 'none'
                }}
              >
                <span className="text-[17px] font-medium leading-normal">
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Questionnaire;
