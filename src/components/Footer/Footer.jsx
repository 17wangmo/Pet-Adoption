'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const styles = {
  siteFooter: {
    backgroundColor: '#9c60be',
    color: 'white',
    padding: '2rem 0'
  },
  footerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  },
  footerAbout: {
    maxWidth: '300px'
  },
  footerLinks: {
    color: '#95ece7'
  },
  linksList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '4px 0',
    display: 'block'
  },
  footerContact: {
    lineHeight: '1.6'
  },
  footerSocial: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  socialLink: {
    color: 'white',
    fontSize: '1.2rem'
  },
  footerNewsletter: {
    maxWidth: '300px'
  },
  newsletterForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  input: {
    padding: '0.6rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem'
  },
  button: {
    backgroundColor: '#f48fb1',
    color: 'rgb(86, 63, 63)',
    border: 'none',
    padding: '0.6rem',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  adminLink: {
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
    display: 'block',
    marginTop: '1rem'
  },
  footerBottom: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    marginTop: '2rem',
    padding: '1rem',
    textAlign: 'center'
  },
  footerBottomLink: {
    color: '#fce4ec',
    textDecoration: 'none',
    margin: '0 0.5rem'
  },
  backToTop: {
    backgroundColor: 'transparent',
    border: '1px solid #fff',
    color: 'white',
    padding: '6px 12px',
    marginTop: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  }
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing, ${email}!`);
    setEmail('');
  };

  const handleAdminAccess = () => {
    if (session?.user?.role === 'admin') {
      router.push('/admin');
    } else {
      alert('Access denied. Only administrators can access this area.');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.siteFooter}>
      <div style={styles.footerContainer}>
        <div style={styles.footerAbout}>
          <h3>Happy Tails</h3>
          <p>Connecting loving families with pets in need. Every adoption brings a tail-wagging smile!</p>
        </div>

        <div style={styles.footerLinks}>
          <h4>Quick Links</h4>
          <ul style={styles.linksList}>
            <li><Link href="/dogs" style={styles.link}>Dogs</Link></li>
            <li><Link href="/cats" style={styles.link}>Cats</Link></li>
            <li><Link href="/rabbits" style={styles.link}>Rabbits</Link></li>
            <li><Link href="/birds" style={styles.link}>Birds</Link></li>
            <li><Link href="/guinea-pigs" style={styles.link}>Guinea Pigs</Link></li>
            <li><Link href="/adopt" style={styles.link}>Adopt Now</Link></li>
          </ul>
        </div>

        <div style={styles.footerContact}>
          <h4>Contact Us</h4>
          <p>Email: contact@happytails.org</p>
          <p>Phone: +975 17 432 798</p>
          <div style={styles.footerSocial}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>

        <div style={styles.footerNewsletter}>
          <h4>Subscribe to Our Newsletter</h4>
          <form onSubmit={handleSubscribe} style={styles.newsletterForm}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Subscribe</button>
          </form>
        </div>
      </div>

      {session?.user?.role === 'admin' && (
        <p><a href="#" onClick={handleAdminAccess} style={styles.adminLink}>Admin Dashboard</a></p>
      )}

      <div style={styles.footerBottom}>
        <p>&copy; 2025 Happy Tails. All rights reserved.</p>
        <p>
          <Link href="/privacy" style={styles.footerBottomLink}>Privacy Policy</Link> |{' '}
          <Link href="/terms" style={styles.footerBottomLink}>Terms & Conditions</Link>
        </p>
        <button style={styles.backToTop} onClick={scrollToTop}>↑ Back to Top</button>
      </div>
    </footer>
  );
};

export default Footer; 