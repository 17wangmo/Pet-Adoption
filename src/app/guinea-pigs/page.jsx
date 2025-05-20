"use client";
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Link from "next/link";

const guineaPigs = [
  { name: "Peanut", breed: "Abyssinian", age: "1 year", image: "/image/g1.jfif" },
  { name: "Pumpkin", breed: "Peruvian", age: "2 years", image: "/image/g2.jfif" },
  { name: "Oreo", breed: "American", age: "6 months", image: "/image/g3.jfif" },
  { name: "Hazel", breed: "Teddy", age: "3 years", image: "/image/g4.jfif" },
  { name: "Mocha", breed: "Texel", age: "1.5 years", image: "/image/g5.webp" },
  { name: "Lily", breed: "English", age: "2 years", image: "/image/g6.jfif" },
  { name: "Ginger", breed: "Abyssinian", age: "4 months", image: "/image/g7.jpg" },
  { name: "Basil", breed: "Peruvian", age: "2.5 years", image: "/image/g8.jfif" },
  { name: "Cookie", breed: "American", age: "8 months", image: "/image/g9.jfif" },
  { name: "Shadow", breed: "Teddy", age: "3 years", image: "/image/g10'.jfif" },
  { name: "Maple", breed: "Texel", age: "1 year", image: "/image/g11.jpg" },
];

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#fce4ec",
    padding: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    padding: "1.5rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.2s",
  },
  image: {
    width: "180px",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "1rem",
  },
  title: {
    color: "#9c60be",
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "2rem",
  },
  name: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    margin: "0.5rem 0",
  },
  text: {
    color: "#333",
    margin: "0.25rem 0",
  },
  button: {
    backgroundColor: "#9c60be",
    color: "white",
    padding: "0.75rem 2rem",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "1rem",
    transition: "background-color 0.2s",
  },
  searchContainer: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    flexWrap: "wrap"
  },
  searchInput: {
    flex: 1,
    minWidth: "200px",
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem"
  },
  filterSelect: {
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    backgroundColor: "white"
  },
  noResults: {
    textAlign: "center",
    padding: "2rem",
    fontSize: "1.2rem",
    color: "#666"
  }
};

export default function GuineaPigsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState("all");
  const [breedFilter, setBreedFilter] = useState("all");

  // Get unique breeds for filter
  const allBreeds = [...new Set(guineaPigs.map(gp => gp.breed))];

  // Filter guinea pigs based on search term and filters
  const filteredGuineaPigs = guineaPigs.filter(gp => {
    const matchesSearch = gp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gp.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const ageNum = parseFloat(gp.age);
    const matchesAge = ageFilter === "all" ? true :
      ageFilter === "young" ? ageNum < 1 :
      ageFilter === "adult" ? ageNum >= 1 && ageNum < 3 :
      ageNum >= 3;
    const matchesBreed = breedFilter === "all" || gp.breed === breedFilter;
    return matchesSearch && matchesAge && matchesBreed;
  });

  return (
    <>
      <Header />
      <div style={styles.container}>
        <Link href="/" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          backgroundColor: "#9c60be",
          color: "white",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "0.95rem",
          marginBottom: "1rem",
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.2s",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          ← Back to Dashboard
        </Link>
        <h1 style={styles.title}>Meet Our Lovely Guinea Pigs 🐹</h1>
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
        {filteredGuineaPigs.length > 0 ? (
          <div style={styles.grid}>
            {filteredGuineaPigs.map((gp, idx) => (
              <div key={idx} style={styles.card}>
                <img src={gp.image} alt={gp.name} style={styles.image} />
                <div style={styles.name}>{gp.name}</div>
                <div style={styles.text}>Breed: {gp.breed}</div>
                <div style={styles.text}>Age: {gp.age}</div>
                <Link
                  href={`/adopt?pet=${encodeURIComponent(gp.name)}&type=guinea-pig&breed=${encodeURIComponent(gp.breed)}`}
                  style={styles.button}
                >
                  Adopt Me
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.noResults}>No guinea pigs found matching your search criteria.</div>
        )}
      </div>
      <Footer />
    </>
  );
}
