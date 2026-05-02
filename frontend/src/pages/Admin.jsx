import { useState, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import api from "../services/api";
import Header from "../components/Header";
import FloatingBubbles from "../components/FloatingBubbles";
import { MOOD_COLORS } from "../constants/emotions";

const CitationsForm = ({ theme, onAdd }) => {
  const [mood, setMood] = useState('joie');
  const [text, setText] = useState('');
  const submit = async () => {
    if (!text.trim()) return;
    await api.post('/admin/citations', { mood, text });
    setText('');
    onAdd();
  };
  return (
    <div style={{ padding:20, borderRadius:16,
      border:`1px solid ${theme.border}`, marginBottom:20 }}>
      <select value={mood} onChange={e => setMood(e.target.value)}
        style={{ fontFamily:"'Cormorant Garamond',serif",
          fontSize:16, border:`1px solid ${theme.border}`,
          borderRadius:20, padding:'6px 12px', marginBottom:12,
          color:theme.text, background:'transparent' }}>
        {['joie','calme','triste','anxieux','fatigue'].map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <textarea value={text} onChange={e => setText(e.target.value)}
        placeholder="Nouvelle citation..."
        style={{ width:'100%', padding:12, borderRadius:12,
          border:`1px solid ${theme.border}`,
          fontFamily:"'Cormorant Garamond',serif",
          fontSize:16, resize:'none', outline:'none',
          background:'rgba(255,255,255,0.6)', color:theme.text,
          marginBottom:12 }} rows={3}/>
      <button onClick={submit} style={{
        padding:'10px 24px', background:theme.btnFill,
        color:'white', border:'none', borderRadius:30,
        fontFamily:"'Cormorant Garamond',serif",
        fontStyle:'italic', fontSize:16, cursor:'pointer' }}>
        Ajouter →
      </button>
    </div>
  );
};

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
          <div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:24 }}>
              <div style={{ padding:20, borderRadius:16, border:`1px solid ${theme.border}`, textAlign:'center' }}>
                <p style={{ fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:theme.muted }}>Utilisateurs</p>
                <p style={{ fontSize:36, fontStyle:'italic', color:theme.accent }}>{data.stats.totalUsers}</p>
              </div>
              <div style={{ padding:20, borderRadius:16, border:`1px solid ${theme.border}`, textAlign:'center' }}>
                <p style={{ fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:theme.muted }}>Humeurs</p>
                <p style={{ fontSize:36, fontStyle:'italic', color:theme.accent }}>{data.stats.totalMoods}</p>
              </div>
              <div style={{ padding:20, borderRadius:16, border:`1px solid ${theme.border}`, textAlign:'center' }}>
                <p style={{ fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase', color:theme.muted }}>Journaux</p>
                <p style={{ fontSize:36, fontStyle:'italic', color:theme.accent }}>{data.stats.totalJournals}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(data.stats.moodStats).map(([mood, count]) => (
                <div key={mood} className="p-4 rounded-xl border" style={{ borderColor: theme.border }}>
                  <h3 className="italic text-xl capitalize" style={{ color: MOOD_COLORS[mood] }}>{mood}</h3>
                  <p className="text-3xl">{count}</p>
                </div>
              ))}
            </div>
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

        {activeTab === "citations" && (
          <div>
            <CitationsForm theme={theme} onAdd={fetchData} />
            {data.citations.map((c) => (
              <div key={c.id} style={{
                display:'flex', justifyContent:'space-between',
                alignItems:'center', padding:'12px 16px',
                borderBottom:`1px solid ${theme.border}`
              }}>
                <div>
                  <span style={{ fontSize:10, color:theme.accent,
                    textTransform:'uppercase', letterSpacing:'0.15em',
                    marginRight:12 }}>{c.mood}</span>
                  <span style={{ fontStyle:'italic', color:theme.text }}>{c.text}</span>
                </div>
                <button onClick={async () => {
                  await api.delete(`/admin/citations/${c.id}`);
                  fetchData();
                }} style={{ color:'#C05858', background:'none',
                  border:'none', cursor:'pointer', fontSize:18 }}>✕</button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
