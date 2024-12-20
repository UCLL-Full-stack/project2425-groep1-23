import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Flashcard } from '../types';
import { deleteFlashcard } from '../services/flashcardService';
import styles from '../styles/Flashcard.module.css';

interface FlashcardProps {
    flashcard: Flashcard;
}

const FlashcardComponent: FC<FlashcardProps> = ({ flashcard }) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            await deleteFlashcard(flashcard.id);
            router.reload(); // Reload the page to reflect the changes
        } catch (error) {
            console.error('Failed to delete flashcard:', error);
            // Optionally, display an error message to the user
        }
    };

    return (
        <div className={styles.flashcard}>
            <h3>{flashcard.question}</h3>
            <div className={styles.links}>
                <Link href={`/flashcards/${flashcard.id}`} className={styles.link}>
                    View Details
                </Link>
                <Link href={`/flashcards/${flashcard.id}/edit`} className={styles.link}>
                    Edit
                </Link>
                <button onClick={handleDelete} className={`${styles.link} ${styles.deleteButton}`}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default FlashcardComponent;
