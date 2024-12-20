import { NextPage, GetServerSideProps } from 'next';
import { useState } from 'react';
import FlashcardForm from '../../../components/FlashcardForm';
import { getFlashcardById, updateFlashcard } from '../../../services/flashcardService';
import { FlashcardInput, Flashcard } from '../../../types';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface EditFlashcardPageProps {
    flashcard: Flashcard | null;
    error?: string;
}

const EditFlashcardPage: NextPage<EditFlashcardPageProps> = ({ flashcard, error }) => {
    const router = useRouter();
    const [formError, setFormError] = useState<string | null>(null);

    if (error) {
        return <div>{error}</div>;
    }

    if (!flashcard) {
        return <div>Flashcard not found.</div>;
    }

    const handleUpdateFlashcard = async (data: FlashcardInput) => {
        try {
            await updateFlashcard(flashcard.id, data);
            router.push('/flashcards');
        } catch (err) {
            console.error('Failed to update flashcard:', err);
            setFormError('Failed to update flashcard. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Edit Flashcard</h1>
            {formError && <div style={{ color: 'red' }}>{formError}</div>}
            <FlashcardForm onSubmit={handleUpdateFlashcard} initialData={flashcard} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params as { id: string };
    const { locale } = context;

    // Extract token from cookies
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
                error: err.message || 'An error occurred while fetching the flashcard.',
                ...(await serverSideTranslations(locale ?? 'en', ['common'])),
            },
        };
    }
};

export default EditFlashcardPage;
