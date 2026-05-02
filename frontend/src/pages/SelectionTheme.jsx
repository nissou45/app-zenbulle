import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { THEMES } from '../constants/themes';
import { ROUTES } from '../constants/routes';
import FloatingBubbles from '../components/FloatingBubbles';

const SelectionTheme = () => {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const [hov, setHov] = useState(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setTimeout(() => setEntered(true), 80);
  }, []);

  const handleSelect = (theme) => {
    setTheme(theme.key);
    navigate(ROUTES.accueil);
  };

  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(160deg,#FAF7F3 0%,#F3EFF8 50%,#F0F5FA 100%)',
      display:'flex', flexDirection:'column',
      fontFamily:"'Cormorant Garamond',serif",
      overflow:'hidden', position:'relative'
    }}>
      <FloatingBubbles
        bubbleColor="rgba(192,176,216,0.15)"
        bubbleBorder="rgba(192,176,216,0.3)"
      />

      <div style={{ position:'relative', zIndex:1, flex:1,
        display:'flex', flexDirection:'column' }}>

        {/* Logo */}
        <div style={{ padding:'20px 22px 12px',
          display:'flex', justifyContent:'center' }}>
          <span style={{ fontFamily:"'Caveat Brush',cursive",
            fontSize:26, color:'#2A2030' }}>ZenBulle</span>
        </div>

        <main style={{ flex:1, display:'flex',
          flexDirection:'column', padding:'4px 18px 30px',
          gap:11, justifyContent:'center' }}>

          <p style={{
            fontSize:10, letterSpacing:'0.22em',
            textTransform:'uppercase',
            color:'rgba(80,60,100,0.45)',
            marginBottom:4, textAlign:'center',
            opacity: entered?1:0,
            transform: entered?'translateY(0)':'translateY(8px)',
            transition:'all .5s'
          }}>bienvenue</p>

          <h1 style={{
            fontSize:38, fontWeight:300, fontStyle:'italic',
            color:'#2A1838', lineHeight:1.15, marginBottom:14,
            textAlign:'center',
            opacity: entered?1:0,
            transform: entered?'translateY(0)':'translateY(12px)',
            transition:'all .55s .08s'
          }}>
            quelle est<br/>ta bulle ?
          </h1>

          {Object.values(THEMES).map((th, idx) => (
            <button key={th.key}
              onClick={() => handleSelect(th)}
              onMouseEnter={() => setHov(th.key)}
              onMouseLeave={() => setHov(null)}
              style={{
                display:'flex', alignItems:'center',
                padding:'18px 20px', borderRadius:22,
                cursor:'pointer',
                background: th.cardGrad,
                border:`1px solid ${hov===th.key
                  ? th.accent+'60'
                  : 'rgba(255,255,255,0.9)'}`,
                transition:'transform .22s, box-shadow .22s',
                transform: entered
                  ? (hov===th.key?'translateY(-2px)':'translateY(0)')
                  : `translateY(${20+idx*8}px)`,
                opacity: entered?1:0,
                boxShadow: hov===th.key
                  ? `0 10px 30px ${th.accent}30`
                  : '0 3px 16px rgba(100,80,60,0.08)',
              }}>

              {/* Logo 3 bulles */}
              <div style={{ position:'relative', width:52,
                height:52, flexShrink:0, marginRight:16 }}>
                {[{s:36,x:8,y:8},{s:23,x:25,y:2},{s:16,x:27,y:27}]
                  .map((b,i) => (
                  <div key={i} style={{
                    position:'absolute', left:b.x, top:b.y,
                    width:b.s, height:b.s, borderRadius:'50%',
                    background:`radial-gradient(circle at 35% 30%,
                      rgba(255,255,255,0.9), ${th.accent}30)`,
                    border:`0.8px solid ${th.accent}50`
                  }}/>
                ))}
              </div>

              {/* Texte */}
              <div style={{ flex:1 }}>
                <p style={{ fontSize:10, letterSpacing:'0.18em',
                  textTransform:'uppercase', color:th.accent,
                  marginBottom:4, opacity:0.85 }}>{th.age}</p>
                <p style={{ fontSize:30, fontWeight:300,
                  fontStyle:'italic', color:th.text,
                  lineHeight:1.1, marginBottom:3 }}>{th.name}</p>
                <p style={{ fontSize:11, color:th.muted,
                  letterSpacing:'0.05em' }}>{th.tagline}</p>
              </div>

              <span style={{ fontSize:18, opacity:0.3,
                color:th.accent, marginLeft:8 }}>›</span>
            </button>
          ))}
        </main>
      </div>
    </div>
  );
};

export default SelectionTheme;
