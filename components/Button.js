import styles from '../styles/Button.module.css';

export default function Button({ children, variant = 'primary', onClick, href, type = 'button', ...props }) {
  const className = `${styles.button} ${styles[variant]}`;
  
  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }
  
  return (
    <button type={type} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
