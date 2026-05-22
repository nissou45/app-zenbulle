import { MOOD_COLORS } from "../../constants/emotions";

const AdminStats = ({ stats, theme }) => {
  const cards = [
    { label: "Utilisateurs", value: stats.totalUsers },
    { label: "Humeurs", value: stats.totalMoods },
    { label: "Journaux", value: stats.totalJournals },
  ];

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {cards.map(({ label, value }) => (
          <div
            key={label}
            style={{
              padding: 20,
              borderRadius: 16,
              border: `1px solid ${theme.border}`,
              textAlign: "center",
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: theme.muted,
                marginBottom: 8,
              }}
            >
              {label}
            </p>
            <p
              style={{
                fontSize: 40,
                fontStyle: "italic",
                color: theme.accent,
                margin: 0,
              }}
            >
              {value}
            </p>
          </div>
        ))}
      </div>

      <p
        style={{
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: theme.muted,
          marginBottom: 16,
        }}
      >
        Répartition des humeurs
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {Object.entries(stats.moodStats).map(([mood, count]) => (
          <div
            key={mood}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 16px",
              borderRadius: 12,
              border: `1px solid ${theme.border}`,
              background: "rgba(255,255,255,0.5)",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: MOOD_COLORS[mood],
              }}
            />
            <span
              style={{
                flex: 1,
                textTransform: "capitalize",
                fontStyle: "italic",
              }}
            >
              {mood}
            </span>
            <span style={{ fontSize: 24, color: MOOD_COLORS[mood] }}>
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStats;
