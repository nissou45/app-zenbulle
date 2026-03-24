import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";

const Citations = () => {
  const navigate = useNavigate();
  const [citation, setCitation] = useState("");
  const [loading, setLoading] = useState(true);
  const mood = localStorage.getItem("moodDuJour");

  useEffect(() => {
    api
      .get(`/citations${mood ? `?mood=${mood}` : ""}`)
      .then((res) => setCitation(res.data.text))
      .catch(() => setCitation("prends soin de toi aujourd'hui"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-ivoire flex flex-col">
      <Header retour="/dashboard" />

      <main className="flex-1 flex flex-col justify-center items-center px-12 gap-10 text-center">
        <p className="text-[11px] tracking-[0.18em] text-terre uppercase font-cormorant">
          pour toi aujourd'hui
        </p>

        <div className="w-8 h-[0.5px] bg-sable" />

        {loading ? (
          <p className="font-cormorant italic text-terre text-xl">
            chargement...
          </p>
        ) : (
          <blockquote className="font-cormorant italic text-[28px] font-light text-encre leading-[1.6] max-w-[520px] m-0">
            "{citation}"
          </blockquote>
        )}

        <div className="w-8 h-[0.5px] bg-sable" />

        <button
          onClick={() => navigate("/journal")}
          className="px-10 py-3.5 bg-transparent text-encre font-cormorant italic text-lg border border-encre rounded-[40px] cursor-pointer"
        >
          écrire dans mon journal →
        </button>
      </main>
    </div>
  );
};

export default Citations;
