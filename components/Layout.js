import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../styles/Layout.module.css';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title = 'Mehul Nair' }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Mehul Nair's personal website" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Header />
      
      <main className={`${styles.main} ${mounted ? styles.fadeIn : ''}`}>
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
