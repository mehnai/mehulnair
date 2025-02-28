import styles from '../styles/Card.module.css';
import { useState } from 'react';

export default function Card({ title, description, imageUrl, link, tags = [] }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`${styles.card} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl && (
        <div className={styles.imageContainer}>
          <img src={imageUrl} alt={title} className={styles.image} />
        </div>
      )}
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
        
        {link && (
          <a href={link} className={styles.link} target="_blank" rel="noopener noreferrer">
            View Project →
          </a>
        )}
      </div>
    </div>
  );
}
