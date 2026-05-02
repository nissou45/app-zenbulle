import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { ROUTES } from '../constants/routes';
import FloatingBubbles from '../components/FloatingBubbles';
import { useBreakpoint } from '../hooks/useBreakpoint';

const Accueil = () => {
  const navigate = useNavigate();
  const { theme: t } = useTheme();
  const { isTablet, isDesktop } = useBreakpoint();

  const titleSize = isDesktop ? '64px' : isTablet ? '58px' : '48px';
  const btnMaxWidth = (isDesktop || isTablet) ? '380px' : '100%';

  return (
    <div style={{
      height: '100vh',
      background: t.bg,
      fontFamily: "'Cormorant Garamond',serif",
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <FloatingBubbles
        bubbleColor={t.bubbleColor}
        bubbleBorder={t.bubbleBorder}
      />

      {/* Header logo */}
      <div style={{ padding:'12px 20px 6px',
        display:'flex', alignItems:'center',
        justifyContent:'center',
        position:'relative', zIndex:10 }}>
        <span style={{ fontFamily:"'Caveat Brush',cursive",
          fontSize:22, color:t.text }}>
          🫧 ZenBulle
        </span>
      </div>

      {/* Contenu poussé vers le bas */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: isDesktop ? '0 30px 60px' : isTablet ? '0 30px 56px' : '0 30px 52px',
        position: 'relative',
        zIndex: 1,
        maxWidth: isDesktop ? '480px' : isTablet ? '600px' : '100%',
        margin: (isDesktop || isTablet) ? '0 auto' : '0'
      }}>
        <p style={{ fontSize:10, letterSpacing:'0.22em',
          textTransform:'uppercase', color:t.accent,
          opacity:0.8, marginBottom:16 }}>
          {t.label || 'ton espace intérieur'}
        </p>

        <h1 style={{
          fontFamily:"'Cormorant Garamond',serif",
          fontSize: titleSize, fontWeight:300, fontStyle:'italic',
          color:t.text, lineHeight:1.08, margin:'0 0 22px',
        }}>
          ferme<br/>les yeux<br/>sur le monde
        </h1>

        <p style={{ fontSize:16, color:t.muted,
          lineHeight:1.95, marginBottom:36 }}>
          un moment rien que pour toi.<br/>
          respire, ressens, écris.
        </p>

        {/* Bouton principal */}
        <button
          onClick={() => navigate(ROUTES.connexion)}
          style={{
            padding:'15px', 
            width:'100%',
            maxWidth: btnMaxWidth,
            background: t.btnFill,
            color: t.btnText || '#FFFFFF',
            fontFamily:"'Cormorant Garamond',serif",
            fontStyle:'italic', fontSize:18,
            border:'none', borderRadius:40,
            cursor:'pointer',
            boxShadow:`0 4px 20px ${t.accent}40`,
            transition:'transform .18s, box-shadow .18s',
            alignSelf: (isDesktop || isTablet) ? 'center' : 'stretch'
          }}
          onMouseEnter={e=>{
            e.currentTarget.style.transform='translateY(-1px)';
          }}
          onMouseLeave={e=>{
            e.currentTarget.style.transform='';
          }}>
          découvrir ta bulle →
        </button>
      </main>
    </div>
  );
};

export default Accueil;
