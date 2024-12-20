import { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FlashcardForm from '../../../components/FlashcardForm';
import { getFlashcardById, updateFlashcard } from '../../../services/flashcardService';
import { FlashcardInput, Flashcard } from '../../../types';

const EditFlashcardPage: NextPage = () => {
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
                setError(
                    err instanceof Error
                        ? err.message
                        : 'An error occurred while fetching flashcard.'
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchFlashcard();
        }
    }, [id, router]);

    const handleUpdateFlashcard = async (data: FlashcardInput) => {
        try {
            if (!flashcard) return;
            await updateFlashcard(flashcard.id, data);
            router.push('/flashcards');
        } catch (error) {
            console.error('Failed to update flashcard:', error);
            // Optionally, display an error message to the user
        }
    };

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
        <div>
            <h1>Edit Flashcard</h1>
            <FlashcardForm onSubmit={handleUpdateFlashcard} initialData={flashcard} />
        </div>
    );
};

export default EditFlashcardPage;
