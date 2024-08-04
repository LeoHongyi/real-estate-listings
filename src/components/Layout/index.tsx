import { ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { NavLink } from 'react-router-dom';
import './index.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`layout`}>
      <header className="header">
        <div className="header-content">
          <NavLink to="/" className="logo">
            PropertyApp
          </NavLink>
          <nav className="nav">
            <NavLink
              to="/"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end
            >
              Home
            </NavLink>
          </nav>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <main className="main-content">{children}</main>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 PropertyApp. All rights reserved.</p>
          <div className="footer-links">
            {/* <NavLink to="/privacy" className="footer-link">
              Privacy Policy
            </NavLink>
            <NavLink to="/terms" className="footer-link">
              Terms of Service
            </NavLink> */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
