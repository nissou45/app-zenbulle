import { ROUTES } from './routes';

export const THEMES = {
  jeune: {
    key: 'jeune', name: 'Élan', age: '15 – 25 ans',
    tagline: 'énergie · authenticité · vibrance',
    bg: 'linear-gradient(160deg,#FBF7FF 0%,#F5ECFF 50%,#FFF0F7 100%)',
    cardGrad: 'linear-gradient(145deg,#F5ECFF,#FFE8F4)',
    accent: '#B090D8', text: '#2A1838',
    muted: 'rgba(42,24,56,0.45)',
    border: 'rgba(176,144,216,0.3)',
    btnFill: '#B090D8', btnText: '#FFFFFF',
    bubbleColor: 'rgba(192,176,216,0.13)',
    bubbleBorder: 'rgba(192,176,216,0.31)',
    greet: (name) => `hey ${name} 🫧`,
  },
  adulte: {
    key: 'adulte', name: 'Ancre', age: '26 – 45 ans',
    tagline: 'profondeur · équilibre · sérénité',
    bg: 'linear-gradient(160deg,#F8F5EF 0%,#EFF5ED 50%,#F5EFE8 100%)',
    cardGrad: 'linear-gradient(145deg,#EFF5ED,#F5EFE8)',
    accent: '#7FAF85', text: '#1E2A1E',
    muted: 'rgba(30,42,30,0.45)',
    border: 'rgba(127,175,133,0.3)',
    btnFill: '#7FAF85', btnText: '#FFFFFF',
    bubbleColor: 'rgba(127,175,133,0.13)',
    bubbleBorder: 'rgba(127,175,133,0.31)',
    greet: (name) => `bonjour, ${name}`,
  },
  senior: {
    key: 'senior', name: 'Lumière', age: '46 ans et plus',
    tagline: 'douceur · clarté · bienveillance',
    bg: 'linear-gradient(160deg,#F4F8FC 0%,#EEF4F8 50%,#F8F4F0 100%)',
    cardGrad: 'linear-gradient(145deg,#EEF4F8,#F8F0F4)',
    accent: '#5A96BE', text: '#18202A',
    muted: 'rgba(24,32,42,0.45)',
    border: 'rgba(90,150,190,0.3)',
    btnFill: '#5A96BE', btnText: '#FFFFFF',
    bubbleColor: 'rgba(90,150,190,0.13)',
    bubbleBorder: 'rgba(90,150,190,0.31)',
    greet: (name) => `bonjour, ${name}`,
  },
};

export const DEFAULT_THEME = THEMES.adulte;

export const NAV_ITEMS = [
  { label: 'respirer',        route: ROUTES.respiration },
  { label: 'émotion du jour', route: ROUTES.emotion },
  { label: 'journal du soir', route: ROUTES.journal },
  { label: 'mes bulles',      route: ROUTES.mesBulles },
];
