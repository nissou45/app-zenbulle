import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { ROUTES } from "../constants/routes";
import api from "../services/api";
import Header from "../components/Header";
import FloatingBubbles from "../components/FloatingBubbles";

const MesBulles = () => {
  const { theme } = useTheme();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    api
      .get("/journal")
      .then((res) => setEntries(res.data))
      .catch(() => setError("impossible de charger tes bulles"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    setIsDeleting(id);
    try {
      await api.delete(`/journal/${id}`);
      setEntries(entries.filter((e) => e.id !== id));
    } catch {
      setError("impossible de supprimer cette bulle");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden font-cormorant" 
      style={{ background: theme.bg, color: theme.text }}
    >
      <FloatingBubbles />
      <Header retour={ROUTES.dashboard} />

      <main className="flex-1 p-8 max-w-[600px] mx-auto w-full relative z-10">
        <p className="text-[11px] tracking-[0.18em] uppercase font-medium text-center mb-4 opacity-70">
          ton voyage intérieur
        </p>

        <h1 className="text-[40px] font-light italic leading-[1.15] text-center mb-8">
          mes bulles
        </h1>

        {loading && (
          <p className="text-center italic opacity-60">
            chargement...
          </p>
        )}

        {error && (
          <p className="text-center italic text-[#a85100]">{error}</p>
        )}

        {!loading && entries.length === 0 && (
          <p className="text-center italic text-lg opacity-60">
            tu n'as encore écrit aucune bulle 🫧
          </p>
        )}

        <div className="flex flex-col gap-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white/40 border rounded-2xl px-6 py-5 relative transition-all hover:bg-white/60"
              style={{ borderColor: theme.border }}
            >
              <p className="text-[11px] opacity-60 mb-2.5">
                {new Date(entry.created_at).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <p className="text-[17px] leading-[1.8] whitespace-pre-wrap">
                {entry.content}
              </p>

              <button
                onClick={() => handleDelete(entry.id)}
                disabled={isDeleting === entry.id}
                className={`absolute top-4 right-4 bg-transparent border-0 cursor-pointer text-base transition-opacity ${isDeleting === entry.id ? "opacity-30" : "opacity-40 hover:opacity-100"}`}
                style={{ color: theme.text }}
              >
                {isDeleting === entry.id ? "..." : "✕"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MesBulles;
