export interface NavItem {
  to: string;
  label: string;
  icon: string;
  /** Solo en el menú móvil y en el menú del perfil (en escritorio no caben todas). */
  secondary?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Inicio', icon: '🏠' },
  { to: '/aprender', label: 'Aprender', icon: '📚' },
  { to: '/tactica', label: 'Táctica', icon: '⚔️' },
  { to: '/anticipacion', label: 'Anticipación', icon: '🧠' },
  { to: '/aperturas', label: 'Aperturas', icon: '📖' },
  { to: '/jugar', label: 'Jugar', icon: '🤖' },
  { to: '/analisis', label: 'Análisis', icon: '📈' },
  { to: '/progreso', label: 'Progreso', icon: '📊' },
  { to: '/tablero', label: 'Tablero libre', icon: '♟️', secondary: true },
  { to: '/ajustes', label: 'Ajustes', icon: '⚙️', secondary: true },
];
