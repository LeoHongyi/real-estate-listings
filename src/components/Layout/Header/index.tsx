import { NavLink } from 'react-router-dom';
import { useTheme } from '../../../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="header">
      <div className="header-content">
        <NavLink to="/" className="logo">
          PropertyApp
        </NavLink>
        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            Home
          </NavLink>
        </nav>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}
