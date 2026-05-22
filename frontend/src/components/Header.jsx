import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useTheme } from "../hooks/useTheme";
import Logo from "../assets/logo.svg";

/**
 * Header unifié pour toute l'application.
 *
 * @prop {"logo"|"brand"} variant - "logo" affiche le logo SVG, "brand" affiche "🫧 ZenBulle"
 * @prop {string} retour - chemin pour le bouton "retour" (optionnel)
 * @prop {boolean} centered - centre le contenu du header (défaut: false)
 * @prop {boolean} minimal - version compacte sans padding vertical large (défaut: false)
 */
const Header = ({ variant = "logo", retour, centered = false, minimal = false }) => {
  const { theme: t } = useTheme();
  const paddingY = minimal ? "6px" : "24px";
  const paddingX = minimal ? "20px" : "32px";

  return (
    <header
      style={{
        display: "flex",
        justifyContent: centered ? "center" : "space-between",
        alignItems: "center",
        padding: `${paddingY} ${paddingX}`,
        position: "relative",
        zIndex: 20,
      }}
    >
      {variant === "logo" ? (
        <Link to={ROUTES.accueil}>
          <img src={Logo} alt="ZenBulle" className="h-10" />
        </Link>
      ) : (
        <span
          style={{
            fontFamily: minimal ? "'Cormorant Garamond',serif" : "'Caveat Brush',cursive",
            fontSize: minimal ? 13 : 22,
            fontStyle: minimal ? "italic" : "normal",
            color: t.text,
          }}
        >
          🫧 ZenBulle
        </span>
      )}

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
