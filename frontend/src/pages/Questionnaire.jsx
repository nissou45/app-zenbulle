import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const questions = [
  {
    name: "humeur",
    question: "Comment tu te sens le plus souvent en ce moment ?",
    options: ["Calme", "Fatiguée", "Stressée", "Plutôt positive"],
  },
  {
    name: "objectif",
    question: "Qu'est-ce que tu viens chercher ici ?",
    options: [
      "Me détendre",
      "Vider ma tête",
      "Mieux dormir",
      "Prendre du temps pour moi",
    ],
  },
  {
    name: "aide",
    question: "Qu'est-ce qui t'aide le plus ?",
    options: ["Écrire", "Respirer", "Lire un message inspirant"],
  },
  {
    name: "moment",
    question: "À quel moment utiliseras-tu surtout ZenBulle ?",
    options: ["Le matin", "Le soir", "Quand j'en ai besoin"],
  },
  {
    name: "ton",
    question: "Comment préfères-tu que ZenBulle te parle ?",
    options: ["Très doux", "Neutre", "Motivant"],
  },
];

const Questionnaire = () => {
  const navigate = useNavigate();
  const [reponses, setReponses] = useState({});

  const handleChange = (name, value) => {
    setReponses((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("zenbulle_prefs", JSON.stringify(reponses));
    navigate("//dashboard");
  };

  return (
    <div className="min-h-screen bg-ivoire flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center px-8 py-8 gap-10">
        <p className="text-[11px] tracking-[0.18em] text-terre uppercase font-cormorant">
          avant de commencer
        </p>

        <h1 className="font-cormorant text-[40px] font-light italic text-encre text-center leading-[1.15]">
          créons ta bulle
        </h1>

        <div className="w-8 h-[0.5px] bg-sable" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full max-w-[480px]">
          {questions.map((q) => (
            <div key={q.name} className="flex flex-col gap-4">
              <p className="font-cormorant italic text-xl text-encre">
                {q.question}
              </p>

              <div className="flex flex-col gap-2.5">
                {q.options.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center gap-[14px] px-5 py-3.5 rounded-[40px] cursor-pointer transition-all border-[0.5px] ${
                      reponses[q.name] === option
                        ? "bg-encre/[.06] border-encre"
                        : "bg-white/50 border-sable"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.name}
                      value={option}
                      checked={reponses[q.name] === option}
                      onChange={() => handleChange(q.name, option)}
                      className="accent-encre"
                    />
                    <span className="font-cormorant text-[17px] text-encre">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="mt-4 px-10 py-3.5 bg-transparent text-encre font-cormorant italic text-lg border border-encre rounded-[40px] cursor-pointer"
          >
            créer ma bulle →
          </button>
        </form>
      </main>
    </div>
  );
};

export default Questionnaire;
