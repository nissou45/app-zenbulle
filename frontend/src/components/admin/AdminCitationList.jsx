import { MOOD_COLORS } from "../../constants/emotions";

const AdminCitationList = ({ citations, theme, onEdit, onDelete }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <p
        style={{
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: theme.muted,
          marginBottom: 16,
        }}
      >
        {citations.length} citation
        {citations.length > 1 ? "s" : ""}
      </p>
      {citations.map((c) => (
        <div
          key={c.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 16px",
            borderRadius: 14,
            border: `1px solid ${theme.border}`,
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            style={{
              fontSize: 10,
              color: MOOD_COLORS[c.mood] || theme.accent,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              minWidth: 60,
            }}
          >
            {c.mood}
          </span>
          <span
            style={{
              flex: 1,
              fontStyle: "italic",
              color: theme.text,
              fontSize: 15,
            }}
          >
            {c.text}
          </span>
          <button
            onClick={() => onEdit(c)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: `1px solid ${theme.border}`,
              background: "transparent",
              color: theme.text,
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Modifier
          </button>
          <button
            onClick={() => onDelete(c.id)}
            style={{
              background: "none",
              border: "none",
              color: "#C05858",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminCitationList;
