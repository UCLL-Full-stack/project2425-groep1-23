// front-end/pages/flashcards/create.tsx

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import FlashcardForm from '../../components/FlashcardForm';
import { createFlashcard } from '../../services/flashcardService';
import { FlashcardInput } from '../../types';

const CreateFlashcardPage: NextPage = () => {
  const router = useRouter();

  const handleCreateFlashcard = async (data: FlashcardInput) => {
    try {
      await createFlashcard(data);
      router.push('/flashcards');
    } catch (error) {
      console.error('Failed to create flashcard:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <div>
      <h1>Create New Flashcard</h1>
      <FlashcardForm onSubmit={handleCreateFlashcard} />
    </div>
  );
};

export default CreateFlashcardPage;