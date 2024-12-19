import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>FlashcardApp</title>
                <meta name="description" content="A flashcard app for learning" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={`relative text-center mx-auto md:w-3/5 lg:w-4/5 ${styles.main}`}>
                <div className={`flex flex-row justify-between m-3 p-3 ${styles.content}`}>
                    <div className={`flex flex-col ml-4 p-8 ${styles.textSection}`}>
                        <div className={`mr-4 ${styles.box}`}>
                            <h1 className="m-8 text-6xl text-left ml-0 mb-4">
                                Welcome to the Flashcard App
                            </h1>
                            <p className="mb-4">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
                                molestias, in, repellat natus doloremque eius nisi explicabo hic
                                commodi laboriosam accusantium reprehenderit ex nam suscipit omnis
                                obcaecati praesentium sit pariatur! Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Distinctio molestias, in, repellat
                                natus doloremque eius nisi explicabo hic commodi laboriosam
                                accusantium reprehenderit ex nam suscipit omnis obcaecati
                                praesentium sit pariatur! Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Distinctio molestias, in, repellat natus
                                doloremque eius nisi explicabo hic commodi laboriosam accusantium
                                reprehenderit ex nam suscipit omnis obcaecati praesentium sit
                                pariatur!
                            </p>
                            <Link href="/flashcards" legacyBehavior>
                                <a className={styles.button}>View Flashcards</a>
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
                <p>© 2024 FlashcardApp. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Home;
