import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import api from "../services/api";
import Header from "../components/Header";
import FloatingBubbles from "../components/FloatingBubbles";
import { MOOD_COLORS } from "../constants/emotions";

const MOODS = ["joie", "calme", "triste", "anxieux", "fatigue"];

// ─── Formulaire ajout citation ───────────────────────────────────────────────
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

// ─── Modal modification citation ─────────────────────────────────────────────
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
            border: `1px solid #ddd`,
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

// ─── Page Admin ───────────────────────────────────────────────────────────────
const Admin = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("stats");
  const [data, setData] = useState({ stats: null, users: [], citations: [] });
  const [editingCitation, setEditingCitation] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === "stats") {
        const res = await api.get("/admin/stats");
        setData((prev) => ({ ...prev, stats: res.data }));
      } else if (activeTab === "users") {
        const res = await api.get("/admin/users");
        setData((prev) => ({ ...prev, users: res.data }));
      } else {
        const res = await api.get("/admin/citations");
        setData((prev) => ({ ...prev, citations: res.data }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      await api.delete(`/admin/users/${id}`);
      fetchData();
    }
  };

  const toggleRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    if (window.confirm(`Passer ${user.pseudo} en ${newRole} ?`)) {
      await api.put(`/admin/users/${user.id}`, { role: newRole });
      fetchData();
    }
  };

  const deleteCitation = async (id) => {
    await api.delete(`/admin/citations/${id}`);
    fetchData();
  };

  const tabStyle = (tab) => ({
    padding: "8px 20px",
    borderRadius: 30,
    border: `1px solid ${activeTab === tab ? theme.accent : theme.border}`,
    background: activeTab === tab ? `${theme.accent}20` : "transparent",
    color: activeTab === tab ? theme.accent : theme.muted,
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 13,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    cursor: "pointer",
  });

  return (
    <div
      className="min-h-screen"
      style={{
        background: theme.bg,
        color: theme.text,
        fontFamily: "'Cormorant Garamond',serif",
      }}
    >
      <FloatingBubbles />
      <Header />

      {editingCitation && (
        <EditCitationModal
          citation={editingCitation}
          theme={theme}
          onSave={fetchData}
          onClose={() => setEditingCitation(null)}
        />
      )}

      <main
        style={{
          padding: "24px 20px",
          maxWidth: 680,
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: theme.muted,
            marginBottom: 8,
          }}
        >
          espace admin
        </p>
        <h1
          style={{
            fontSize: 36,
            fontStyle: "italic",
            fontWeight: 300,
            marginBottom: 24,
          }}
        >
          Administration
        </h1>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          {["stats", "users", "citations"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={tabStyle(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── STATS ── */}
        {activeTab === "stats" && data.stats && (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 12,
                marginBottom: 24,
              }}
            >
              {[
                { label: "Utilisateurs", value: data.stats.totalUsers },
                { label: "Humeurs", value: data.stats.totalMoods },
                { label: "Journaux", value: data.stats.totalJournals },
              ].map(({ label, value }) => (
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
              {Object.entries(data.stats.moodStats).map(([mood, count]) => (
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
        )}

        {/* ── USERS ── */}
        {activeTab === "users" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.users.map((u) => (
              <div
                key={u.id}
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
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontStyle: "italic", fontSize: 18 }}>
                    {u.pseudo}
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: theme.muted }}>
                    {u.email}
                  </p>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    borderRadius: 20,
                    background:
                      u.role === "admin"
                        ? `${theme.accent}30`
                        : `${theme.border}50`,
                    color: u.role === "admin" ? theme.accent : theme.muted,
                  }}
                >
                  {u.role}
                </span>
                <button
                  onClick={() => toggleRole(u)}
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
                  {u.role === "admin" ? "→ user" : "→ admin"}
                </button>
                <button
                  onClick={() => deleteUser(u.id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    border: "1px solid #C05858",
                    background: "transparent",
                    color: "#C05858",
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ── CITATIONS ── */}
        {activeTab === "citations" && (
          <div>
            <CitationsForm theme={theme} onAdd={fetchData} />
            <p
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: theme.muted,
                marginBottom: 16,
              }}
            >
              {data.citations.length} citation
              {data.citations.length > 1 ? "s" : ""}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {data.citations.map((c) => (
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
                    onClick={() => setEditingCitation(c)}
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
                    onClick={() => deleteCitation(c.id)}
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
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
