'use client';

import Link from 'next/link';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fce4ec',
    padding: '2rem'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '2rem 3rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    textAlign: 'center'
  },
  title: {
    color: '#9c60be',
    fontSize: '2rem',
    marginBottom: '1rem'
  },
  text: {
    color: '#333',
    fontSize: '1.1rem',
    marginBottom: '2rem'
  },
  button: {
    backgroundColor: '#9c60be',
    color: 'white',
    padding: '0.75rem 2rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default function SuccessPage() {
  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Adoption Request Submitted!</h1>
          <p style={styles.text}>
            Thank you for your interest in adopting a pet!<br />
            Our team will review your request and contact you soon.
          </p>
          <Link href="/" style={styles.button}>
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}