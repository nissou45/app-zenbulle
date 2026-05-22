import { useState } from "react";
import api from "../../services/api";

const MOODS = ["joie", "calme", "triste", "anxieux", "fatigue"];

const CitationsForm = ({ theme, onAdd }) => {
  const [mood, setMood] = useState("joie");
  const [text, setText] = useState("");

  const submit = async () => {
    if (!text.trim()) return;
    await api.post("/admin/citations", { mood, text });
    setText("");
    onAdd();
  };

  return (
    <div
      style={{
        padding: 20,
        borderRadius: 16,
        border: `1px solid ${theme.border}`,
        marginBottom: 24,
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(8px)",
      }}
    >
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: theme.muted,
          marginBottom: 12,
        }}
      >
        Nouvelle citation
      </p>
      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 16,
          border: `1px solid ${theme.border}`,
          borderRadius: 20,
          padding: "6px 16px",
          marginBottom: 12,
          color: theme.text,
          background: "transparent",
          display: "block",
        }}
      >
        {MOODS.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Texte de la citation..."
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 12,
          border: `1px solid ${theme.border}`,
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: 16,
          resize: "none",
          outline: "none",
          background: "rgba(255,255,255,0.8)",
          color: theme.text,
          marginBottom: 12,
          boxSizing: "border-box",
        }}
        rows={3}
      />
      <button
        onClick={submit}
        style={{
          padding: "10px 28px",
          background: theme.btnFill,
          color: "white",
          border: "none",
          borderRadius: 30,
          fontFamily: "'Cormorant Garamond',serif",
          fontStyle: "italic",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Ajouter →
      </button>
    </div>
  );
};

export default CitationsForm;
