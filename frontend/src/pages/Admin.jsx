import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import api from "../services/api";
import Header from "../components/Header";
import FloatingBubbles from "../components/FloatingBubbles";
import CitationsForm from "../components/admin/CitationsForm";
import EditCitationModal from "../components/admin/EditCitationModal";
import AdminStats from "../components/admin/AdminStats";
import AdminUserList from "../components/admin/AdminUserList";
import AdminCitationList from "../components/admin/AdminCitationList";

// ─── Page Admin ───────────────────────────────────────────────────────────────
const Admin = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("stats");
  const [data, setData] = useState({ stats: null, users: [], citations: [] });
  const [editingCitation, setEditingCitation] = useState(null);

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

  useEffect(() => {
    fetchData();
  }, [activeTab]);

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

        {/* Contenu des tabs */}
        {activeTab === "stats" && data.stats && (
          <AdminStats stats={data.stats} theme={theme} />
        )}

        {activeTab === "users" && (
          <AdminUserList
            users={data.users}
            theme={theme}
            onRefresh={fetchData}
          />
        )}

        {activeTab === "citations" && (
          <div>
            <CitationsForm theme={theme} onAdd={fetchData} />
            <AdminCitationList
              citations={data.citations}
              theme={theme}
              onEdit={setEditingCitation}
              onDelete={deleteCitation}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
