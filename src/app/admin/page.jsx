'use client';

import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Link from 'next/link';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fef6f2'
  },
  main: {
    flex: 1,
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%'
  },
  title: {
    color: '#9c60be',
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2.5rem'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '2rem'
  },
  button: {
    padding: '1rem 2rem',
    backgroundColor: '#9c60be',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#8a4ca8'
    }
  }
};

export default function AdminDashboard() {
  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        

        <div style={styles.buttonContainer}>
          <Link href="/admin/pets" style={styles.button}>
            Pets
          </Link>
          <Link href="/admin/adoptions" style={styles.button}>
            View Adoptions
          </Link>
          <Link href="/admin/users" style={styles.button}>
            Users
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
} 