import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import api from "../services/api";
import Header from "../components/Header";
import FloatingBubbles from "../components/FloatingBubbles";
import { MOOD_COLORS } from "../constants/emotions";

const Admin = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("stats");
  const [data, setData] = useState({ stats: null, users: [], citations: [] });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
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
  };

  const deleteUser = async (id) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      await api.delete(`/admin/users/${id}`);
      fetchData();
    }
  };

  return (
    <div className="min-h-screen" style={{ background: theme.bg, color: theme.text, fontFamily: "'Cormorant Garamond',serif" }}>
      <FloatingBubbles />
      <Header />
      <main className="p-8 relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl italic mb-8">Administration</h1>
        <div className="flex gap-4 mb-8">
          {["stats", "users", "citations"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-full border"
              style={{ borderColor: activeTab === tab ? theme.accent : theme.border }}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {activeTab === "stats" && data.stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(data.stats.moodStats).map(([mood, count]) => (
              <div key={mood} className="p-4 rounded-xl border" style={{ borderColor: theme.border }}>
                <h3 className="italic text-xl capitalize" style={{ color: MOOD_COLORS[mood] }}>{mood}</h3>
                <p className="text-3xl">{count}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "users" && (
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ color: theme.muted }}>
                <th className="p-2 text-left">Pseudo</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((u) => (
                <tr key={u.id} className="border-b" style={{ borderColor: theme.border }}>
                  <td className="p-2">{u.pseudo}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">
                    <button onClick={() => deleteUser(u.id)} className="text-red-500">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default Admin;
