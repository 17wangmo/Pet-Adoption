'use client';

import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PetCard from '../../components/PetCard/PetCard';

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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
    padding: '1rem'
  },
  catGallery: {
    padding: '2rem',
    backgroundColor: '#f7aec6',
    textAlign: 'center'
  },
  catContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px'
  },
  card: {
    border: '2px solid #ddd',
    padding: '15px',
    margin: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backgroundColor: '#e1bef6'
  },
  image: {
    maxWidth: '200px',
    height: '180px',
    borderRadius: '8px',
    objectFit: 'cover'
  },
  titleCard: {
    fontSize: '1.5rem',
    color: '#333',
    marginTop: '10px'
  },
  text: {
    fontSize: '1rem',
    color: '#666',
    margin: '5px 0'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#ff7f00',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#e26b00'
    }
  },
  searchContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    padding: '1rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    flexWrap: 'wrap'
  },
  searchInput: {
    flex: 1,
    minWidth: '200px',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  filterSelect: {
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    backgroundColor: 'white'
  },
  homeButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#9c60be',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
    marginBottom: '1rem'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem'
  },
  noResults: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.2rem',
    color: '#666'
  }
};

export default function CatsPage() {
  const [dynamicCats, setDynamicCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ageFilter, setAgeFilter] = useState('all');
  const [breedFilter, setBreedFilter] = useState('all');

  useEffect(() => {
    // Get dynamically added cats from localStorage
    if (typeof window !== 'undefined') {
      const storedCats = JSON.parse(localStorage.getItem('cat')) || [];
      setDynamicCats(storedCats);
    }
  }, []);

  // Static cats data from the HTML version
  const staticCats = [
    { name: "Milo", breed: "American Shorthair", age: "8 months", image: "/image/c1.jfif" },
    { name: "Luna", breed: "Persian", age: "2 years", image: "/image/c2.jpg" },
    { name: "Whiskers", breed: "Siamese", age: "6 months", image: "/image/c3.jpg" },
    { name: "Simba", breed: "Burmese", age: "2 years", image: "/image/c4.jfif" },
    { name: "Nala", breed: "Bengal", age: "1.5 years", image: "/image/c5.jfif" },
    { name: "Oreo", breed: "British Shorthair", age: "2 years", image: "/image/c6.jpg" },
    { name: "Cleo", breed: "Calico", age: "2 years", image: "/image/c7.jfif" },
    { name: "Leo", breed: "Maine Coon", age: "2.5 years", image: "/image/c8.jfif" },
    { name: "Misty", breed: "Ragdoll", age: "1 year", image: "/image/c9.jfif" },
    { name: "Tigger", breed: "Tabby", age: "2 years", image: "/image/c10.webp" },
    { name: "Snowball", breed: "Turkish Angora", age: "1 year", image: "/image/c11.jfif" },
    { name: "Zoe", breed: "Russian Blue", age: "9 months", image: "/image/c12.jpeg" },
    { name: "Coco", breed: "Persian", age: "1 year", image: "/image/c13.jfif" },
    { name: "Bella", breed: "Tabby", age: "2 months", image: "/image/c14.avif" },
    { name: "Lily", breed: "Siamese", age: "1 year", image: "/image/c15.jfif" },
    { name: "Ginger", breed: "Orange Tabby", age: "6 months", image: "/image/c16.jpg" },
    { name: "Peach", breed: "British Shorthair", age: "2 years", image: "/image/c17.jfif" },
    { name: "Shadow", breed: "Bombay", age: "3 years", image: "/image/c18.jfif" },
    { name: "Mocha", breed: "Burmese", age: "1.2 years", image: "/image/c19.jfif" },
    { name: "Chloe", breed: "Ragamuffin", age: "2.8 years", image: "/image/c20.jfif" }
  ];

  // Get unique breeds for filter
  const allBreeds = [...new Set([...staticCats, ...dynamicCats].map(cat => cat.breed))];

  // Filter cats based on search term and filters
  const filteredCats = [...staticCats, ...dynamicCats].filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cat.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAge = ageFilter === 'all' ? true :
                      ageFilter === 'kitten' ? parseFloat(cat.age) < 1 :
                      ageFilter === 'adult' ? parseFloat(cat.age) >= 1 && parseFloat(cat.age) < 7 :
                      parseFloat(cat.age) >= 7;
    const matchesBreed = breedFilter === 'all' || cat.breed === breedFilter;
    
    return matchesSearch && matchesAge && matchesBreed;
  });

  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>
        <div style={styles.buttonContainer}>
          <Link href="/" style={styles.homeButton}>
            ← Back to Dashboard
          </Link>
        </div>

        <h1 style={styles.title}>Available Cats</h1>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by name or breed..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <select
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="all">All Ages</option>
            <option value="kitten">Kitten (under 1 year)</option>
            <option value="adult">Adult (1-7 years)</option>
            <option value="senior">Senior (7+ years)</option>
          </select>
          <select
            value={breedFilter}
            onChange={(e) => setBreedFilter(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="all">All Breeds</option>
            {allBreeds.map(breed => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </div>

        <div style={styles.grid}>
          {filteredCats.length > 0 ? (
            filteredCats.map((cat, index) => (
              <PetCard
                key={`cat-${index}`}
                name={cat.name}
                breed={cat.breed}
                age={cat.age}
                image={cat.image}
                type="cat"
              />
            ))
          ) : (
            <div style={styles.noResults}>
              No cats found matching your search criteria.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 