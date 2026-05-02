import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/routes';
import { MOOD_COLORS } from '../constants/emotions';
import FloatingBubbles from '../components/FloatingBubbles';
import api from '../services/api';
import { useBreakpoint } from '../hooks/useBreakpoint';

const DAY_LABELS = ['D','L','M','M','J','V','S'];

function calcStreak(moods) {
  let streak = 0;
  const today = new Date();
  for (let i=0; i<60; i++) {
    const d = new Date(today);
    d.setDate(d.getDate()-i);
    const key = d.toDateString();
    if (moods.find(m=>new Date(m.date).toDateString()===key)) streak++;
    else if (i>0) break;
  }
  return streak;
}

function timeGreeting() {
  const h = new Date().getHours();
  if (h>=5&&h<12)  return 'bon matin';
  if (h>=12&&h<18) return 'bonne journée';
  if (h>=18&&h<22) return 'bonne soirée';
  return 'bonne nuit';
}

function todayFr() {
  return new Date().toLocaleDateString('fr-FR',{
    weekday:'long', day:'numeric', month:'long'
  });
}

function MoodTracker({ moods, t }) {
  const today = new Date();
  const week = Array.from({length:7}, (_,i) => {
    const d = new Date(today);
    d.setDate(d.getDate()-(6-i));
    const key = d.toDateString();
    const m = moods.find(x=>new Date(x.date).toDateString()===key);
    return { day: DAY_LABELS[d.getDay()], mood: m?.value, isToday: i===6 };
  });
  return (
    <div style={{ display:'flex', gap:6, alignItems:'flex-end', justifyContent:'center' }}>
      {week.map((w,i)=>(
        <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
          <div style={{
            width: w.isToday?28:24, height: w.isToday?28:24,
            borderRadius:'50%',
            background: w.mood ? MOOD_COLORS[w.mood] : 'rgba(255,255,255,0.6)',
            border: w.mood
              ? `2px solid ${MOOD_COLORS[w.mood]}`
              : `1.5px solid ${t.border}`,
            boxShadow: w.mood ? `0 2px 10px ${MOOD_COLORS[w.mood]}55` : 'none',
          }}/>
          <span style={{ fontSize:9, color: w.isToday ? t.accent : t.muted }}>
            {w.day}
          </span>
        </div>
      ))}
    </div>
  );
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme: t } = useTheme();
  const { user, logout } = useAuth();
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [moods, setMoods] = useState([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    api.get('/moods')
      .then(res => setMoods(res.data))
      .catch(() => setMoods([]));
  }, []);

  const streak = calcStreak(moods);
  const lastMood = moods.length ? moods[moods.length-1] : null;
  const moodColor = lastMood ? MOOD_COLORS[lastMood.value] : '#D4A853';

  const cards = [
    {
      icon: '🌬', label: 'respirer',
      sub: 'exercice guidé', route: ROUTES.respiration,
      col: 'rgba(180,215,210,0.35)',
      border: 'rgba(140,190,185,0.45)',
    },
    {
      icon: '🫧', label: 'émotion du jour',
      sub: 'comment je me sens', route: ROUTES.emotion,
      col: 'rgba(200,185,225,0.35)',
      border: 'rgba(170,150,205,0.45)',
    },
    {
      icon: '🌙', label: 'journal du soir',
      sub: 'écrire ma pensée', route: ROUTES.journal,
      col: 'rgba(225,200,200,0.35)',
      border: 'rgba(200,165,165,0.45)',
    },
    {
      icon: '✦', label: 'tes bulles',
      sub: 'relire mes écrits', route: ROUTES.mesBulles,
      col: 'rgba(210,200,230,0.35)',
      border: 'rgba(180,165,210,0.45)',
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.accueil);
  };

  const heroPadding = isDesktop ? '24px 28px' : isTablet ? '20px 24px' : '16px 18px 14px';
  const gridGap = isDesktop ? '16px' : isTablet ? '14px' : '10px';
  const tilePadding = isDesktop ? '22px 18px' : isTablet ? '20px 16px' : '17px 13px';
  const tileLabelSize = isDesktop ? '17px' : isTablet ? '16px' : '14px';

  return (
    <div style={{
      minHeight:'100vh',
      background: t.bg,
      fontFamily:"'Cormorant Garamond',serif",
      position:'relative',
      overflowX:'hidden',
    }}>
      <FloatingBubbles
        bubbleColor={t.bubbleColor}
        bubbleBorder={t.bubbleBorder}
      />

      {/* Header */}
      <div style={{ padding:'12px 20px 6px', display:'flex',
        alignItems:'center', justifyContent:'space-between',
        position:'relative', zIndex:10 }}>
        <div style={{ fontSize:13, color:t.muted, fontStyle:'italic' }}>
          🫧 ZenBulle
        </div>
      </div>

      {/* Contenu */}
      <main style={{
        flex:1, padding: isDesktop ? '0 32px 24px' : isTablet ? '0 24px 24px' : '0 20px 24px',
        display:'flex', flexDirection:'column',
        position:'relative', zIndex:1, gap:14,
        maxWidth: isDesktop ? '480px' : isTablet ? '600px' : '100%',
        margin: (isDesktop || isTablet) ? '0 auto' : '0'
      }}>

        {/* Carte hero */}
        <div style={{
          background: t.glass || 'rgba(255,255,255,0.72)',
          backdropFilter:'blur(20px)',
          WebkitBackdropFilter:'blur(20px)',
          borderRadius:24,
          border:'1px solid rgba(255,255,255,0.85)',
          boxShadow:`0 4px 28px rgba(0,0,0,0.06)`,
          padding: heroPadding,
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:10, letterSpacing:'0.2em', color:t.accent,
                textTransform:'uppercase', opacity:0.8, margin:'0 0 5px' }}>
                {timeGreeting()}
              </p>
              <h1 style={{ fontFamily:"'Cormorant Garamond',serif",
                fontSize:30, fontWeight:300, fontStyle:'italic',
                color:t.text, lineHeight:1.08, margin:'0 0 4px' }}>
                {t.greet ? t.greet(user?.pseudo) : user?.pseudo} 🫧
              </h1>
              <p style={{ fontSize:11, color:t.muted,
                letterSpacing:'0.04em', textTransform:'capitalize', margin:0 }}>
                {todayFr()}
              </p>
            </div>

            {/* Orbe humeur + streak */}
            <div style={{ display:'flex', flexDirection:'column',
              alignItems:'center', gap:8 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: `radial-gradient(circle at 38% 32%, 
                  white 0%, ${moodColor}88 100%)`,
                border: `2px solid ${moodColor}`,
                boxShadow: `0 3px 14px ${moodColor}55`,
              }}/>
              
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(180,160,120,0.15)',
                border: '1px solid rgba(180,160,120,0.3)',
                borderRadius: 12, padding: '5px 10px',
                minWidth: 44,
              }}>
                <span style={{ fontSize: 14 }}>🔥</span>
                <span style={{ fontSize: 11, fontWeight: 600,
                  color: '#C49A60',
                  fontFamily: "'Cormorant Garamond',serif" }}>
                  {streak}j
                </span>
              </div>
            </div>
          </div>

          {/* Semaine */}
          <div style={{ marginTop:14, paddingTop:12,
            borderTop:`1px solid ${t.border}` }}>
            <div style={{ display:'flex', justifyContent:'space-between',
              alignItems:'center', marginBottom:10 }}>
              <p style={{ fontSize:9, letterSpacing:'0.2em', color:t.accent,
                textTransform:'uppercase', margin:0 }}>ta semaine</p>
              <button onClick={()=>setShowChart(c=>!c)}
                style={{ background:'none', border:'none', cursor:'pointer',
                  fontSize:10, color:t.muted, letterSpacing:'0.1em',
                  textTransform:'uppercase', fontFamily:"'Cormorant Garamond',serif",
                  padding:0 }}>
                {showChart ? '7 jours ↑' : '30 jours →'}
              </button>
            </div>
            <MoodTracker moods={moods} t={t} />
          </div>
        </div>

        {/* Grille 2x2 */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: gridGap }}>
          {cards.map(c=>(
            <button key={c.route} onClick={()=>navigate(c.route)}
              style={{
                background: c.col,
                backdropFilter:'blur(12px)',
                border:`1px solid ${c.border}`,
                borderRadius:20,
                padding: tilePadding,
                cursor:'pointer',
                textAlign:'left',
                transition:'transform .18s, box-shadow .18s',
                boxShadow:`0 2px 12px rgba(0,0,0,0.06)`
              }}
              onMouseEnter={e=>{
                e.currentTarget.style.transform='translateY(-2px)';
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.transform='';
              }}>
              <div style={{ fontSize:21, marginBottom:7 }}>{c.icon}</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif",
                fontStyle:'italic', fontSize: tileLabelSize, color:t.text,
                marginBottom:3 }}>{c.label}</div>
              <div style={{ fontSize:10, color:t.muted }}>{c.sub}</div>
            </button>
          ))}
        </div>

        {/* Déconnexion */}
        <div style={{ textAlign:'center', marginTop:-2 }}>
          <button onClick={handleLogout} style={{
            background:'transparent', border:'none',
            borderBottom:`1px solid ${t.border}`,
            fontFamily:"'Cormorant Garamond',serif",
            fontStyle:'italic', color:t.muted,
            fontSize:13, cursor:'pointer', paddingBottom:2
          }}>
            se déconnecter
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
