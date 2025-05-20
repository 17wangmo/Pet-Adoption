'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#f8f9fa'
  },
  card: {
    background: 'white',
    padding: '3rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%'
  },
  checkmark: {
    fontSize: '4rem',
    color: '#28a745',
    marginBottom: '1.5rem',
    animation: 'bounce 1s ease'
  },
  cardTitle: {
    color: '#333',
    marginBottom: '2rem',
    fontSize: '2rem'
  },
  details: {
    margin: '2rem 0',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    textAlign: 'left'
  },
  detailsText: {
    margin: '0.5rem 0',
    color: '#555'
  },
  detailsStrong: {
    color: '#333'
  },
  timestamp: {
    fontSize: '0.875rem',
    color: '#666',
    marginTop: '1rem'
  },
  message: {
    color: '#666',
    lineHeight: 1.6,
    margin: '2rem 0'
  },
  homeButton: {
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '5px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  }
};

export default function ThankYouPage() {
  const router = useRouter();
  const [donationDetails, setDonationDetails] = useState(null);

  useEffect(() => {
    const details = localStorage.getItem('donationDetails');
    if (details) {
      setDonationDetails(JSON.parse(details));
      // Clear the details after reading
      localStorage.removeItem('donationDetails');
    }

    // Add keyframes for bounce animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes bounce {
        0% { transform: scale(0.3); opacity: 0; }
        50% { transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.checkmark}>✓</div>
        <h1 style={styles.cardTitle}>Thank You for Your Donation!</h1>
        
        {donationDetails && (
          <div style={styles.details}>
            <p style={styles.detailsText}>
              Dear <span style={styles.detailsStrong}>{donationDetails.name}</span>,
            </p>
            <p style={styles.detailsText}>
              Your generous donation of <span style={styles.detailsStrong}>Nu. {donationDetails.amount}</span> has been received.
            </p>
            <p style={styles.timestamp}>
              Transaction completed on: {formatDate(donationDetails.timestamp)}
            </p>
          </div>
        )}

        <p style={styles.message}>
          Your support helps us continue our mission of providing care and shelter to animals in need.
          We truly appreciate your generosity!
        </p>

        <button 
          style={styles.homeButton}
          onClick={() => router.push('/')}
          onMouseOver={(e) => e.target.style.backgroundColor = '#357abd'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4a90e2'}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
} 