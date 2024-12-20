import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    const { t } = useTranslation('common');

    return (
        <>
            <Head>
                <title>{t('app.title')}</title>
                <meta name="description" content="A flashcard app for learning" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={`relative text-center mx-auto md:w-3/5 lg:w-4/5 ${styles.main}`}>
                <div className={`flex flex-row justify-between m-3 p-3 ${styles.content}`}>
                    <div className={`flex flex-col ml-4 p-8 ${styles.textSection}`}>
                        <div className={`mr-4 ${styles.box}`}>
                            <h1 className="m-8 text-6xl text-left ml-0 mb-4">{t('app.title')}</h1>
                            <p className="mb-4">{t('app.description')}</p>
                            <Link href="/flashcards" legacyBehavior>
                                <a className={styles.button}>{t('header.nav.flashcards')}</a>
                            </Link>
                        </div>
                    </div>
                    <Image
                        src="/images/cards1.jpg"
                        alt="Flashcards"
                        width={375}
                        height={300}
                        className={styles.image}
                    />
                </div>
            </main>
            <footer className={styles.footer}>
                <p>{t('footer.copyright')}</p>
            </footer>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
});

export default Home;
