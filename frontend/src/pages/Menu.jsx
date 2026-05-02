import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { NAV_ITEMS } from "../constants/themes";
import { ROUTES } from "../constants/routes";
import Header from "../components/Header";
import FloatingBubbles from "../components/FloatingBubbles";
import ThemedButton from "../components/ThemedButton";

const Menu = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden font-cormorant" 
      style={{ background: theme.bg, color: theme.text }}
    >
      <FloatingBubbles />
      <Header retour={ROUTES.dashboard} />

      <main className="flex-1 flex flex-col justify-center items-center px-8 relative z-10 gap-8 text-center">
        <p className="text-[11px] tracking-[0.18em] uppercase font-medium" style={{ opacity: 0.7 }}>
          menu
        </p>

        <h1 className="text-5xl font-light italic leading-tight">
          où veux-tu aller ?
        </h1>

        <div className="w-8 h-[0.5px]" style={{ background: theme.border }} />

        <div className="flex flex-col gap-4 w-full max-w-xs">
          {NAV_ITEMS.map((item) => (
            <ThemedButton 
              key={item.route} 
              variant="outline" 
              onClick={() => navigate(item.route)}
            >
              {item.label}
            </ThemedButton>
          ))}
          
          <ThemedButton variant="ghost" onClick={() => navigate(ROUTES.dashboard)} className="mt-4">
            retour au dashboard
          </ThemedButton>
        </div>
      </main>
    </div>
  );
};

export default Menu;
