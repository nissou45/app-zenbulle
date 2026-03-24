import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Menu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-ivoire flex flex-col">
      <Header retour="/dashboard" />

      <main className="flex-1 flex flex-col justify-center items-center px-8 gap-8">
        <p className="text-[11px] tracking-[0.18em] text-terre uppercase font-cormorant">
          navigation
        </p>

        <h1 className="font-cormorant text-[40px] font-light italic text-encre">
          menu
        </h1>

        <div className="w-8 h-[0.5px] bg-sable" />

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-transparent text-encre font-cormorant italic text-xl border-[0.5px] border-sable rounded-[40px] no-underline text-center"
          >
            accueil
          </Link>

          <Link
            to="/respiration"
            className="px-8 py-4 bg-transparent text-encre font-cormorant italic text-xl border-[0.5px] border-sable rounded-[40px] no-underline text-center"
          >
            respirer
          </Link>

          <Link
            to="/emotion"
            className="px-8 py-4 bg-transparent text-encre font-cormorant italic text-xl border-[0.5px] border-sable rounded-[40px] no-underline text-center"
          >
            émotion du jour
          </Link>

          <Link
            to="/journal"
            className="px-8 py-4 bg-transparent text-encre font-cormorant italic text-xl border-[0.5px] border-sable rounded-[40px] no-underline text-center"
          >
            journal du soir
          </Link>

          <Link
            to="/mes-bulles"
            className="px-8 py-4 bg-transparent text-encre font-cormorant italic text-xl border-[0.5px] border-sable rounded-[40px] no-underline text-center"
          >
            mes bulles
          </Link>
        </div>

        <div className="w-8 h-[0.5px] bg-sable" />

        {user && (
          <button
            onClick={handleLogout}
            className="font-cormorant italic text-terre text-sm bg-transparent border-0 border-b border-terre cursor-pointer pb-0.5"
          >
            se déconnecter
          </button>
        )}
      </main>
    </div>
  );
};

export default Menu;
