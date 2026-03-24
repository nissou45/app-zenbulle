import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const Inscription = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [erreur, setErreur] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");

    if (password !== confirm) {
      setErreur("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await register(email, password, pseudo);
      navigate("/questionnaire");
    } catch (err) {
      setErreur("Une erreur est survenue, réessaie");
    }
  };

  return (
    <div className="min-h-screen bg-ivoire flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col justify-center items-center px-8 gap-8">
        <p className="text-[11px] tracking-[0.18em] text-terre uppercase font-cormorant">
          bienvenue
        </p>

        <h1 className="font-cormorant text-[40px] font-light italic text-encre leading-[1.15] text-center">
          crée ta bulle
        </h1>

        <div className="w-8 h-[0.5px] bg-sable" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-[360px]">
          <input
            type="text"
            placeholder="ton prénom"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            className="px-5 py-3.5 rounded-[40px] border border-sable bg-white/60 font-cormorant text-base text-encre outline-none"
          />

          <input
            type="email"
            placeholder="ton email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-5 py-3.5 rounded-[40px] border border-sable bg-white/60 font-cormorant text-base text-encre outline-none"
          />

          <input
            type="password"
            placeholder="ton mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-5 py-3.5 rounded-[40px] border border-sable bg-white/60 font-cormorant text-base text-encre outline-none"
          />

          <input
            type="password"
            placeholder="confirme ton mot de passe"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="px-5 py-3.5 rounded-[40px] border border-sable bg-white/60 font-cormorant text-base text-encre outline-none"
          />

          {erreur && (
            <p className="text-[#a85100] font-cormorant text-sm text-center">
              {erreur}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 px-10 py-3.5 bg-transparent text-encre font-cormorant italic text-lg border border-encre rounded-[40px] cursor-pointer"
          >
            créer mon compte →
          </button>
        </form>

        <Link
          to="/connexion"
          className="font-cormorant italic text-terre text-sm no-underline border-b border-terre pb-0.5"
        >
          déjà une bulle ? se connecter
        </Link>
      </main>
    </div>
  );
};

export default Inscription;
