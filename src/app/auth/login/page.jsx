'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fce4ec',
    padding: '1rem'
  },
  formWrapper: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    color: '#9c60be',
    textAlign: 'center',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    color: '#666',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    outline: 'none'
  },
  submitButton: {
    backgroundColor: '#9c60be',
    color: 'white',
    padding: '0.75rem',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  },
  error: {
    color: '#e53935',
    fontSize: '0.875rem',
    marginTop: '0.5rem'
  },
  switchText: {
    textAlign: 'center',
    marginTop: '1.5rem',
    color: '#666',
    fontSize: '0.9rem'
  },
  link: {
    color: '#9c60be',
    textDecoration: 'none',
    fontWeight: '500'
  },
  toggleButton: {
    backgroundColor: 'transparent',
    border: '2px solid #9c60be',
    color: '#9c60be',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginBottom: '1rem',
    transition: 'all 0.3s ease'
  },
  activeToggle: {
    backgroundColor: '#9c60be',
    color: 'white'
  }
};

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setError(result.error);
      } else {
        window.location.href = '/post-login-redirect';
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const toggleAdminLogin = () => {
    setIsAdminLogin(!isAdminLogin);
    setError('');
  };

  return (
    <>
      <Header />
    <div style={styles.container}>
      <div style={styles.formWrapper}>
          <h1 style={styles.title}>{isAdminLogin ? 'Admin Login' : 'Login to Your Account'}</h1>
          
          <button 
            onClick={toggleAdminLogin} 
            style={{
              ...styles.toggleButton,
              ...(isAdminLogin ? styles.activeToggle : {})
            }}
          >
            {isAdminLogin ? 'Switch to User Login' : 'Switch to Admin Login'}
          </button>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
                placeholder={isAdminLogin ? "Enter admin email" : "Enter your email"}
              style={styles.input}
              disabled={isLoading}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
                placeholder={isAdminLogin ? "Enter admin password" : "Enter your password"}
              style={styles.input}
              disabled={isLoading}
            />
          </div>
          {error && <div style={styles.error}>{error}</div>}
          <button 
            type="submit" 
            style={{
              ...styles.submitButton,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
            disabled={isLoading}
          >
              {isLoading ? 'Logging in...' : (isAdminLogin ? 'Login as Admin' : 'Login')}
          </button>
        </form>
          {!isAdminLogin && (
        <p style={styles.switchText}>
          Don't have an account?{' '}
          <Link href="/auth/register" style={styles.link}>
            Sign up here
          </Link>
        </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage; 