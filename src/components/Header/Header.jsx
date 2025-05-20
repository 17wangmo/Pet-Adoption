'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const styles = {
  header: {
    backgroundColor: '#9c60be',
    padding: '0.5rem'
  },
  topbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftColumn: {
    display: 'flex',
    alignItems: 'center'
  },
  socialIcons: {
    display: 'flex',
    gap: '10px'
  },
  socialLink: {
    color: 'white',
    fontSize: '20px',
    marginRight: '10px'
  },
  menuToggle: {
    backgroundColor: '#67dad4',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    marginLeft: '1rem'
  },
  logo: {
    position: 'relative'
  },
  navRight: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '#ae496c'
    }
  },
  button: {
    backgroundColor: '#67dad4',
    padding: '0.5rem 1rem',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px'
  },
  navMenu: {
    backgroundColor: '#ae496c',
    padding: '0.5rem 0',
    display: 'none'
  },
  navMenuActive: {
    display: 'block'
  },
  navLeft: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem'
  },
  mainNav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
    width: '100%',
    padding: '0.3rem 0'
  },
  subNav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
    width: '100%',
    padding: '0.3rem 0',
    backgroundColor: '#c25d82',
    animation: 'fadeIn 0.3s ease-in-out',
    opacity: 1,
    transform: 'translateY(0)',
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '5px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    ':hover': {
      color: '#ae496c'
    }
  },
  navItem: {
    textAlign: 'center'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    padding: '0.5rem',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#c25d82'
    }
  },
  subNavLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    padding: '0.5rem',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#ae496c'
    }
  },
  dropdown: {
    position: 'relative'
  },
  dropdownContent: {
    display: 'none',
    position: 'absolute',
    backgroundColor: '#f8bbd0',
    minWidth: '160px',
    padding: '10px',
    borderRadius: '5px',
    zIndex: 1000,
    top: '100%',
    left: 0
  }
};

// Add keyframes for the animation to the document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}

const Header = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOtherPets, setShowOtherPets] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false
      });
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleOtherPets = () => {
    setShowOtherPets(!showOtherPets);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={styles.header}>
      <div style={styles.topbar}>
        <div style={styles.leftColumn}>
          <div style={styles.socialIcons}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
          <button 
            style={styles.menuToggle}
            onClick={toggleMenu}
          >
            Menu
          </button>
        </div>
        <div style={styles.logo}>
          <Link href="/">
            <Image src="/image/logo.png" alt="Logo" width={100} height={100} priority />
          </Link>
        </div>
        <div style={styles.navRight}>
          <Link href="/donate" style={{...styles.button, ...styles.link}}>
            DONATE
          </Link>
          {session ? (
            <>
              <span style={{...styles.link, backgroundColor: 'transparent'}}>
                Welcome, {session.user.name}
              </span>
              <button onClick={handleLogout} style={styles.button}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" style={{...styles.link, backgroundColor: '#67dad4'}}>Login</Link>
              <Link href="/auth/register" style={{...styles.link, backgroundColor: '#67dad4'}}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
      <nav style={{...styles.navMenu, ...(isMenuOpen ? styles.navMenuActive : {})}}>
        <div style={styles.mainNav}>
          <Link href="/dogs" style={styles.navLink}>DOGS</Link>
          <Link href="/cats" style={styles.navLink}>CATS</Link>
          <div 
            style={{
              ...styles.navLink,
              backgroundColor: showOtherPets ? '#c25d82' : 'transparent'
            }} 
            onClick={toggleOtherPets}
          >
            OTHER PETS
          </div>
          {session ? (
            <Link href="/adopt" style={styles.navLink}>Adopt Now</Link>
          ) : (
            <Link href="/auth/login" style={styles.navLink}>Login to Adopt</Link>
          )}
        </div>
        {showOtherPets && (
          <div style={styles.subNav}>
            <Link href="/rabbits" style={styles.subNavLink}>Rabbits</Link>
            <Link href="/birds" style={styles.subNavLink}>Birds</Link>
            <Link href="/guinea-pigs" style={styles.subNavLink}>Guinea pig</Link>
            <button 
              onClick={() => setShowOtherPets(false)} 
              style={styles.closeButton}
              aria-label="Close submenu"
            >
              ✕
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 