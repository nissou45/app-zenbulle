import { useTheme } from "../hooks/useTheme";

const ThemedButton = ({ children, onClick, variant = 'primary', disabled, type = "button", className = "" }) => {
  const { theme } = useTheme();

  const baseStyles = "px-10 py-3.5 italic text-lg rounded-[40px] transition-all font-cormorant cursor-pointer border";
  
  const variants = {
    primary: {
      backgroundColor: theme.btnFill,
      color: theme.btnText,
      borderColor: 'transparent',
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: theme.accent,
      color: theme.text
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: theme.text,
      textDecoration: 'underline',
      padding: '0',
      border: '0',
      borderRadius: '0'
    }
  };

  const style = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`${baseStyles} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"} ${className}`}
    >
      {children}
    </button>
  );
};

export default ThemedButton;
