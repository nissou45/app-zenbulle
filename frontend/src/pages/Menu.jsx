import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F0EA",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 32px",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'Caveat Brush', cursive",
            fontSize: "22px",
            color: "#2C2016",
            textDecoration: "none",
          }}
        >
          ZenBulle
        </Link>
        <Link
          to="/dashboard"
          style={{
            fontSize: "13px",
            color: "#8B6F52",
            border: "0.5px solid #D4C5B0",
            borderRadius: "20px",
            padding: "6px 16px",
            textDecoration: "none",
          }}
        >
          retour
        </Link>
      </header>

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 32px",
          gap: "32px",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            color: "#8B6F52",
            textTransform: "uppercase",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          navigation
        </p>

        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "40px",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#2C2016",
          }}
        >
          menu
        </h1>

        <div
          style={{ width: "32px", height: "0.5px", background: "#D4C5B0" }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "100%",
            maxWidth: "320px",
          }}
        >
          <Link
            to="/dashboard"
            style={{
              padding: "16px 32px",
              background: "transparent",
              color: "#2C2016",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "20px",
              border: "0.5px solid #D4C5B0",
              borderRadius: "40px",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            accueil
          </Link>

          <Link
            to="/respiration"
            style={{
              padding: "16px 32px",
              background: "transparent",
              color: "#2C2016",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "20px",
              border: "0.5px solid #D4C5B0",
              borderRadius: "40px",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            respirer
          </Link>

          <Link
            to="/emotion"
            style={{
              padding: "16px 32px",
              background: "transparent",
              color: "#2C2016",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "20px",
              border: "0.5px solid #D4C5B0",
              borderRadius: "40px",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            émotion du jour
          </Link>

          <Link
            to="/journal"
            style={{
              padding: "16px 32px",
              background: "transparent",
              color: "#2C2016",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "20px",
              border: "0.5px solid #D4C5B0",
              borderRadius: "40px",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            journal du soir
          </Link>

          <Link
            to="/mes-bulles"
            style={{
              padding: "16px 32px",
              background: "transparent",
              color: "#2C2016",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "20px",
              border: "0.5px solid #D4C5B0",
              borderRadius: "40px",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            mes bulles
          </Link>
        </div>

        <div
          style={{ width: "32px", height: "0.5px", background: "#D4C5B0" }}
        />

        {user && (
          <button
            onClick={handleLogout}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              color: "#8B6F52",
              fontSize: "14px",
              background: "transparent",
              border: "none",
              borderBottom: "0.5px solid #8B6F52",
              cursor: "pointer",
              paddingBottom: "2px",
            }}
          >
            se déconnecter
          </button>
        )}
      </main>
    </div>
  );
};

export default Menu;
