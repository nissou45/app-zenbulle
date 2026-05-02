import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Logo from "../assets/logo.svg";

const Header = ({ retour }) => {
  return (
    <header className="flex justify-between items-center px-8 py-6 relative z-20">
      <Link to={ROUTES.accueil}>
        <img src={Logo} alt="ZenBulle" className="h-10" />
      </Link>
      {retour && (
        <Link
          to={retour}
          className="text-[13px] text-terre border-[0.5px] border-sable rounded-[20px] px-4 py-1.5 no-underline font-cormorant"
        >
          retour
        </Link>
      )}
    </header>
  );
};

export default Header;
