import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import { ROUTES } from "../constants/routes";
import Header from "../components/Header";
import FloatingBubbles from "../components/FloatingBubbles";
import ThemedButton from "../components/ThemedButton";
import ThemedInput from "../components/ThemedInput";

const Connexion = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme } = useTheme();
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

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden font-cormorant" 
      style={{ background: theme.bg, color: theme.text }}
    >
      <FloatingBubbles />
      <Header />

      <main className="flex-1 flex flex-col justify-center items-center px-8 relative z-10 gap-8">
        <p className="text-[11px] tracking-[0.18em] uppercase font-medium" style={{ opacity: 0.7 }}>
          bon retour
        </p>

        <h1 className="text-[40px] font-light italic leading-tight text-center">
          ta bulle t'attend
        </h1>

        <div className="w-8 h-[0.5px]" style={{ background: theme.border }} />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-[360px]">
          <ThemedInput
            type="email"
            placeholder="ton email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <ThemedInput
            type="password"
            placeholder="ton mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {erreur && (
            <p className="text-[#a85100] text-sm text-center italic">
              {erreur}
            </p>
          )}

          <ThemedButton type="submit" disabled={isSubmitting} variant="primary" className="mt-2">
            {isSubmitting ? "Connexion..." : "entrer dans ma bulle →"}
          </ThemedButton>
        </form>

        <ThemedButton variant="ghost" onClick={() => navigate(ROUTES.inscription)}>
          pas encore de bulle ? créer un compte
        </ThemedButton>
      </main>
    </div>
  );
};

export default Connexion;
