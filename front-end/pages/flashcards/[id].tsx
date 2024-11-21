import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getFlashcardById } from '../../services/flashcardService';
import { Flashcard } from '../../types';
import FlipCard from '../../components/FlipCard';
import styles from '../../styles/FlashCardDetail.module.css'

const FlashcardDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [flashcard, setFlashcard] = useState<Flashcard | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id && !isNaN(Number(id))) {
      getFlashcardById(Number(id))
        .then((data) => setFlashcard(data))
        .catch((error) => {
          console.error('Error fetching flashcard:', error);
          setError('Failed to load flashcard.');
        });
    } else {
      console.warn('Invalid flashcard ID:', id);
      setError('Invalid flashcard ID.');
    }
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!flashcard) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Flashcard Detail</h1>
      <FlipCard question={flashcard.question} answer={flashcard.answer} />
    </div>
  );
};

export default FlashcardDetailPage;