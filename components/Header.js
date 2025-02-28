import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.asPath]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <span className={styles.name}>Mehul Nair</span>
        </Link>
      </div>
      
      <button 
        className={styles.menuButton} 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
        <ul className={styles.navList}>
          <li className={router.pathname === '/' ? styles.active : ''}>
            <Link href="/">Home</Link>
          </li>
          <li className={router.pathname === '/about' ? styles.active : ''}>
            <Link href="/about">About</Link>
          </li>
          <li className={router.pathname === '/projects' ? styles.active : ''}>
            <Link href="/projects">Projects</Link>
          </li>
          <li className={router.pathname === '/contact' ? styles.active : ''}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
