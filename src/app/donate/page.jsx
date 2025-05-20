'use client';

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const styles = {
  container: {
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#fce4ec',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  donationBox: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px'
  },
  title: {
    color: '#9c60be',
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '1.8rem'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#666',
    fontSize: '0.9rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s'
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s'
  },
  error: {
    color: '#e53935',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
    display: 'block'
  },
  submitError: {
    color: '#e53935',
    textAlign: 'center',
    marginBottom: '1rem',
    padding: '0.5rem',
    backgroundColor: '#ffebee',
    borderRadius: '4px'
  },
  submitButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#9c60be',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  otpContainer: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    border: '1px solid #ddd'
  },
  otpInput: {
    width: '50px',
    height: '50px',
    margin: '0 5px',
    textAlign: 'center',
    fontSize: '1.2rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none'
  },
  otpMessage: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '1rem'
  },
  resendButton: {
    background: 'none',
    border: 'none',
    color: '#9c60be',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginTop: '0.5rem'
  },
  timer: {
    color: '#666',
    fontSize: '0.9rem',
    textAlign: 'center',
    marginTop: '0.5rem'
  }
};

const DonatePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    method: 'BOB',
    accountno: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Generate a random 6-digit OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Store the generated OTP
  const [generatedOtp, setGeneratedOtp] = useState('');

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle OTP verification
  const verifyOTP = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp === generatedOtp) {
      // OTP is correct, proceed with donation
      localStorage.setItem('donationDetails', JSON.stringify({
        name: formData.name,
        amount: formData.amount,
        timestamp: new Date().toISOString()
      }));
      router.push('/thank-you');
    } else {
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  // Handle resend OTP
  const handleResendOTP = () => {
    if (!canResend) return;
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    setTimer(30);
    setCanResend(false);
    // In a real app, you would send this OTP to the user's phone/email
    alert(`Your new OTP is: ${newOtp}`); // For demo purposes only
  };

  // Timer effect
  React.useEffect(() => {
    let interval;
    if (showOtp && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [showOtp, timer]);

  if (status === 'loading') {
    return (
      <>
        <Header />
        <div style={styles.container}>
          <div style={styles.donationBox}>
            <h2 style={styles.title}>Loading...</h2>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!session) {
    router.push('/auth/login');
    return null;
  }

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!formData.accountno.trim()) {
      newErrors.accountno = 'Account number is required';
    } else if (!/^\d{8,}$/.test(formData.accountno)) {
      newErrors.accountno = 'Please enter a valid account number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate and store OTP
      const newOtp = generateOTP();
      setGeneratedOtp(newOtp);
      setShowOtp(true);
      setTimer(30);
      setCanResend(false);
      // In a real app, you would send this OTP to the user's phone/email
      alert(`Your OTP is: ${newOtp}`); // For demo purposes only
    } catch (error) {
      console.error('Error generating OTP:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to process request. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <div style={styles.donationBox}>
          <h2 style={styles.title}>Support Our Shelter</h2>

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                disabled={isSubmitting}
                style={styles.input}
              />
              {errors.name && <span style={styles.error}>{errors.name}</span>}
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="amount" style={styles.label}>Donation Amount (Nu.)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                min="1"
                disabled={isSubmitting}
                style={styles.input}
              />
              {errors.amount && <span style={styles.error}>{errors.amount}</span>}
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="method" style={styles.label}>Payment Method</label>
              <select
                id="method"
                name="method"
                value={formData.method}
                onChange={handleChange}
                disabled={isSubmitting}
                style={styles.select}
              >
                <option value="wallet">Mobile Wallet</option>
                <option value="card">Credit/Debit Card</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="accountno" style={styles.label}>Account Number</label>
              <input
                type="text"
                id="accountno"
                name="accountno"
                value={formData.accountno}
                onChange={handleChange}
                placeholder="Enter Account Number"
                disabled={isSubmitting}
                style={styles.input}
              />
              {errors.accountno && <span style={styles.error}>{errors.accountno}</span>}
            </div>

            {!showOtp ? (
              <button 
                type="submit" 
                style={{
                  ...styles.submitButton,
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Send OTP'}
              </button>
            ) : (
              <div style={styles.otpContainer}>
                <p style={styles.otpMessage}>
                  Please enter the 6-digit OTP sent to your registered mobile number
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      name={`otp-${index}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      style={styles.otpInput}
                      maxLength={1}
                      autoComplete="off"
                    />
                  ))}
                </div>
                {otpError && <p style={styles.error}>{otpError}</p>}
                <div style={styles.timer}>
                  {timer > 0 ? `Resend OTP in ${timer}s` : ''}
                </div>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  style={styles.resendButton}
                  disabled={!canResend}
                >
                  {canResend ? 'Resend OTP' : 'Resend OTP'}
                </button>
                <button
                  type="button"
                  onClick={verifyOTP}
                  style={{
                    ...styles.submitButton,
                    marginTop: '1rem'
                  }}
                >
                  Verify & Complete Donation
                </button>
              </div>
            )}

            {errors.submit && (
              <div style={styles.submitError}>
                {errors.submit}
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DonatePage; 