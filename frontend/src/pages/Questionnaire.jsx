import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F0EA",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 32px",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'Caveat Brush', cursive",
            fontSize: "22px",
            color: "#2C2016",
            textDecoration: "none",
          }}
        >
          ZenBulle
        </Link>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "32px",
          gap: "40px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            color: "#8B6F52",
            textTransform: "uppercase",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          avant de commencer
        </p>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "40px",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#2C2016",
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          créons ta bulle
        </h1>

        <div
          style={{ width: "32px", height: "0.5px", background: "#D4C5B0" }}
        />

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            width: "100%",
            maxWidth: "480px",
          }}
        >
          {questions.map((q) => (
            <div
              key={q.name}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  fontSize: "20px",
                  color: "#2C2016",
                }}
              >
                {q.question}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {q.options.map((option) => (
                  <label
                    key={option}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "14px 20px",
                      background:
                        reponses[q.name] === option
                          ? "rgba(44,32,22,0.06)"
                          : "rgba(255,255,255,0.5)",
                      border:
                        reponses[q.name] === option
                          ? "0.5px solid #2C2016"
                          : "0.5px solid #D4C5B0",
                      borderRadius: "40px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <input
                      type="radio"
                      name={q.name}
                      value={option}
                      checked={reponses[q.name] === option}
                      onChange={() => handleChange(q.name, option)}
                      style={{ accentColor: "#2C2016" }}
                    />
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "17px",
                        color: "#2C2016",
                      }}
                    >
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            style={{
              padding: "14px 40px",
              background: "transparent",
              color: "#2C2016",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "18px",
              border: "1px solid #2C2016",
              borderRadius: "40px",
              cursor: "pointer",
              marginTop: "16px",
            }}
          >
            créer ma bulle →
          </button>
        </form>
      </main>
    </div>
  );
};

export default Questionnaire;
