import { FC, useState } from 'react';
import { useTranslation } from 'next-i18next';
import styles from '../styles/FlipCard.module.css';

interface FlipCardProps {
    question: string;
    answer: string;
}

const FlipCard: FC<FlipCardProps> = ({ question, answer }) => {
    const { t } = useTranslation('common');
    const [isFlipped, setIsFlipped] = useState(false);

    const handleCardClick = () => {
        setIsFlipped((prev) => !prev);
    };

    return (
        <div className={styles.scene}>
            <div
                className={`${styles.card} ${isFlipped ? styles.isFlipped : ''}`}
                onClick={handleCardClick}
            >
                <div className={`${styles.cardFace} ${styles.cardFront}`}>
                    <div className={styles.content}>
                        <h2>{t('flashcards.question')}</h2>
                        <p>{question}</p>
                    </div>
                </div>
                <div className={`${styles.cardFace} ${styles.cardBack}`}>
                    <div className={styles.content}>
                        <h2>{t('flashcards.answer')}</h2>
                        <p>{answer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
