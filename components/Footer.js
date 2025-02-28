import styles from '../styles/Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.social}>
          <a href="https://github.com/mehulnair" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            GitHub
          </a>
          <a href="https://linkedin.com/in/mehulnair" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            LinkedIn
          </a>
          <a href="https://twitter.com/mehulnair" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            Twitter
          </a>
        </div>
        <p className={styles.copyright}>© {currentYear} Mehul Nair. All rights reserved.</p>
      </div>
    </footer>
  );
}
