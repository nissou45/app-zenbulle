import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Accueil = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ivoire flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col justify-center items-center px-8 text-center gap-6">
        <p className="text-[11px] tracking-[0.18em] text-terre uppercase font-cormorant">
          ton espace intérieur
        </p>

        <h1 className="font-cormorant text-5xl font-light italic text-encre leading-[1.15]">
          ferme les yeux
          <br />
          sur le monde
        </h1>

        <p className="font-cormorant text-lg text-terre leading-[1.8]">
          un moment rien que pour toi.
          <br />
          respire, ressens, écris.
        </p>

        <div className="w-8 h-[0.5px] bg-sable" />

        <button
          onClick={() => navigate("/connexion")}
          className="flex items-center gap-3 bg-transparent text-encre font-cormorant italic text-lg px-10 py-3.5 border border-encre rounded-[40px] cursor-pointer"
        >
          découvrir ma bulle <span>→</span>
        </button>

        <button
          onClick={() => navigate("/questionnaire")}
          className="font-cormorant italic text-encre text-sm bg-transparent border-0 border-b border-encre cursor-pointer pb-0.5"
        >
          quelques questions pour commencer
        </button>
      </main>
    </div>
  );
};

export default Accueil;
