import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(ROUTES.selectionTheme);
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden animate-fadeIn"
      style={{ background: 'linear-gradient(160deg, #FAF7FF, #F0ECFF, #F5F0FF)' }}
    >
      {/* Grande bulle centrale */}
      <div 
        className="w-40 h-40 rounded-full animate-pulse-gentle"
        style={{ 
          background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), rgba(176,144,216,0.25))',
          border: '1px solid rgba(176,144,216,0.3)',
          boxShadow: '0 0 60px rgba(176,144,216,0.2)'
        }}
      />

      {/* Logo */}
      <h1 
        className="mt-8 text-4xl"
        style={{ fontFamily: "'Caveat Brush', cursive", color: '#2A1838' }}
      >
        ZenBulle
      </h1>

      {/* Sous-titre */}
      <p 
        className="mt-2 text-[10px] font-medium tracking-[0.22em] uppercase"
        style={{ color: 'rgba(42,24,56,0.4)' }}
      >
        ton espace intérieur
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulseGentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-pulse-gentle {
          animation: pulseGentle 2.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
