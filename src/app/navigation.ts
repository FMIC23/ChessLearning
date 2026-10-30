export interface NavItem {
  to: string;
  label: string;
  icon: string;
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Inicio', icon: '🏠' },
  { to: '/aprender', label: 'Aprender', icon: '📚' },
  { to: '/tactica', label: 'Táctica', icon: '⚔️' },
  { to: '/jugar', label: 'Jugar', icon: '🤖' },
  { to: '/analisis', label: 'Análisis', icon: '📈' },
  { to: '/tablero', label: 'Tablero', icon: '♟️' },
  { to: '/ajustes', label: 'Ajustes', icon: '⚙️' },
];
