import Head from 'next/head';
import RegisterForm from '../components/RegisterForm';
import styles from '../styles/Home.module.css';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Register: React.FC = () => {
    const { t } = useTranslation('common');

    return (
        <>
            <Head>
                <title>{t('register.title')}</title>
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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
});

export default Register;
