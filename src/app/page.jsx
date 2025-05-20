'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#fef6f2'
  },
  heroSection: {
    position: 'relative',
    height: '80vh',
    backgroundImage: "url('/image/background.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    padding: '2rem',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)'
    }
  },
  heroContent: {
    maxWidth: '600px',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    zIndex: 1
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  heroText: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem'
  },
  heroButton: {
    display: 'inline-block',
    backgroundColor: '#f48fb1',
    color: 'white',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s'
  },
  secondaryButton: {
    display: 'inline-block',
    backgroundColor: 'transparent',
    color: 'white',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    border: '2px solid white',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'white',
      color: '#9c60be'
    }
  },
  searchSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    backgroundColor: '#fce4ec',
    flexWrap: 'wrap',
    gap: '1rem',
    position: 'relative',
    zIndex: 2
  },
  searchWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  searchFilters: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  filterSelect: {
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'white',
    minWidth: '120px'
  },
  loadingSpinner: {
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #9c60be',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    animation: 'spin 1s linear infinite',
    margin: '0 auto'
  },
  searchInput: {
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '10px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    '&:focus': {
      borderColor: '#9c60be',
      boxShadow: '0 0 0 2px rgba(156, 96, 190, 0.2)'
    }
  },
  searchButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#713494',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
    width: '100%',
    '&:disabled': {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed'
    },
    '&:hover:not(:disabled)': {
      backgroundColor: '#5a2a77'
    }
  },
  suggestionsList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderTop: 'none',
    borderRadius: '0 0 10px 10px',
    zIndex: 10,
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  suggestionItem: {
    padding: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  categorySection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    padding: '2rem',
    flexWrap: 'wrap',
    backgroundColor: '#f3d3de'
  },
  categoryCard: {
    backgroundColor: '#67dad4',
    padding: '1rem 2rem',
    borderRadius: '10px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    position: 'relative',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    transform: 'translateY(0)',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
    }
  },
  categoryLink: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  dropdownContent: {
    position: 'absolute',
    backgroundColor: '#f8bbd0',
    width: '200px',
    padding: '10px',
    borderRadius: '5px',
    zIndex: 1000,
    top: 'calc(100% + 5px)',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    border: '1px solid rgba(0,0,0,0.1)'
  },
  dropdownLink: {
    display: 'block',
    color: '#713494',
    padding: '12px 16px',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    borderRadius: '4px',
    backgroundColor: 'white',
    margin: '2px 0',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  videoSection: {
    position: 'relative',
    height: '370px',
    overflow: 'hidden'
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  videoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  },
  story: {
    backgroundColor: '#fce4ec',
    padding: '2rem'
  },
  storyContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  storyImage: {
    borderRadius: '10px'
  },
  storyText: {
    flex: 1,
    minWidth: '300px'
  },
  stats: {
    backgroundColor: '#f8bbd0',
    padding: '3rem 0'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  statItem: {
    textAlign: 'center',
    color: 'white'
  },
  featuredPet: {
    padding: '3rem 1rem',
    backgroundColor: 'white',
    textAlign: 'center'
  },
  featuredContent: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  featuredImage: {
    borderRadius: '15px'
  },
  featuredInfo: {
    maxWidth: '500px',
    textAlign: 'left'
  },
  adoptBtn: {
    display: 'inline-block',
    backgroundColor: '#f48fb1',
    color: 'white',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    borderRadius: '8px',
    marginTop: '1rem'
  },
  successStories: {
    backgroundColor: '#fce4ec',
    padding: '3rem 1rem'
  },
  storiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  storyCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  storyVideo: {
    width: '100%',
    borderRadius: '8px'
  },
  readMoreLink: {
    color: '#f48fb1',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  modalInputGroup: {
    marginBottom: '20px'
  },
  modalLabel: {
    display: 'block',
    marginBottom: '5px'
  },
  modalInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  newsletterSection: {
    backgroundColor: '#f8bbd0',
    padding: '3rem 1rem',
    textAlign: 'center'
  },
  newsletterForm: {
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  newsletterInput: {
    padding: '0.75rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    flex: 1,
    minWidth: '250px'
  },
  newsletterButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#9c60be',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#7d4b9c'
    }
  },
  whyAdoptSection: {
    padding: '3rem 1rem',
    backgroundColor: '#fef6f2'
  },
  whyAdoptGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  whyAdoptCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  faqSection: {
    padding: '3rem 1rem',
    backgroundColor: '#fce4ec'
  },
  faqContainer: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  faqItem: {
    backgroundColor: 'white',
    marginBottom: '1rem',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  faqQuestion: {
    padding: '1rem',
    backgroundColor: '#f8bbd0',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  faqAnswer: {
    padding: '1rem',
    display: 'none'
  },
  faqAnswerActive: {
    display: 'block'
  },
  recentlyAdoptedSection: {
    padding: '3rem 1rem',
    backgroundColor: '#fef6f2'
  },
  recentlyAdoptedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  adoptedCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)'
    }
  },
  adoptedImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  adoptedInfo: {
    padding: '1.5rem'
  },
  adoptedDate: {
    color: '#9c60be',
    fontSize: '0.9rem',
    marginBottom: '0.5rem'
  },
  statsSection: {
    backgroundColor: '#fce4ec',
    padding: '3rem 1rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  statNumber: {
    fontSize: '2.5rem',
    color: '#9c60be',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  }
};

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [petImage, setPetImage] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    type: 'all',
    age: 'all',
    size: 'all'
  });
  const [isSearching, setIsSearching] = useState(false);
  const [showFaq, setShowFaq] = useState({});

  const searchSuggestions = [
    { keyword: "dog", link: "/dogs" },
    { keyword: "cat", link: "/cats" },
    { keyword: "rabbit", link: "/rabbits" },
    { keyword: "guinea pig", link: "/guinea-pigs" },
    { keyword: "bird", link: "/birds" }
  ];

  const handleSearch = () => {
    setIsSearching(true);
    const inputValue = searchInput.toLowerCase().trim();
    
    // Get the selected filters
    const { type, age, size } = searchFilters;
    
    // Define the search paths for each type
    const searchPaths = {
      dog: '/dogs',
      cat: '/cats',
      rabbit: '/rabbits',
      bird: '/birds',
      'guinea-pig': '/guinea-pigs'
    };

    // If type filter is selected, go directly to that page
    if (type !== 'all') {
      window.location.href = searchPaths[type];
      return;
    }

    // If no type filter but search term matches a type
    const match = searchSuggestions.find(item => 
      inputValue.includes(item.keyword.toLowerCase())
    );

    if (match) {
      // Store filters in localStorage for the target page to use
      localStorage.setItem('searchFilters', JSON.stringify({
        searchTerm: inputValue,
        age: age,
        size: size
      }));
      window.location.href = match.link;
    } else {
      // If no direct match but we have search term, search across all pages
      if (inputValue) {
        localStorage.setItem('searchFilters', JSON.stringify({
          searchTerm: inputValue,
          age: age,
          size: size
        }));
        // Default to dogs page if no specific type is mentioned
        window.location.href = '/dogs';
      } else {
        alert("Please enter a search term or select a pet type");
      }
    }
    
    setIsSearching(false);
  };

  const handleInputChange = (e) => {
    const input = e.target.value.toLowerCase().trim();
    setSearchInput(input);

    if (!input) {
      setSuggestions([]);
      return;
    }

    const filtered = searchSuggestions.filter(s => s.keyword.includes(input));
    setSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleImageChange = (e) => {
    setPetImage(e.target.files[0]);
  };

  useEffect(() => {
    const animateCounter = (id, start, end, duration) => {
      const obj = document.getElementById(id);
      if (!obj) return;

      const range = end - start;
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + range * progress);
        obj.textContent = current.toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    };

    animateCounter("petsAdopted", 0, 1800, 20000);
    animateCounter("donations", 0, 180, 20000);
  }, []);

  const handleAddPetSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', newPet.name);
      formData.append('species', newPet.species);
      formData.append('age', newPet.age);
      formData.append('description', newPet.description);
      if (petImage) {
        formData.append('image', petImage);
      }

      const res = await fetch('/api/pets', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        fetch('/api/pets').then(res => res.json()).then(data => setPets(data)).catch(err => console.error("Error re-fetching pets:", err));
        setIsModalOpen(false);
        setNewPet({ name: '', species: '', age: '', description: '' });
        setPetImage(null);
      } else {
        setError(data.error || "Failed to add pet");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add a new function to handle filter changes
  const handleFilterChange = (filterType, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    
    // If a type is selected, update the search input
    if (filterType === 'type' && value !== 'all') {
      const typeNames = {
        dog: 'dog',
        cat: 'cat',
        rabbit: 'rabbit',
        bird: 'bird',
        'guinea-pig': 'guinea pig'
      };
      setSearchInput(typeNames[value] || '');
    }
  };

  return (
    <>
      <Header />
      <main style={styles.main}>
        <section style={styles.searchSection}>
          <div style={styles.searchWrapper}>
            <input
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="Search by name, breed, or type..."
              style={styles.searchInput}
              autoComplete="off"
            />
            <div style={styles.searchFilters}>
              <select 
                style={styles.filterSelect}
                value={searchFilters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
                <option value="rabbit">Rabbits</option>
                <option value="bird">Birds</option>
                <option value="guinea-pig">Guinea Pigs</option>
              </select>
              <select 
                style={styles.filterSelect}
                value={searchFilters.age}
                onChange={(e) => handleFilterChange('age', e.target.value)}
              >
                <option value="all">All Ages</option>
                <option value="young">Young</option>
                <option value="adult">Adult</option>
                <option value="senior">Senior</option>
              </select>
              <select 
                style={styles.filterSelect}
                value={searchFilters.size}
                onChange={(e) => handleFilterChange('size', e.target.value)}
              >
                <option value="all">All Sizes</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            {isSearching ? (
              <div style={styles.loadingSpinner} />
            ) : (
              <button 
                style={styles.searchButton} 
                onClick={handleSearch}
                disabled={!searchInput && searchFilters.type === 'all'}
              >
                {searchFilters.type !== 'all' ? `Search ${searchFilters.type}s` : 'Search'}
              </button>
            )}
          </div>
        </section>

        <section style={styles.heroSection}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>Saving the Lives of Homeless Animals</h1>
            <p style={styles.heroText}>Since 2003, HART for Animals, Inc. has been rescuing and finding homes for animals in Western Maryland, West Virginia, and Western Pennsylvania.</p>
            <div style={styles.heroButtons}>
              <Link href="/donate" style={styles.heroButton}>
                Save a Life – Donate Now
              </Link>
              <Link href="/adopt" style={styles.secondaryButton}>
                Find Your Perfect Pet
              </Link>
            </div>
          </div>
        </section>

        <section style={styles.categorySection}>
          <Link href="/dogs" style={styles.categoryCard}>
            <span style={styles.categoryLink}>Dogs</span>
          </Link>
          <Link href="/cats" style={styles.categoryCard}>
            <span style={styles.categoryLink}>Cats</span>
          </Link>
          <div 
            style={styles.categoryCard}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span style={styles.categoryLink}>Other Pets</span>
            <div style={{
              ...styles.dropdownContent,
              display: showDropdown ? 'flex' : 'none'
            }}>
              <Link 
                href="/rabbits" 
                style={styles.dropdownLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f48fb1';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#713494';
                }}
              >
                Rabbits
              </Link>
              <Link 
                href="/guinea-pigs" 
                style={styles.dropdownLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f48fb1';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#713494';
                }}
              >
                Guinea Pigs
              </Link>
              <Link 
                href="/birds" 
                style={styles.dropdownLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f48fb1';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#713494';
                }}
              >
                Birds
              </Link>
            </div>
          </div>
        </section>

        <section style={styles.videoSection}>
          <video autoPlay muted loop style={styles.backgroundVideo}>
            <source src="/image/video1.mp4" type="video/mp4" />
          </video>
          <div style={styles.videoOverlay}>
            <h2>Welcome to Happy Tails</h2>
            <p>Your next furry friend is waiting</p>
          </div>
        </section>

        <section style={styles.story}>
          <div style={styles.storyContainer}>
            <Image
              src="/image/1.jpg"
              alt="Our story"
              width={300}
              height={200}
              style={styles.storyImage}
            />
            <div style={styles.storyText}>
              <h2>Our Story</h2>
              <p>Happy Tails began with a simple mission — to connect loving homes with pets in need. What started as a small rescue project quickly turned into a full-fledged adoption service that has helped hundreds of animals find their forever families.</p>
              <p>We believe in kindness, responsibility, and the joy that animals bring into our lives. Join us in making tails wag and hearts happy.</p>
            </div>
          </div>
        </section>

        <section style={styles.stats}>
          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <h3 id="petsAdopted">0</h3>
              <p>Pets Adopted</p>
            </div>
            <div style={styles.statItem}>
              <h3 id="donations">0</h3>
              <p>Animals Available</p>
            </div>
            <div style={styles.statItem}>
              <h3>5</h3>
              <p>Animal Categories</p>
            </div>
          </div>
        </section>

        <section style={styles.featuredPet}>
          <h2>🐶 Featured Pet of the Week</h2>
          <div style={styles.featuredContent}>
            <Image
              src="/image/c14.avif"
              alt="Featured Pet"
              width={300}
              height={300}
              style={styles.featuredImage}
            />
            <div style={styles.featuredInfo}>
              <h3>Meet Bella</h3>
              <p>Bella is a 2-year-old lab mix who loves cuddles and belly rubs. She's ready for her forever home!</p>
              <Link href="/adopt" style={styles.adoptBtn}>
                Adopt Bella
              </Link>
            </div>
          </div>
        </section>

        <section style={styles.successStories}>
          <h2>Adoption Success Stories</h2>
          <div style={styles.storiesGrid}>
            <div style={styles.storyCard}>
              <h3>Buddy's Journey</h3>
              <video autoPlay muted loop playsInline style={styles.storyVideo}>
                <source src="/image/journey (1).mp4" type="video/mp4" />
              </video>
              <p>Buddy was rescued in winter 2024 and now lives happily with a family of four in Paro.</p>
              <Link href="#" style={styles.readMoreLink}>Read More</Link>
            </div>
            <div style={styles.storyCard}>
              <h3>Max's Happy Tail 🎥</h3>
              <video autoPlay muted loop playsInline style={styles.storyVideo}>
                <source src="/image/journey (2).mp4" type="video/mp4" />
              </video>
              <p>Max now lives happily in a garden home and spends his days playing fetch!</p>
              <Link href="#" style={styles.readMoreLink}>Read More</Link>
            </div>
          </div>
        </section>

        <section style={styles.recentlyAdoptedSection}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Recently Adopted Pets</h2>
          <div style={styles.recentlyAdoptedGrid}>
            {[
              { name: 'Max', type: 'Dog', breed: 'Golden Retriever', date: 'March 15, 2024', image: '/image/gol.webp' },
              { name: 'Luna', type: 'Cat', breed: 'Siamese', date: 'March 14, 2024', image: '/image/ca.jfif' },
              { name: 'Bunny', type: 'Rabbit', breed: 'Holland Lop', date: 'March 13, 2024', image: '/image/ra.jfif' }
            ].map((pet, index) => (
              <div key={index} style={styles.adoptedCard}>
                <img src={pet.image} alt={pet.name} style={styles.adoptedImage} />
                <div style={styles.adoptedInfo}>
                  <div style={styles.adoptedDate}>{pet.date}</div>
                  <h3>{pet.name}</h3>
                  <p>{pet.breed} {pet.type}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.newsletterSection}>
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for adoption updates and pet care tips</p>
          <form style={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.newsletterInput}
              required
            />
            <button type="submit" style={styles.newsletterButton}>
              Subscribe
            </button>
          </form>
        </section>

        <section style={styles.whyAdoptSection}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Why Adopt?</h2>
          <div style={styles.whyAdoptGrid}>
            <div style={styles.whyAdoptCard}>
              <h3>Save a Life</h3>
              <p>Give a second chance to an animal in need of a loving home</p>
            </div>
            <div style={styles.whyAdoptCard}>
              <h3>Unconditional Love</h3>
              <p>Experience the joy and companionship of a pet's unconditional love</p>
            </div>
            <div style={styles.whyAdoptCard}>
              <h3>Cost-Effective</h3>
              <p>Adoption fees are typically lower than buying from a breeder</p>
            </div>
            <div style={styles.whyAdoptCard}>
              <h3>Support Rescue</h3>
              <p>Help reduce the number of animals in shelters</p>
            </div>
          </div>
        </section>

        <section style={styles.statsSection}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Impact</h2>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>95%</div>
              <p>Adoption Success Rate</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>1,800+</div>
              <p>Pets Adopted</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>98%</div>
              <p>Happy Families</p>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>24/7</div>
              <p>Support Available</p>
            </div>
          </div>
        </section>

        <section style={styles.faqSection}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Frequently Asked Questions</h2>
          <div style={styles.faqContainer}>
            {[
              {
                question: "What is the adoption process?",
                answer: "Our adoption process includes an application, meet-and-greet, and home visit to ensure the best match for both pet and family."
              },
              {
                question: "How much does it cost to adopt?",
                answer: "Adoption fees vary by animal type and age, typically ranging from $50 to $200. This includes spay/neuter, vaccinations, and microchipping."
              },
              {
                question: "Can I return a pet if it doesn't work out?",
                answer: "Yes, we have a return policy. We want to ensure both the pet and family are happy. Contact us within 30 days if you need to return a pet."
              },
              {
                question: "What if I have other pets?",
                answer: "We help facilitate introductions between your current pets and potential new family members. Our staff can provide guidance on proper introductions."
              },
              {
                question: "Do you offer post-adoption support?",
                answer: "Yes, we provide ongoing support including training resources, veterinary referrals, and behavioral consultation if needed."
              }
            ].map((faq, index) => (
              <div key={index} style={styles.faqItem}>
                <div 
                  style={styles.faqQuestion}
                  onClick={() => setShowFaq(prev => ({...prev, [index]: !prev[index]}))}
                >
                  {faq.question}
                  <span>{showFaq[index] ? '−' : '+'}</span>
                </div>
                <div style={{
                  ...styles.faqAnswer,
                  ...(showFaq[index] ? styles.faqAnswerActive : {})
                }}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
