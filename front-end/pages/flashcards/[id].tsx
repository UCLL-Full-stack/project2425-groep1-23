import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getFlashcardById } from '../../services/flashcardService';
import { Flashcard } from '../../types';
import FlipCard from '../../components/FlipCard';

import styles from '../../styles/FlashCardDetail.module.css';

const FlashcardDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [flashcard, setFlashcard] = useState<Flashcard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          router.push('/login');
          return;
        }

        const parsedId = Number(id);
        if (!id || isNaN(parsedId)) {
          setError('Invalid flashcard ID.');
          return;
        }

        const { token } = JSON.parse(loggedInUser);

        const flashcard = await getFlashcardById(parsedId, token);
        setFlashcard(flashcard);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching flashcard.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFlashcard();
    }
  }, [id, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!flashcard) {
    return <div>Flashcard not found.</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Flashcard Detail</h1>
      <FlipCard question={flashcard.question} answer={flashcard.answer} />
    </div>
  );
};

export default FlashcardDetailPage;
