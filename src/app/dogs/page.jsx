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
  dogGallery: {
    padding: '2rem',
    backgroundColor: '#f7aec6',
    textAlign: 'center'
  },
  dogContainer: {
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

export default function DogsPage() {
  const [dynamicDogs, setDynamicDogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ageFilter, setAgeFilter] = useState('all');
  const [breedFilter, setBreedFilter] = useState('all');

  useEffect(() => {
    // Get dynamically added dogs from localStorage
    if (typeof window !== 'undefined') {
      const storedDogs = JSON.parse(localStorage.getItem('dog')) || [];
      setDynamicDogs(storedDogs);
    }
  }, []);

  // Static dogs data from dogs.html
  const staticDogs = [
    { name: "Buddy", breed: "German Shepherd", age: "2 months", image: "/image/d1.jfif" },
    { name: "Luna", breed: "Golden Retriever", age: "3 months", image: "/image/d2.jfif" },
    { name: "Max", breed: "Beagle", age: "3 months", image: "/image/d3.jfif" },
    { name: "Scoopy", breed: "Cocker Spaniel", age: "2.5 years", image: "/image/d4.jfif" },
    { name: "Rocky", breed: "Boxer", age: "4 years", image: "/image/d5.jfif" },
    { name: "Milo", breed: "Belgian Malinois", age: "1.5 years", image: "/image/d6.jfif" },
    { name: "Daisy", breed: "Australian Cattle Dog", age: "3 months", image: "/image/d7.jfif" },
    { name: "Charlie", breed: "Siberian Husky", age: "1 years", image: "/image/d8.avif" },
    { name: "Rosie", breed: "Shetland Sheepdog", age: "2.8 months", image: "/image/d9.jfif" },
    { name: "Oscar", breed: "Chihuahua", age: "1 year", image: "/image/d10.webp" },
    { name: "Zoe", breed: "Doberman", age: "1 years", image: "/image/d11.webp" },
    { name: "Simba", breed: "Great Dane", age: "4 months", image: "/image/d12.jfif" },
    { name: "Chloe", breed: "Rottweiler", age: "1 years", image: "/image/d13.jfif" },
    { name: "Buster", breed: "Corgi", age: "2.1 years", image: "/image/d14.webp" },
    { name: "Lilly", breed: "Pug", age: "1.7 years", image: "/image/d15.jpg" },
    { name: "Rusty", breed: "Maltese", age: "2.3 years", image: "/image/d16.jpeg" },
    { name: "Milo", breed: "Boston Terrier", age: "1.6 years", image: "/image/d17.jfif" },
    { name: "Ranger", breed: "Australian Shepherd", age: "3.1 months", image: "/image/d18.jfif" },
    { name: "Max", breed: "Akita", age: "3 years", image: "/image/d19.avif" },
    { name: "Teddy", breed: "Border Collie", age: "6 months", image: "/image/d20.webp" },
    { name: "Zoe", breed: "Bichon Frise", age: "4 months", image: "/image/d21.jfif" },
    { name: "Daisy", breed: "Alaskan Malamute", age: "3 months", image: "/image/d22.jfif" },
    { name: "Ace", breed: "Samoyed", age: "2.9 years", image: "/image/d23.jfif" },
    { name: "Luna", breed: "Bernese Mountain Dog", age: "1.5 years", image: "/image/d24.jfif" },
    { name: "Tank", breed: "Saint Bernard", age: "3.3 years", image: "/image/d25.jpg" },
    { name: "Shadow", breed: "French Bulldog", age: "2.2 years", image: "/image/d26.jpg" },
    { name: "Misty", breed: "English Setter", age: "4.1 years", image: "/image/d27.jfif" },
    { name: "Sandy", breed: "Irish Setter", age: "2.7 months", image: "/image/d28.webp" },
    { name: "Diesel", breed: "Weimaraner", age: "2.8 years", image: "/image/d29.jfif" },
    { name: "Hunter", breed: "Pointer", age: "3.4 years", image: "/image/d30.jfif" },
    { name: "Nico", breed: "Afghan Hound", age: "3 years", image: "/image/d31.avif" },
    { name: "Finn", breed: "Greyhound", age: "1.9 years", image: "/image/d32.webp" },
    { name: "Cooper", breed: "Basenji", age: "2.6 years", image: "/image/d33.jfif" }
  ];

  // Get unique breeds for filter
  const allBreeds = [...new Set([...staticDogs, ...dynamicDogs].map(dog => dog.breed))];

  // Filter dogs based on search term and filters
  const filteredDogs = [...staticDogs, ...dynamicDogs].filter(dog => {
    const matchesSearch = dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dog.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAge = ageFilter === 'all' ? true :
                      ageFilter === 'puppy' ? parseFloat(dog.age) < 1 :
                      ageFilter === 'adult' ? parseFloat(dog.age) >= 1 && parseFloat(dog.age) < 7 :
                      parseFloat(dog.age) >= 7;
    const matchesBreed = breedFilter === 'all' || dog.breed === breedFilter;
    
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

        <h1 style={styles.title}>Available Dogs</h1>

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
            <option value="puppy">Puppy (under 1 year)</option>
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
          {filteredDogs.length > 0 ? (
            filteredDogs.map((dog, index) => (
              <PetCard
                key={`dog-${index}`}
                name={dog.name}
                breed={dog.breed}
                age={dog.age}
                image={dog.image}
                type="dog"
              />
            ))
          ) : (
            <div style={styles.noResults}>
              No dogs found matching your search criteria.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 