import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Header = ({ retour }) => {
  return (
    <header className="flex justify-between items-center px-8 py-6">
      <Link to="/">
        <img src={Logo} alt="ZenBulle" className="h-10" />
      </Link>
      {retour && (
        <Link
          to={retour}
          className="text-[13px] text-terre border-[0.5px] border-sable rounded-[20px] px-4 py-1.5 no-underline"
        >
          retour
        </Link>
      )}
    </header>
  );
};

export default Header;
