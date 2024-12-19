import { GetServerSideProps, NextPage } from 'next';
import FlashcardList from '../../components/FlashcardList';
import { getFlashcards } from '../../services/flashcardService';
import { Flashcard } from '../../types';

interface FlashcardsPageProps {
    flashcards: Flashcard[];
}

const FlashcardsPage: NextPage<FlashcardsPageProps> = ({ flashcards }) => {
    return (
        <div>
            <h1>Flashcards</h1>
            <FlashcardList flashcards={flashcards} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const flashcards = await getFlashcards();
        return {
            props: {
                flashcards,
            },
        };
    } catch (error) {
        console.error('Failed to fetch flashcards:', error);
        return {
            props: {
                flashcards: [],
            },
        };
    }
};

export default FlashcardsPage;
