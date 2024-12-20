import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getFlashcardById } from '../../services/flashcardService';
import { Flashcard } from '../../types';
import FlipCard from '../../components/FlipCard';
import styles from '../../styles/FlashCardDetail.module.css';

interface FlashcardDetailProps {
  flashcard: Flashcard | null;
  error?: string;
}

const FlashcardDetailPage: NextPage<FlashcardDetailProps> = ({ flashcard, error }) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const { locale } = context;
  
  const token = (() => {
    const cookieHeader = context.req.headers.cookie || '';
    const match = cookieHeader.match(/token=([^;]+)/);
    return match ? match[1] : null;
  })();

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const parsedId = Number(id);
  if (isNaN(parsedId)) {
    return {
      props: {
        flashcard: null,
        error: 'Invalid flashcard ID.',
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      },
    };
  }

  try {
    const flashcard = await getFlashcardById(parsedId, token);
    return {
      props: {
        flashcard,
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      },
    };
  } catch (err: any) {
    return {
      props: {
        flashcard: null,
        error: err.message || 'An error occurred while fetching flashcard.',
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      },
    };
  }
};

export default FlashcardDetailPage;
