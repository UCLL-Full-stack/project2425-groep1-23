import Head from 'next/head';
import RegisterForm from '../components/RegisterForm';
import styles from '../styles/Home.module.css';

const Register: React.FC = () => {
    return (
        <>
            <Head>
                <title>Register</title>
                <meta name="description" content="Flashcard app registration page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`flex flex-col min-h-screen ${styles.background}`}>
                <main className="flex-grow flex items-center justify-center">
                    <RegisterForm />
                </main>
            </div>
        </>
    );
};

export default Register;
