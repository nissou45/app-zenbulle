import api from "../../services/api";
import { ROLES } from "../../constants/roles";

const AdminUserList = ({ users, theme, onRefresh }) => {
  const deleteUser = async (id) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      await api.delete(`/admin/users/${id}`);
      onRefresh();
    }
  };

  const toggleRole = async (user) => {
    const newRole = user.role === ROLES.ADMIN ? ROLES.USER : ROLES.ADMIN;
    if (window.confirm(`Passer ${user.pseudo} en ${newRole} ?`)) {
      await api.put(`/admin/users/${user.id}`, { role: newRole });
      onRefresh();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {users.map((u) => (
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
                u.role === ROLES.ADMIN
                  ? `${theme.accent}30`
                  : `${theme.border}50`,
              color:
                u.role === ROLES.ADMIN ? theme.accent : theme.muted,
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
            {u.role === ROLES.ADMIN ? "→ user" : "→ admin"}
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
  );
};

export default AdminUserList;
