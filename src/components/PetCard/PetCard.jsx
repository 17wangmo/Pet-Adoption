import Image from 'next/image';
import Link from 'next/link';
import styles from './PetCard.module.css';

const PetCard = ({ name, breed, age, image, type }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className={styles.image}
        />
      </div>
      <h3>{name}</h3>
      <p>Breed: {breed}</p>
      <p>Age: {typeof age === 'number' ? `${age} years` : age}</p>
      <Link 
        href={`/adopt?pet=${encodeURIComponent(name)}&type=${encodeURIComponent(type)}&breed=${encodeURIComponent(breed)}`}
        className={styles.adoptButton}
      >
        Adopt Me
      </Link>
    </div>
  );
};

export default PetCard; 