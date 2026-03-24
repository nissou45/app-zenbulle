import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";

const Journal = () => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setMessage("écris quelque chose avant d'envoyer ta bulle 🫧");
      return;
    }
    try {
      await api.post("/journal", { content });
      setContent("");
      setMessage("ta bulle est enregistrée 🫶");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("une erreur est survenue");
    }
  };

  return (
    <div className="min-h-screen bg-ivoire flex flex-col">
      <Header retour="/dashboard" />

      <main className="flex-1 flex flex-col justify-center items-center px-8 gap-8">
        <p className="text-[11px] tracking-[0.18em] text-terre uppercase font-cormorant">
          ce soir
        </p>

        <h1 className="font-cormorant text-[40px] font-light italic text-encre leading-[1.15] text-center">
          journal du soir
        </h1>

        <div className="w-8 h-[0.5px] bg-sable" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-[480px]">
          <textarea
            placeholder="écris ta pensée du soir..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="px-6 py-5 rounded-[20px] border border-sable bg-white/60 font-cormorant text-[17px] text-encre outline-none resize-none leading-[1.8]"
          />

          {message && (
            <p className="text-terre font-cormorant italic text-[15px] text-center">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="px-10 py-3.5 bg-transparent text-encre font-cormorant italic text-lg border border-encre rounded-[40px] cursor-pointer"
          >
            envoyer ma bulle →
          </button>
        </form>

        <Link
          to="/mes-bulles"
          className="font-cormorant italic text-terre text-sm no-underline border-b border-terre pb-0.5"
        >
          voir mes bulles précédentes
        </Link>
      </main>
    </div>
  );
};

export default Journal;
