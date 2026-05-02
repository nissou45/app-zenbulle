import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import { useTheme } from "../hooks/useTheme";
import FloatingBubbles from "../components/FloatingBubbles";
import ThemedButton from "../components/ThemedButton";
import { ROUTES } from "../constants/routes";
import { useBreakpoint } from "../hooks/useBreakpoint";

const Connexion = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme();
  const { isTablet, isDesktop } = useBreakpoint();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate(ROUTES.dashboard);
    } catch (err) {
      setErreur(err.message || "Email ou mot de passe incorrect");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputSize = (isDesktop || isTablet) ? '18px' : '16px';

  const labelStyle = {
    fontSize: 10,
    letterSpacing: '.15em',
    textTransform: 'uppercase',
    color: theme.accent,
    marginBottom: 4,
    display: 'block',
    textAlign: 'left'
  };

  const inputStyle = {
    border: 'none',
    borderBottom: '1.5px solid ' + theme.border,
    borderRadius: 0,
    background: 'transparent',
    padding: '11px 0 10px',
    outline: 'none',
    width: '100%',
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: inputSize,
    color: theme.text
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden font-cormorant" 
      style={{ background: theme.bg, color: theme.text }}
    >
      <FloatingBubbles />
      <Header />

      <main 
        className="flex-1 flex flex-col justify-center items-center px-8 relative z-10 gap-8"
        style={{
          maxWidth: isDesktop ? '480px' : isTablet ? '600px' : '100%',
          margin: (isDesktop || isTablet) ? '0 auto' : '0'
        }}
      >
        <p className="text-[11px] tracking-[0.18em] uppercase font-medium" style={{ opacity: 0.7 }}>
          bon retour
        </p>

        <h1 className="text-[40px] font-light italic leading-tight text-center">
          ta bulle t'attend
        </h1>

        <div className="w-8 h-[0.5px]" style={{ background: theme.border }} />

        {/* GlassCard Form */}
        <div 
          style={{ 
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '24px',
            padding: '32px 28px',
            width: '100%',
            maxWidth: isDesktop ? '420px' : isTablet ? '400px' : '100%',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col items-start">
              <label style={labelStyle}>email</label>
              <input
                type="email"
                placeholder="ton@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div className="flex flex-col items-start">
              <label style={labelStyle}>mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {erreur && (
              <p className="text-[#a85100] text-sm text-center italic">
                {erreur}
              </p>
            )}

            <ThemedButton type="submit" disabled={isSubmitting} variant="primary" className="mt-2">
              {isSubmitting ? "Connexion..." : "entrer dans ma bulle →"}
            </ThemedButton>
          </form>
        </div>

        {/* Lien inscription en dehors de la carte */}
        <ThemedButton variant="ghost" onClick={() => navigate(ROUTES.inscription)}>
          pas encore de bulle ? créer un compte
        </ThemedButton>
      </main>
    </div>
  );
};

export default Connexion;
