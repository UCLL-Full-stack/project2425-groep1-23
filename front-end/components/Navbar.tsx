// components/Navbar.tsx

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Cookies from 'js-cookie';
import styles from '../styles/Navbar.module.css';

// Define the shape of the user object
interface LoggedInUser {
    token: string;
    email: string;
    role: 'USER' | 'ADMIN' | 'STUDENT' | 'TEACHER';
}

const Navbar: FC = () => {
    const router = useRouter();
    const { t } = useTranslation('common');

    const [user, setUser] = useState<LoggedInUser | null>(null);

    // Function to load user from sessionStorage
    const loadUser = () => {
        if (typeof window !== 'undefined') {
            // Ensure window is available
            const storedUser = sessionStorage.getItem('loggedInUser');
            if (storedUser) {
                try {
                    const parsedUser: LoggedInUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                } catch (error) {
                    console.error('Failed to parse user from sessionStorage:', error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        }
    };

    // Load user on component mount
    useEffect(() => {
        loadUser();

        // Optional: Listen for storage events to handle user changes in other tabs
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'loggedInUser') {
                loadUser();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Logout handler
    const handleLogout = () => {
        // Clear sessionStorage and cookies
        sessionStorage.removeItem('loggedInUser');
        Cookies.remove('token');
        setUser(null);
        router.push('/login');
    };

    // Define navigation links based on role
    const renderNavLinks = () => {
        if (!user) {
            // User is not logged in
            return (
                <>
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
                        <Link href="/login" className={styles.navLink}>
                            {t('header.nav.login')}
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href="/register" className={styles.navLink}>
                            {t('header.nav.register')}
                        </Link>
                    </li>
                </>
            );
        }

        // User is logged in
        switch (user.role) {
            case 'ADMIN':
                return (
                    <>
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
                            <Link href="/admin" className={styles.navLink}>
                                {t('header.nav.adminDashboard')}
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <button onClick={handleLogout} className={styles.navLinkButton}>
                                {t('header.nav.logout')}
                            </button>
                        </li>
                    </>
                );
            case 'TEACHER':
                return (
                    <>
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
                            <button onClick={handleLogout} className={styles.navLinkButton}>
                                {t('header.nav.logout')}
                            </button>
                        </li>
                    </>
                );
            case 'STUDENT':
                return (
                    <>
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
                            <Link href="/progress" className={styles.navLink}>
                                {t('header.nav.myProgress')}
                            </Link>
                        </li>
                        <li className={styles.navItem}>
                            <button onClick={handleLogout} className={styles.navLinkButton}>
                                {t('header.nav.logout')}
                            </button>
                        </li>
                    </>
                );
            case 'USER':
            default:
                return (
                    <>
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
                            <button onClick={handleLogout} className={styles.navLinkButton}>
                                {t('header.nav.logout')}
                            </button>
                        </li>
                    </>
                );
        }
    };

    return (
        <nav className={styles.navbar}>
            <Link href="/" legacyBehavior>
                <a className={styles.siteName}>FlashcardApp</a>
            </Link>
            <ul className={styles.navList}>
                {renderNavLinks()}
                {/* Language Switcher */}
                <li className={styles.navItem}>
                    <select
                        onChange={(e) => {
                            const locale = e.target.value;
                            router.push(router.pathname, router.asPath, { locale });
                        }}
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
