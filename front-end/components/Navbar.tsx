import { FC } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar: FC = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" legacyBehavior>
        <a className={styles.siteName}>FlashcardApp</a>
      </Link>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/flashcards" className={styles.navLink}>
            Flashcards
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/flashcards/create" className={styles.navLink}>
            Create
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;