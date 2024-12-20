import { FC } from 'react';
import Link from 'next/link';
import { Flashcard } from '../types';
import styles from '../styles/Flashcard.module.css';

interface FlashcardProps {
    flashcard: Flashcard;
}

const FlashcardComponent: FC<FlashcardProps> = ({ flashcard }) => {
    return (
        <div className={styles.flashcard}>
            <h3>{flashcard.question}</h3>
            <Link href={`/flashcards/${flashcard.id}`} className={styles.link}>
                View Details
            </Link>
            <Link href={``}>Edit</Link>
        </div>
    );
};

export default FlashcardComponent;
