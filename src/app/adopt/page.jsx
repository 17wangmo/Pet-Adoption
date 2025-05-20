'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fce4ec',
    padding: '2rem',
  },
  formWrapper: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  title: {
    color: '#9c60be',
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    color: '#666',
    fontSize: '0.9rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
  },
  textarea: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    minHeight: '150px',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#9c60be',
    color: 'white',
    padding: '1rem',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: '#e53935',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
  },
};

export default function AdoptPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdoptPageContent />
    </Suspense>
  );
}

function AdoptPageContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    petName: searchParams.get('pet') ? decodeURIComponent(searchParams.get('pet')) : '',
    petType: searchParams.get('type') ? decodeURIComponent(searchParams.get('type')) : '',
    petBreed: searchParams.get('breed') ? decodeURIComponent(searchParams.get('breed')) : '',
    phone: '',
    email: session?.user?.email || '',
    reason: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [petDetails, setPetDetails] = useState(null);

  useEffect(() => {
    // If we have pet details from URL, set them
    if (formData.petName && formData.petType && formData.petBreed) {
      setPetDetails({
        name: formData.petName,
        type: formData.petType,
        breed: formData.petBreed
      });
    }
  }, [formData.petName, formData.petType, formData.petBreed]);

  if (status === 'loading') {
    return (
      <>
        <Header />
        <div style={styles.container}>
          <div style={styles.formWrapper}>
            <h1 style={styles.title}>Loading...</h1>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!session) {
    const callbackUrl = `/adopt?pet=${encodeURIComponent(formData.petName)}&type=${encodeURIComponent(formData.petType)}&breed=${encodeURIComponent(formData.petBreed)}`;
    router.push(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (!petDetails) {
        setError('Please select a valid pet');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/adoptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          petName: petDetails.name,
          petType: petDetails.type,
          petBreed: petDetails.breed
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/adopt/success');
      } else {
        setError(data.error || 'Failed to submit adoption request');
      }
    } catch (error) {
      console.error('Adoption submission error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <h1 style={styles.title}>Adopt Your New Furry Friend</h1>
          {petDetails && (
            <div style={{
              backgroundColor: '#f8bbd0',
              padding: '1rem',
              borderRadius: '5px',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0' }}>Selected Pet: {petDetails.name}</h3>
              <p style={{ margin: 0 }}>Breed: {petDetails.breed}</p>
              <p style={{ margin: 0 }}>Type: {petDetails.type}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} style={styles.form}>
            {!petDetails && (
              <div style={styles.inputGroup}>
                <label htmlFor="petName" style={styles.label}>Pet Name</label>
                <input
                  type="text"
                  id="petName"
                  name="petName"
                  value={formData.petName}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Enter the name of the pet you want to adopt"
                />
              </div>
            )}

            {!petDetails && (
              <div style={styles.inputGroup}>
                <label htmlFor="petType" style={styles.label}>Pet Type</label>
                <input
                  type="text"
                  id="petType"
                  name="petType"
                  value={formData.petType}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Enter the type of the pet you want to adopt"
                />
              </div>
            )}

            {!petDetails && (
              <div style={styles.inputGroup}>
                <label htmlFor="petBreed" style={styles.label}>Pet Breed</label>
                <input
                  type="text"
                  id="petBreed"
                  name="petBreed"
                  value={formData.petBreed}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Enter the breed of the pet you want to adopt"
                />
              </div>
            )}

            <div style={styles.inputGroup}>
              <label htmlFor="phone" style={styles.label}>Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Enter your phone number"
                pattern="[0-9\s-+()]{10,}"
                title="Please enter a valid phone number"
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Enter your email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Please enter a valid email address"
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="reason" style={styles.label}>Why do you want to adopt this pet?</label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                style={styles.textarea}
                placeholder="Tell us why you'd be a great pet parent..."
                minLength="5"
              />
            </div>

            {error && <div style={styles.error}>{error}</div>}

            <button
              type="submit"
              style={{
                ...styles.button,
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
              disabled={isSubmitting || !petDetails}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Adoption Request'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
} 