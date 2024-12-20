import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FlashcardList from '../../components/FlashcardList';
import { getFlashcards } from '../../services/flashcardService';
import { Flashcard } from '../../types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const FlashcardsPage: React.FC = () => {
    const { t } = useTranslation('common');
    const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const loggedInUser = sessionStorage.getItem('loggedInUser');
                if (!loggedInUser) {
                    router.push('/login');
                    return;
                }

                const { token } = JSON.parse(loggedInUser);

                const flashcards = await getFlashcards(token);
                setFlashcards(flashcards);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'An error occurred while fetching flashcards.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchFlashcards();
    }, [router]);

    if (loading) {
        return <div>Loading flashcards...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {/* <h1>Flashcards</h1> */}
            <FlashcardList flashcards={flashcards} />
        </div>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
});
export default FlashcardsPage;
