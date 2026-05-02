import { useTheme } from "../hooks/useTheme";

const FloatingBubbles = ({ bubbleColor, bubbleBorder }) => {
  const { theme } = useTheme();
  
  const color = bubbleColor || theme.bubbleColor;
  const border = bubbleBorder || theme.bubbleBorder;

  const bubbles = [
    { size: "120px", top: "10%", left: "5%", delay: "0s" },
    { size: "72px", top: "60%", left: "80%", delay: "2s" },
    { size: "90px", top: "40%", left: "15%", delay: "4s" },
    { size: "44px", top: "75%", left: "25%", delay: "1s" },
    { size: "55px", top: "20%", left: "70%", delay: "3s" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: `radial-gradient(circle at 30% 30%, white, ${color})`,
            border: `1px solid ${border}`,
            animationDelay: b.delay,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 9s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingBubbles;
