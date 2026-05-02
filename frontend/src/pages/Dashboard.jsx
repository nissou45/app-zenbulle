import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { ROUTES } from "../constants/routes";
import { MOOD_COLORS } from "../constants/emotions";
import api from "../services/api";
import Header from "../components/Header";
import FloatingBubbles from "../components/FloatingBubbles";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [moods, setMoods] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await api.get("/moods");
        setMoods(res.data);
        calculateStreak(res.data);
      } catch (err) {
        console.error("Erreur chargement moods", err);
      }
    };
    fetchMoods();
  }, []);

  const calculateStreak = (history) => {
    if (!history.length) return;
    let currentStreak = 0;
    const today = new Date().setHours(0, 0, 0, 0);
    
    // Simplification : on compte les jours uniques consécutifs
    const uniqueDays = [...new Set(history.map(m => new Date(m.date).setHours(0, 0, 0, 0)))].sort((a, b) => b - a);
    
    let lastDate = today;
    if (uniqueDays[0] < today - 86400000) {
       setStreak(0);
       return;
    }

    for (let day of uniqueDays) {
      if (day === lastDate || day === lastDate - 86400000) {
        currentStreak++;
        lastDate = day;
      } else {
        break;
      }
    }
    setStreak(currentStreak);
  };

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return "BON MATIN";
    if (hour >= 12 && hour < 18) return "BONNE JOURNÉE";
    if (hour >= 18 && hour < 22) return "BONNE SOIRÉE";
    return "BONNE NUIT";
  };

  const getWeekDays = () => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Dimanche
    
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const mood = moods.find(m => new Date(m.date).toDateString() === d.toDateString());
      return {
        label: ['D', 'L', 'M', 'M', 'J', 'V', 'S'][i],
        color: mood ? MOOD_COLORS[mood.label] : null,
        isToday: d.toDateString() === now.toDateString()
      };
    });
  };

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.accueil);
  };

  const tiles = [
    { label: "respirer", sub: "exercice guidé", icon: "🫧", route: ROUTES.respiration },
    { label: "émotion du jour", sub: "comment je me sens", icon: "🫧", route: ROUTES.emotion },
    { label: "journal du soir", sub: "écrire ma pensée", icon: "🌙", route: ROUTES.journal },
    { label: "tes bulles", sub: "relire mes écrits", icon: "✦", route: ROUTES.mesBulles },
  ];

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden font-cormorant" 
      style={{ background: theme.bg, color: theme.text }}
    >
      <FloatingBubbles />
      <Header retour={ROUTES.menu} />

      <main className="flex-1 flex flex-col px-6 py-4 gap-8 relative z-10 max-w-[500px] mx-auto w-full">
        
        {/* CARTE HERO */}
        <section 
          className="p-8 rounded-[24px] flex justify-between items-start relative overflow-hidden"
          style={{ background: theme.cardGrad }}
        >
          <div className="flex flex-col gap-1">
            <p className="text-[10px] tracking-[0.2em] font-medium opacity-60">
              {getTimeGreeting()}
            </p>
            <h1 className="text-[44px] font-light italic leading-tight">
              {theme.greet(user?.pseudo)}
            </h1>
            <p className="text-[13px] opacity-60">
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div 
              className="w-11 h-11 rounded-full flex items-center justify-center text-xl"
              style={{ background: theme.accent, color: '#fff' }}
            >
              {new Date().getHours() >= 6 && new Date().getHours() < 20 ? "☀️" : "🌙"}
            </div>
            {streak > 0 && (
              <div className="bg-white/40 px-3 py-1 rounded-full text-[12px] font-medium flex items-center gap-1 border border-white/20">
                🔥 {streak}
              </div>
            )}
          </div>
        </section>

        {/* SECTION TA SEMAINE */}
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center text-[10px] tracking-[0.2em] font-medium opacity-50">
            <span>TA SEMAINE</span>
            <span className="cursor-pointer">30 JOURS →</span>
          </div>
          
          <div className="flex justify-between items-center px-2">
            {getWeekDays().map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all border"
                  style={{ 
                    backgroundColor: day.color || 'transparent',
                    borderColor: day.isToday ? theme.accent : (day.color ? 'transparent' : theme.border),
                    borderWidth: day.isToday ? '2px' : '1px'
                  }}
                />
                <span className="text-[10px] font-medium opacity-40">{day.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* GRILLE NAVIGATION */}
        <section className="grid grid-cols-2 gap-4">
          {tiles.map((tile) => (
            <button
              key={tile.route}
              onClick={() => navigate(tile.route)}
              className="flex flex-col gap-4 p-5 rounded-[20px] bg-white/70 border border-transparent transition-all hover:-translate-y-1 text-left cursor-pointer"
              style={{ borderColor: theme.border }}
            >
              <span className="text-xl">{tile.icon}</span>
              <div className="flex flex-col">
                <span className="text-[18px] italic font-light">{tile.label}</span>
                <span className="text-[11px] opacity-50">{tile.sub}</span>
              </div>
            </button>
          ))}
        </section>

        {/* BAS DE PAGE */}
        <button
          onClick={handleLogout}
          className="self-center mt-4 bg-transparent border-0 italic text-[14px] opacity-40 hover:opacity-100 transition-opacity cursor-pointer"
          style={{ color: theme.text }}
        >
          se déconnecter
        </button>

      </main>
    </div>
  );
};

export default Dashboard;
