import { useTheme } from "../hooks/useTheme";

const ThemedInput = ({ type = "text", placeholder, value, onChange, required = false, className = "" }) => {
  const { theme } = useTheme();

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`px-5 py-3.5 rounded-[40px] border bg-white/60 outline-none transition-all focus:bg-white/80 font-cormorant ${className}`}
      style={{ borderColor: theme.border, color: theme.text }}
    />
  );
};

export default ThemedInput;
