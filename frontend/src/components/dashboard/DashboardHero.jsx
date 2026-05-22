import { MOOD_COLORS } from "../../constants/emotions";

function timeGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "bon matin";
  if (h >= 12 && h < 18) return "bonne journée";
  if (h >= 18 && h < 22) return "bonne soirée";
  return "bonne nuit";
}

function todayFr() {
  return new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function calcStreak(moods) {
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 60; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toDateString();
    if (moods.find((m) => new Date(m.date).toDateString() === key)) streak++;
    else if (i > 0) break;
  }
  return streak;
}

const DAY_LABELS = ["D", "L", "M", "M", "J", "V", "S"];

function MoodTracker({ moods, t }) {
  const today = new Date();
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const key = d.toDateString();
    const m = moods.find((x) => new Date(x.date).toDateString() === key);
    return { day: DAY_LABELS[d.getDay()], mood: m?.value, isToday: i === 6 };
  });
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {week.map((w, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div
            style={{
              width: w.isToday ? 28 : 24,
              height: w.isToday ? 28 : 24,
              borderRadius: "50%",
              background: w.mood
                ? MOOD_COLORS[w.mood]
                : "rgba(255,255,255,0.6)",
              border: w.mood
                ? `2px solid ${MOOD_COLORS[w.mood]}`
                : `1.5px solid ${t.border}`,
              boxShadow: w.mood
                ? `0 2px 10px ${MOOD_COLORS[w.mood]}55`
                : "none",
            }}
          />
          <span style={{ fontSize: 9, color: w.isToday ? t.accent : t.muted }}>
            {w.day}
          </span>
        </div>
      ))}
    </div>
  );
}

const DashboardHero = ({ user, moods, theme, heroPadding, showChart, onToggleChart }) => {
  const streak = calcStreak(moods);
  const lastMood = moods.length ? moods[moods.length - 1] : null;
  const moodColor = lastMood ? MOOD_COLORS[lastMood.value] : "#D4A853";

  return (
    <div
      style={{
        background: theme.glass || "rgba(255,255,255,0.72)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "0 4px 28px rgba(0,0,0,0.06)",
        padding: heroPadding,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              color: theme.accent,
              textTransform: "uppercase",
              opacity: 0.8,
              margin: "0 0 5px",
            }}
          >
            {timeGreeting()}
          </p>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 30,
              fontWeight: 300,
              fontStyle: "italic",
              color: theme.text,
              lineHeight: 1.08,
              margin: "0 0 4px",
            }}
          >
            {theme.greet ? theme.greet(user?.pseudo) : user?.pseudo} 🫧
          </h1>
          <p
            style={{
              fontSize: 11,
              color: theme.muted,
              letterSpacing: "0.04em",
              textTransform: "capitalize",
              margin: 0,
            }}
          >
            {todayFr()}
          </p>
        </div>

        {/* Orbe humeur + streak */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: `radial-gradient(circle at 38% 32%, white 0%, ${moodColor}88 100%)`,
              border: `2px solid ${moodColor}`,
              boxShadow: `0 3px 14px ${moodColor}55`,
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "rgba(180,160,120,0.15)",
              border: "1px solid rgba(180,160,120,0.3)",
              borderRadius: 12,
              padding: "5px 10px",
              minWidth: 44,
            }}
          >
            <span style={{ fontSize: 14 }}>🔥</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#C49A60",
                fontFamily: "'Cormorant Garamond',serif",
              }}
            >
              {streak}j
            </span>
          </div>
        </div>
      </div>

      {/* Semaine */}
      <div
        style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: `1px solid ${theme.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <p
            style={{
              fontSize: 9,
              letterSpacing: "0.2em",
              color: theme.accent,
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            ta semaine
          </p>
          <button
            onClick={onToggleChart}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 10,
              color: theme.muted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "'Cormorant Garamond',serif",
              padding: 0,
            }}
          >
            {showChart ? "7 jours ↑" : "30 jours →"}
          </button>
        </div>
        <MoodTracker moods={moods} t={theme} />
      </div>
    </div>
  );
};

export default DashboardHero;
