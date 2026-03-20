import { useNavigate } from "react-router-dom";

const Accueil = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F0EA] flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6">
        <span className="font-['Caveat_Brush'] text-xl text-[#2C2016]">
          ZenBulle
        </span>
        <button
          onClick={() => navigate("/menu")}
          className="text-sm text-[#8B6F52] border border-[#D4C5B0] rounded-full px-4 py-1 hover:bg-white transition"
        >
          menu
        </button>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 flex flex-col justify-center items-center px-8 text-center gap-8">
        <p className="text-xs tracking-[0.18em] text-[#8B6F52] uppercase font-['Cormorant_Garamond']">
          ton espace intérieur
        </p>

        <h1 className="font-['Cormorant_Garamond'] text-5xl font-light italic text-[#2C2016] leading-tight">
          ferme les yeux
          <br />
          sur le monde
        </h1>

        <p className="font-['Cormorant_Garamond'] text-lg text-[#8B6F52] leading-relaxed">
          un moment rien que pour toi.
          <br />
          respire, ressens, écris.
        </p>

        <div className="w-8 h-px bg-[#D4C5B0]" />

        <button
          onClick={() => navigate("/connexion")}
          className="flex items-center gap-4 bg-[#2C2016] text-[#F5F0EA] font-['Cormorant_Garamond'] italic text-lg px-8 py-4 rounded-sm hover:bg-[#3d2e20] transition group"
        >
          découvrir ma bulle
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>

        <button
          onClick={() => navigate("/inscription")}
          className="font-['Cormorant_Garamond'] italic text-[#2C2016] text-sm border-b border-[#2C2016] pb-px hover:opacity-60 transition"
        >
          quelques questions pour commencer
        </button>
      </main>
    </div>
  );
};

export default Accueil;
