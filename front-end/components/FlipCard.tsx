import { FC, useState } from 'react';
import styles from '../styles/FlipCard.module.css';

interface FlipCardProps {
    question: string;
    answer: string;
}

const FlipCard: FC<FlipCardProps> = ({ question, answer }) => {
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
                        <h2>Question</h2>
                        <p>{question}</p>
                    </div>
                </div>
                <div className={`${styles.cardFace} ${styles.cardBack}`}>
                    <div className={styles.content}>
                        <h2>Answer</h2>
                        <p>{answer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
