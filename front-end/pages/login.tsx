// front-end/pages/login.tsx

import Head from 'next/head';
import LoginForm from '../components/loginForm';
import styles from '../styles/Home.module.css';

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Flashcard app login page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`flex flex-col min-h-screen ${styles.background}`}>
                <main className="flex-grow flex items-center justify-center">
                    <LoginForm />
                </main>
                <footer className={styles.footer}>
                    <p>© 2024 FlashcardApp. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
};

export default Login;
