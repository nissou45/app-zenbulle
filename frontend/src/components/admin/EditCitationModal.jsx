import { useState } from "react";
import api from "../../services/api";

const MOODS = ["joie", "calme", "triste", "anxieux", "fatigue"];

const EditCitationModal = ({ citation, theme, onSave, onClose }) => {
  const [mood, setMood] = useState(citation.mood);
  const [text, setText] = useState(citation.text);

  const save = async () => {
    await api.put(`/admin/citations/${citation.id}`, { mood, text });
    onSave();
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: 20,
          padding: 28,
          width: "90%",
          maxWidth: 420,
          fontFamily: "'Cormorant Garamond',serif",
        }}
      >
        <h3 style={{ fontSize: 22, fontStyle: "italic", marginBottom: 16 }}>
          Modifier la citation
        </h3>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={{
            fontSize: 16,
            border: "1px solid #ddd",
            borderRadius: 20,
            padding: "6px 16px",
            marginBottom: 12,
            display: "block",
            fontFamily: "'Cormorant Garamond',serif",
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
          rows={3}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 12,
            border: "1px solid #ddd",
            fontSize: 16,
            resize: "none",
            fontFamily: "'Cormorant Garamond',serif",
            outline: "none",
            marginBottom: 16,
            boxSizing: "border-box",
          }}
        />
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={save}
            style={{
              flex: 1,
              padding: "10px 0",
              background: "#8B7FA8",
              color: "white",
              border: "none",
              borderRadius: 30,
              fontFamily: "'Cormorant Garamond',serif",
              fontStyle: "italic",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Sauvegarder
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px 0",
              background: "transparent",
              color: "#999",
              border: "1px solid #ddd",
              borderRadius: 30,
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCitationModal;
