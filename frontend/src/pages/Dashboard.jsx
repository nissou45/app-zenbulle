import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-ivoire flex flex-col">
      <Header retour="/menu" />

      <main className="flex-1 flex flex-col justify-center items-center px-8 text-center gap-8">
        <p className="text-[11px] tracking-[0.18em] text-terre uppercase font-cormorant">
          bonjour
        </p>

        <h1 className="font-cormorant text-5xl font-light italic text-encre leading-[1.15]">
          {user?.pseudo} 🫧
        </h1>

        <div className="w-8 h-[0.5px] bg-sable" />

        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Link
            to="/respiration"
            className="px-10 py-3.5 bg-transparent text-encre font-cormorant italic text-lg border border-encre rounded-[40px] no-underline text-center"
          >
            respirer
          </Link>

          <Link
            to="/emotion"
            className="px-10 py-3.5 bg-transparent text-encre font-cormorant italic text-lg border border-encre rounded-[40px] no-underline text-center"
          >
            émotion du jour
          </Link>

          <Link
            to="/journal"
            className="px-10 py-3.5 bg-transparent text-encre font-cormorant italic text-lg border border-encre rounded-[40px] no-underline text-center"
          >
            journal du soir
          </Link>

          <Link
            to="/mes-bulles"
            className="px-10 py-3.5 bg-transparent text-encre font-cormorant italic text-lg border border-encre rounded-[40px] no-underline text-center"
          >
            mes bulles
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="font-cormorant italic text-terre text-sm bg-transparent border-0 border-b border-terre cursor-pointer pb-0.5"
        >
          se déconnecter
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
