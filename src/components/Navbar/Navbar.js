import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';
import Navlogo from '../images/Navlogo.svg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Apply theme to document body
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const servicesDropdown = [
    { 
      name: 'Design', 
      href: '#design',
      subtitle: 'Handcraft the user experience.',
      color: '#f8d7da'
    },
    { 
      name: 'Technology', 
      href: '#technology',
      subtitle: 'Leverage the power of code.',
      color: '#d1ecf1'
    },
    { 
      name: 'Marketing', 
      href: '#marketing',
      subtitle: 'Creative strategies for brands.',
      color: '#e2e3e5'
    }
  ];

  const aboutDropdown = [
    { 
      name: 'About Us', 
      href: '#about-us',
      subtitle: 'We are super-efficient yet humble to serve you!',
      color: '#f8d7da'
    },
    { 
      name: 'Team', 
      href: '#team',
      subtitle: 'We are proud of our experienced and accomplished team!',
      color: '#d1ecf1'
    },
    { 
      name: 'Career', 
      href: '#career',
      subtitle: 'Can you offer such experience?',
      color: '#e2e3e5'
    }
  ];

  const navItems = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services', hasDropdown: true, dropdownItems: servicesDropdown },
    { name: 'Clients', href: '#clients' },
    { name: 'About', href: '#about', hasDropdown: true, dropdownItems: aboutDropdown },
    { name: 'Knowledge', href: '#knowledge' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar-content">
        {/* Logo */}
        <motion.div 
          className="navbar-logo"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <a href="#home">
            <img src={Navlogo} alt="Leo9" style={{ height: '50px', width: 'auto' }} />
          </a>
        </motion.div>

        {/* Desktop Navigation - Center */}
        <ul className="navbar-menu desktop-menu">
          {navItems.map((item, index) => (
            <motion.li 
              key={item.name}
              className="nav-item"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a href={item.href} className="navbar-link">
                {item.name}
                {item.hasDropdown && <span className="dropdown-arrow">•</span>}
              </a>
              {item.hasDropdown && (
                <div className="dropdown-menu">
                  {(item.name === 'Services' || item.name === 'About') ? (
                    <div className={item.name === 'Services' ? 'services-dropdown-grid' : 'about-dropdown-grid'}>
                      {item.dropdownItems && item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                        <a 
                          key={dropdownIndex}
                          href={dropdownItem.href} 
                          className={item.name === 'Services' ? 'service-card' : 'about-card'}
                          style={{ backgroundColor: dropdownItem.color }}
                        >
                          <h4 className={item.name === 'Services' ? 'service-title' : 'about-title'}>{dropdownItem.name}.</h4>
                          <p className={item.name === 'Services' ? 'service-subtitle' : 'about-subtitle'}>{dropdownItem.subtitle}</p>
                          <span className={item.name === 'Services' ? 'service-arrow' : 'about-arrow'}>→</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    item.dropdownItems && item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                      <a 
                        key={dropdownIndex}
                        href={dropdownItem.href} 
                        className="dropdown-item"
                      >
                        {dropdownItem.name}
                      </a>
                    ))
                  )}
                </div>
              )}
            </motion.li>
          ))}
        </ul>

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* Theme Toggle */}
          <motion.button 
            className="theme-toggle-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: navItems.length * 0.1 }}
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              // Moon icon for dark theme
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
              </svg>
            ) : (
              // Sun icon for light theme
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2"/>
              </svg>
            )}
          </motion.button>

          {/* Contact Button */}
          <motion.button 
            className="contact-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (navItems.length + 1) * 0.1 }}
          >
            Contact
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.95 }}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-content">
              <ul className="mobile-nav-items">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <a 
                      href={item.href} 
                      className="mobile-nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                    {item.hasDropdown && (
                      <ul className="mobile-dropdown-menu">
                        {item.dropdownItems && item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                          <motion.li 
                            key={dropdownIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: dropdownIndex * 0.1 }}
                          >
                            <a 
                              href={dropdownItem.href} 
                              className="mobile-dropdown-item"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {dropdownItem.name}
                            </a>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
              
              {/* Mobile Theme Toggle */}
              <motion.button 
                className="theme-toggle-button"
                style={{ marginBottom: '1rem' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
                onClick={toggleTheme}
              >
                {isDarkMode ? (
                  // Moon icon for dark theme
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" fill="currentColor"/>
                  </svg>
                ) : (
                  // Sun icon for light theme
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </motion.button>

              <motion.button 
                className="mobile-contact-button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (navItems.length + 1) * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
