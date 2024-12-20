import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import styles from '../styles/Navbar.module.css';

const Navbar: FC = () => {
    const router = useRouter();
    const { t } = useTranslation('common');

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const locale = e.target.value;
        router.push(router.pathname, router.asPath, { locale });
    };

    return (
        <nav className={styles.navbar}>
            <Link href="/" legacyBehavior>
                <a className={styles.siteName}>FlashcardApp</a>
            </Link>
            <ul className={styles.navList}>
                <li className={styles.navItem}>
                    <Link href="/" className={styles.navLink}>
                        {t('header.nav.home')}
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/flashcards" className={styles.navLink}>
                        {t('header.nav.flashcards')}
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/flashcards/create" className={styles.navLink}>
                        {t('header.nav.create')}
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/login" className={styles.navLink}>
                        {t('header.nav.login')}
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <select
                        onChange={handleLanguageChange}
                        value={router.locale}
                        className={styles.languageSwitcher}
                    >
                        <option value="en">English</option>
                        <option value="nl">Nederlands</option>
                    </select>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
