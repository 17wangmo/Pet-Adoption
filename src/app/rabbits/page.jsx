'use client';

import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Link from 'next/link';

const rabbits = [
  { name: "Daisy", breed: "Holland Lop", age: "1 year", image: "/image/r1.jfif" },
  { name: "Bun", breed: "Mini Rex", age: "2 years", image: "/image/r2.jpg" },
  { name: "Marshmallow", breed: "Netherland Dwarf", age: "1.5 years", image: "/image/r3.jfif" },
  { name: "Clover", breed: "Lionhead", age: "3 years", image: "/image/r4.jfif" },
  { name: "Willow", breed: "Flemish Giant", age: "1.5 years", image: "/image/r5.jfif" },
  { name: "Coco", breed: "English Angora", age: "2 years", image: "/image/r6.jfif" },
  { name: "Peter", breed: "Dutch", age: "2 years", image: "/image/r7.jfif" },
  { name: "Cinnabun", breed: "Harlequin", age: "2.5 years", image: "/image/r8.jfif" },
  { name: "Snowball", breed: "American Fuzzy Lop", age: "1 year", image: "/image/r9.jfif" },
  { name: "Bug", breed: "English Spot", age: "3 years", image: "/image/r10.jfif" },
  { name: "Angle", breed: "Checkered Giant", age: "1.8 years", image: "/image/r11.jfif" }
];

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#fce4ec',
    padding: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '1.5rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.2s',
  },
  image: {
    width: '180px',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem',
  },
  title: {
    color: '#9c60be',
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2rem',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    margin: '0.5rem 0',
  },
  text: {
    color: '#333',
    margin: '0.25rem 0',
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
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background-color 0.2s',
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
  noResults: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '1.2rem',
    color: '#666'
  }
};

export default function RabbitsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState("all");
  const [breedFilter, setBreedFilter] = useState("all");

  // Get unique breeds for filter
  const allBreeds = [...new Set(rabbits.map(rabbit => rabbit.breed))];

  // Filter rabbits based on search term and filters
  const filteredRabbits = rabbits.filter(rabbit => {
    const matchesSearch = rabbit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rabbit.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const ageNum = parseFloat(rabbit.age);
    const matchesAge = ageFilter === "all" ? true :
      ageFilter === "young" ? ageNum < 1 :
      ageFilter === "adult" ? ageNum >= 1 && ageNum < 3 :
      ageNum >= 3;
    const matchesBreed = breedFilter === "all" || rabbit.breed === breedFilter;
    return matchesSearch && matchesAge && matchesBreed;
  });

  return (
    <>
      <Header />
      <div style={styles.container}>
        <Link href="/" style={{
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
        }}>
          ← Back to Dashboard
        </Link>
        <h1 style={styles.title}>Meet Our Lovely Rabbits 🐰</h1>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by name or breed..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <select
            value={ageFilter}
            onChange={e => setAgeFilter(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="all">All Ages</option>
            <option value="young">Young (under 1 year)</option>
            <option value="adult">Adult (1-3 years)</option>
            <option value="senior">Senior (3+ years)</option>
          </select>
          <select
            value={breedFilter}
            onChange={e => setBreedFilter(e.target.value)}
            style={styles.filterSelect}
          >
            <option value="all">All Breeds</option>
            {allBreeds.map(breed => (
              <option key={breed} value={breed}>{breed}</option>
            ))}
          </select>
        </div>
        {filteredRabbits.length > 0 ? (
          <div style={styles.grid}>
            {filteredRabbits.map((rabbit, idx) => (
              <div key={idx} style={styles.card}>
                <img src={rabbit.image} alt={rabbit.name} style={styles.image} />
                <div style={styles.name}>{rabbit.name}</div>
                <div style={styles.text}>Breed: {rabbit.breed}</div>
                <div style={styles.text}>Age: {rabbit.age}</div>
                <Link
                  href={`/adopt?pet=${encodeURIComponent(rabbit.name)}&type=rabbit&breed=${encodeURIComponent(rabbit.breed)}`}
                  style={styles.button}
                >
                  Adopt Me
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.noResults}>No rabbits found matching your search criteria.</div>
        )}
      </div>
      <Footer />
    </>
  );
} 