import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Flashcard } from '../types';
import { deleteFlashcard } from '../services/flashcardService';
import styles from '../styles/Flashcard.module.css';

interface FlashcardProps {
    flashcard: Flashcard;
}

const FlashcardComponent: FC<FlashcardProps> = ({ flashcard }) => {
    const router = useRouter();
    const { t } = useTranslation('common');

    const handleDelete = async () => {
        try {
            await deleteFlashcard(flashcard.id);
            router.reload(); // Reload the page to reflect the changes
        } catch (error) {
            console.error(t('flashcards.delete.error'), error);
            // Optionally, display an error message to the user
        }
    };

    return (
        <div className={styles.flashcard}>
            <h3>{flashcard.question}</h3>
            <div className={styles.links}>
                <Link href={`/flashcards/${flashcard.id}`} className={styles.link}>
                    {t('flashcards.view.details')}
                </Link>
                <Link href={`/flashcards/${flashcard.id}/edit`} className={styles.link}>
                    {t('flashcards.edit.button')}
                </Link>
                <button onClick={handleDelete} className={`${styles.link} ${styles.deleteButton}`}>
                    {t('flashcards.delete.button')}
                </button>
            </div>
        </div>
    );
};

export default FlashcardComponent;
