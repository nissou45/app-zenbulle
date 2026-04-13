import { useState, useEffect } from "react";
import api from "../services/api";
import Header from "../components/Header";

const MesBulles = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/journal")
      .then((res) => setEntries(res.data))
      .catch(() => setError("impossible de charger tes bulles"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/journal/${id}`);
      setEntries(entries.filter((e) => e.id !== id));
    } catch {
      setError("impossible de supprimer cette bulle");
    }
  };

  return (
    <div className="min-h-screen bg-ivoire flex flex-col">
      <Header retour="/dashboard" />

      <main className="flex-1 p-8 max-w-[600px] mx-auto w-full">
        <p className="text-[11px] tracking-[0.18em] text-terre uppercase font-cormorant text-center mb-4">
          ton voyage intérieur
        </p>

        <h1 className="font-cormorant text-[40px] font-light italic text-encre leading-[1.15] text-center mb-8">
          mes bulles
        </h1>

        {loading && (
          <p className="text-center font-cormorant italic text-terre">
            chargement...
          </p>
        )}

        {error && (
          <p className="text-center font-cormorant italic text-terre">
            {error}
          </p>
        )}

        {!loading && entries.length === 0 && (
          <p className="text-center font-cormorant italic text-terre text-lg">
            tu n'as encore écrit aucune bulle 🫧
          </p>
        )}

        <div className="flex flex-col gap-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white/60 border-[0.5px] border-sable rounded-2xl px-6 py-5 relative"
            >
              <p className="text-[11px] text-terre font-cormorant mb-2.5">
                {new Date(entry.created_at).toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              <p className="font-cormorant text-[17px] text-encre leading-[1.8] whitespace-pre-wrap">
                {entry.content}
              </p>

              <button
                onClick={() => handleDelete(entry.id)}
                className="absolute top-4 right-4 bg-transparent border-0 cursor-pointer text-sable text-base"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MesBulles;
