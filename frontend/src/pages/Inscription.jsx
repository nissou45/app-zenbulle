import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Header from "../components/Header";
import { useTheme } from "../hooks/useTheme";
import FloatingBubbles from "../components/FloatingBubbles";
import ThemedButton from "../components/ThemedButton";
import ThemedInput from "../components/ThemedInput";
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

  const cardPadding = isDesktop ? '36px 32px' : isTablet ? '32px 28px' : '28px 20px';
  const inputSize = (isDesktop || isTablet) ? '18px' : '16px';

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
          bienvenue
        </p>

        <h1 className="text-[40px] font-light italic leading-tight text-center">
          crée ta bulle
        </h1>

        <div className="w-8 h-[0.5px]" style={{ background: theme.border }} />

        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col gap-3.5 w-full"
          style={{ 
            background: 'rgba(255,255,255,0.4)',
            padding: cardPadding,
            borderRadius: '24px',
            maxWidth: isDesktop ? '420px' : isTablet ? '400px' : '100%',
            backdropFilter: 'blur(10px)'
          }}
        >
          <ThemedInput
            type="text"
            placeholder="ton prénom"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
            style={{ fontSize: inputSize }}
          />

          <ThemedInput
            type="email"
            placeholder="ton email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ fontSize: inputSize }}
          />

          <ThemedInput
            type="password"
            placeholder="ton mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ fontSize: inputSize }}
          />

          <ThemedInput
            type="password"
            placeholder="confirme ton mot de passe"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            style={{ fontSize: inputSize }}
          />

          {erreur && (
            <p className="text-[#a85100] text-sm text-center italic">
              {erreur}
            </p>
          )}

          <ThemedButton type="submit" disabled={isSubmitting} variant="primary">
            {isSubmitting ? "Création..." : "créer mon compte →"}
          </ThemedButton>
        </form>

        <ThemedButton variant="ghost" onClick={() => navigate(ROUTES.connexion)}>
          déjà une bulle ? se connecter
        </ThemedButton>
      </main>
    </div>
  );
};

export default Inscription;
