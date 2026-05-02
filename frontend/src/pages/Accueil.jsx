import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useTheme } from "../hooks/useTheme";
import { THEMES } from "../constants/themes";
import { ROUTES } from "../constants/routes";
import FloatingBubbles from "../components/FloatingBubbles";

const Accueil = () => {
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  const handleSelectTheme = (key) => {
    setTheme(key);
    navigate(ROUTES.connexion);
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden font-cormorant" 
      style={{ background: 'linear-gradient(160deg,#FAF7F3,#F3EFF8,#F0F5FA)' }}
    >
      <FloatingBubbles bubbleColor="rgba(180,160,200,0.13)" bubbleBorder="rgba(180,160,200,0.31)" />
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-8 text-center relative z-10 gap-10">
        <div className="flex flex-col gap-2">
          <p className="text-[11px] tracking-[0.25em] text-terre uppercase font-medium">
            BIENVENUE
          </p>
          <h1 className="text-[42px] font-light italic text-encre leading-tight">
            quelle est ta bulle ?
          </h1>
        </div>

        <div className="w-8 h-[0.5px] bg-sable/50" />

        <div className="flex flex-col gap-4 w-full max-w-[400px]">
          {Object.values(THEMES).map((t) => (
            <button
              key={t.key}
              onClick={() => handleSelectTheme(t.key)}
              className="flex items-center justify-between p-6 rounded-[22px] border transition-all hover:-translate-y-0.5 group text-left cursor-pointer"
              style={{ 
                background: t.cardGrad, 
                borderColor: t.border,
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
              }}
            >
              <div className="flex items-center gap-5">
                <div className="relative w-10 h-10 flex items-center justify-center">
                   <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="15" cy="15" r="8" fill={t.accent} fillOpacity="0.2" stroke={t.accent} strokeWidth="0.5"/>
                      <circle cx="25" cy="22" r="10" fill={t.accent} fillOpacity="0.15" stroke={t.accent} strokeWidth="0.5"/>
                      <circle cx="18" cy="28" r="6" fill={t.accent} fillOpacity="0.1" stroke={t.accent} strokeWidth="0.5"/>
                   </svg>
                </div>
                
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-medium tracking-wide uppercase" style={{ color: t.accent }}>
                    {t.age}
                  </span>
                  <span className="text-[24px] italic font-light text-encre">
                    {t.name}
                  </span>
                  <span className="text-[13px] font-light opacity-60 italic" style={{ color: t.text }}>
                    {t.tagline}
                  </span>
                </div>
              </div>
              
              <span className="text-2xl font-light opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: t.text }}>
                ›
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Accueil;
