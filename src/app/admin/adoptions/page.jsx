'use client';

import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const tableStyles = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f8f9fa'
  },
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    whiteSpace: 'normal',
    backgroundColor: 'white'
  },
  th: {
    backgroundColor: '#f3e6fa',
    color: '#333',
    padding: '1rem',
    textAlign: 'left',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    borderBottom: '2px solid #e0e0e0'
  },
  td: {
    padding: '1rem',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '0.9rem',
    maxWidth: '200px', // Limit cell width
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  reasonCell: {
    maxWidth: '300px',
    whiteSpace: 'normal', // Allow text to wrap
    lineHeight: '1.4'
  },
  statusCell: {
    textAlign: 'center'
  },
  button: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'opacity 0.2s'
  },
  approveButton: {
    backgroundColor: '#4CAF50'
  },
  rejectButton: {
    backgroundColor: '#f44336'
  },
  buttonContainer: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'center'
  },
  title: {
    color: '#9c60be',
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2rem'
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#ffebee',
    borderRadius: '4px'
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#9c60be',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '0.95rem',
    marginBottom: '1rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2rem'
  }
};

export default function AdminAdoptions() {
  const [adoptions, setAdoptions] = useState([]);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleAdoptionStatus = async (adoptionId, status) => {
    try {
      const res = await fetch('/api/adoptions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adoptionId, status }),
      });
      const data = await res.json();
      if (res.ok) {
        setAdoptions(prev =>
          prev.map(a => (a._id === adoptionId ? { ...a, status } : a))
        );
      } else {
        setError(data.error || 'Failed to update status');
      }
    } catch (err) {
      setError('Error updating adoption status');
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
      return;
    }

    if (session?.user?.role !== 'admin') {
      router.push('/');
      return;
    }

    const fetchAdoptions = async () => {
      try {
        const res = await fetch('/api/adoptions');
        const data = await res.json();
        if (res.ok) {
          setAdoptions(data);
        } else {
          setError(data.error || 'Failed to fetch adoptions');
        }
      } catch (err) {
        setError('Error fetching adoptions');
      }
    };
    fetchAdoptions();
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <>
        <Header />
        <main style={tableStyles.container}>
          <h1 style={tableStyles.title}>Loading...</h1>
        </main>
        <Footer />
      </>
    );
  }

  if (session?.user?.role !== 'admin') {
    return null;
  }

  return (
    <>
      <Header />
      <main style={tableStyles.container}>
        <div style={tableStyles.header}>
          <Link href="/admin" style={tableStyles.backButton}>
            ← Back to Dashboard
          </Link>
          <h1 style={tableStyles.title}>Adoption Requests</h1>
        </div>
        {error && <div style={tableStyles.error}>{error}</div>}
        <div style={tableStyles.tableWrapper}>
          <table style={tableStyles.table}>
            <thead>
              <tr>
                <th style={tableStyles.th}>Pet Name</th>
                <th style={tableStyles.th}>Type</th>
                <th style={tableStyles.th}>Breed</th>
                <th style={tableStyles.th}>User</th>
                <th style={tableStyles.th}>Email</th>
                <th style={tableStyles.th}>Phone</th>
                <th style={tableStyles.th}>Reason</th>
                <th style={tableStyles.th}>Status</th>
                <th style={tableStyles.th}>Requested At</th>
                <th style={tableStyles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {adoptions.map((adoption) => (
                <tr key={adoption._id}>
                  <td style={tableStyles.td}>{adoption.petName}</td>
                  <td style={tableStyles.td}>{adoption.petType}</td>
                  <td style={tableStyles.td}>{adoption.petBreed}</td>
                  <td style={tableStyles.td}>{adoption.user?.name || 'N/A'}</td>
                  <td style={tableStyles.td}>{adoption.email}</td>
                  <td style={tableStyles.td}>{adoption.phone}</td>
                  <td style={{...tableStyles.td, ...tableStyles.reasonCell}}>{adoption.reason}</td>
                  <td style={{...tableStyles.td, ...tableStyles.statusCell}}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      backgroundColor: 
                        adoption.status === 'approved' ? '#e8f5e9' :
                        adoption.status === 'rejected' ? '#ffebee' :
                        '#fff3e0',
                      color:
                        adoption.status === 'approved' ? '#2e7d32' :
                        adoption.status === 'rejected' ? '#c62828' :
                        '#ef6c00'
                    }}>
                      {adoption.status || 'pending'}
                    </span>
                  </td>
                  <td style={tableStyles.td}>
                    {new Date(adoption.createdAt).toLocaleString()}
                  </td>
                  <td style={tableStyles.td}>
                    {adoption.status === 'pending' && (
                      <div style={tableStyles.buttonContainer}>
                        <button
                          onClick={() => handleAdoptionStatus(adoption._id, 'approved')}
                          style={{...tableStyles.button, ...tableStyles.approveButton}}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAdoptionStatus(adoption._id, 'rejected')}
                          style={{...tableStyles.button, ...tableStyles.rejectButton}}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}