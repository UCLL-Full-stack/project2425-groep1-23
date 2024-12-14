import { FC } from 'react';
import FlashcardComponent from './Flashcard';
import { Flashcard } from '../types';
import styles from '../styles/FlashcardList.module.css';

interface FlashcardListProps {
  flashcards: Flashcard[];
}

const FlashcardList: FC<FlashcardListProps> = ({ flashcards }) => {
  return (
    <div className={styles.flashcardList}>
      {flashcards.map((flashcard) => (
        <FlashcardComponent key={flashcard.id} flashcard={flashcard} />
      ))}
    </div>
  );
};

export default FlashcardList;