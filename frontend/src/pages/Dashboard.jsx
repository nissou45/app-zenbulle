import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";
import FloatingBubbles from "../components/FloatingBubbles";
import Header from "../components/Header";
import DashboardHero from "../components/dashboard/DashboardHero";
import api from "../services/api";
import { useBreakpoint } from "../hooks/useBreakpoint";

const CARDS = [
  {
    icon: "🌬",
    label: "respirer",
    sub: "exercice guidé",
    route: "respiration",
    col: "rgba(180,215,210,0.35)",
    border: "rgba(140,190,185,0.45)",
  },
  {
    icon: "🫧",
    label: "émotion du jour",
    sub: "comment je me sens",
    route: "emotion",
    col: "rgba(200,185,225,0.35)",
    border: "rgba(170,150,205,0.45)",
  },
  {
    icon: "🌙",
    label: "journal du soir",
    sub: "écrire ma pensée",
    route: "journal",
    col: "rgba(225,200,200,0.35)",
    border: "rgba(200,165,165,0.45)",
  },
  {
    icon: "✦",
    label: "tes bulles",
    sub: "relire mes écrits",
    route: "mesBulles",
    col: "rgba(210,200,230,0.35)",
    border: "rgba(180,165,210,0.45)",
  },
  {
    icon: "⚙️",
    label: "administration",
    sub: "gérer l'app",
    route: "admin",
    col: "rgba(180,160,200,0.35)",
    border: "rgba(150,130,180,0.45)",
    adminOnly: true,
  },
];

function CardGrid({ cards, user, theme, tilePadding, tileLabelSize, gridGap, onNavigate }) {
  const visible = cards.filter(
    (c) => !c.adminOnly || user?.role === "admin",
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: gridGap,
      }}
    >
      {visible.map((c) => (
        <button
          key={c.route}
          onClick={() => onNavigate(ROUTES[c.route])}
          style={{
            background: c.col,
            backdropFilter: "blur(12px)",
            border: `1px solid ${c.border}`,
            borderRadius: 20,
            padding: tilePadding,
            cursor: "pointer",
            textAlign: "left",
            transition: "transform .18s, box-shadow .18s",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "";
          }}
        >
          <div style={{ fontSize: 21, marginBottom: 7 }}>{c.icon}</div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontStyle: "italic",
              fontSize: tileLabelSize,
              color: theme.text,
              marginBottom: 3,
            }}
          >
            {c.label}
          </div>
          <div style={{ fontSize: 10, color: theme.muted }}>{c.sub}</div>
        </button>
      ))}
    </div>
  );
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme: t } = useTheme();
  const { user, logout } = useAuth();
  const { isTablet, isDesktop } = useBreakpoint();
  const [moods, setMoods] = useState([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    api
      .get("/moods")
      .then((res) => setMoods(res.data))
      .catch(() => setMoods([]));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.accueil);
  };

  const heroPadding = isDesktop
    ? "24px 28px"
    : isTablet
      ? "20px 24px"
      : "16px 18px 14px";
  const gridGap = isDesktop ? "16px" : isTablet ? "14px" : "10px";
  const tilePadding = isDesktop
    ? "22px 18px"
    : isTablet
      ? "20px 16px"
      : "17px 13px";
  const tileLabelSize = isDesktop ? "17px" : isTablet ? "16px" : "14px";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bg,
        fontFamily: "'Cormorant Garamond',serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <FloatingBubbles
        bubbleColor={t.bubbleColor}
        bubbleBorder={t.bubbleBorder}
      />

      {/* Header unifié */}
      <Header variant="brand" minimal />

      {/* Contenu */}
      <main
        style={{
          flex: 1,
          padding: isDesktop
            ? "0 32px 24px"
            : isTablet
              ? "0 24px 24px"
              : "0 20px 24px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
          gap: 14,
          maxWidth: isDesktop ? "480px" : isTablet ? "600px" : "100%",
          margin: isDesktop || isTablet ? "0 auto" : "0",
        }}
      >
        {/* Carte hero */}
        <DashboardHero
          user={user}
          moods={moods}
          theme={t}
          heroPadding={heroPadding}
          showChart={showChart}
          onToggleChart={() => setShowChart((c) => !c)}
        />

        {/* Grille 2x2 */}
        <CardGrid
          cards={CARDS}
          user={user}
          theme={t}
          tilePadding={tilePadding}
          tileLabelSize={tileLabelSize}
          gridGap={gridGap}
          onNavigate={(route) => navigate(route)}
        />

        {/* Déconnexion */}
        <div style={{ textAlign: "center", marginTop: -2 }}>
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: `1px solid ${t.border}`,
              fontFamily: "'Cormorant Garamond',serif",
              fontStyle: "italic",
              color: t.muted,
              fontSize: 13,
              cursor: "pointer",
              paddingBottom: 2,
            }}
          >
            se déconnecter
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
