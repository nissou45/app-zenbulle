import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import { useTheme } from "../hooks/useTheme";
import FloatingBubbles from "../components/FloatingBubbles";
import ThemedButton from "../components/ThemedButton";
import { ROUTES } from "../constants/routes";
import { useBreakpoint } from "../hooks/useBreakpoint";

const Inscription = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { theme } = useTheme();
  const { isTablet, isDesktop } = useBreakpoint();
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [erreur, setErreur] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");

    if (!pseudo || !email || !password) {
      setErreur("Tous les champs sont obligatoires");
      return;
    }

    if (password.length < 6) {
      setErreur("Le mot de passe doit faire au moins 6 caractères");
      return;
    }

    if (password !== confirm) {
      setErreur("Les mots de passe ne correspondent pas");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(email, password, pseudo);
      navigate(ROUTES.questionnaire);
    } catch (err) {
      setErreur(err.message || "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelStyle = {
    fontSize: 10,
    letterSpacing: '.15em',
    textTransform: 'uppercase',
    color: theme.accent,
    marginBottom: 6,
    display: 'block',
    textAlign: 'left'
  };

  const inputStyle = {
    border: 'none',
    borderBottom: '1.5px solid ' + theme.border,
    borderRadius: 0,
    background: 'transparent',
    padding: '11px 0 10px',
    width: '100%',
    fontSize: 18,
    fontFamily: "Cormorant Garamond, serif",
    color: theme.text,
    outline: 'none'
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
        <p className="text-[10px] tracking-[0.15em] uppercase font-medium" style={{ opacity: 0.7 }}>
          BIENVENUE
        </p>

        <h1 className="text-[36px] font-light italic leading-tight text-center">
          crée ta bulle
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
            maxWidth: 340,
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
            <div className="flex flex-col items-start">
              <label style={labelStyle}>prénom</label>
              <input
                type="text"
                placeholder="ton prénom"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

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

            <div className="flex flex-col items-start">
              <label style={labelStyle}>confirmer</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
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
              {isSubmitting ? "Création..." : "créer mon compte →"}
            </ThemedButton>
          </form>
        </div>

        {/* Lien connexion en dehors de la carte */}
        <ThemedButton variant="ghost" onClick={() => navigate(ROUTES.connexion)}>
          déjà une bulle ? se connecter
        </ThemedButton>
      </main>
    </div>
  );
};

export default Inscription;
