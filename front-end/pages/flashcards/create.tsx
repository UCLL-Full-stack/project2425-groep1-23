import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import FlashcardForm from '../../components/FlashcardForm';
import CategoryForm from '../../components/CategoryForm';
import { createFlashcard } from '../../services/flashcardService';
import { FlashcardInput } from '../../types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const CreateFlashcardPage: NextPage = () => {
    const router = useRouter();
    const { t } = useTranslation('common');

    const handleCreateFlashcard = async (data: FlashcardInput) => {
        try {
            await createFlashcard(data);
            router.push('/flashcards');
        } catch (error) {
            console.error('Failed to create flashcard:', error);
        }
    };

    const handleCategoryCreated = () => {
        console.log('Category created successfully');
    };

    return (
        <div>
            <h1>{t('flashcards.create.title')}</h1>
            <FlashcardForm onSubmit={handleCreateFlashcard} />
            <h2>{t('categories.create.title')}</h2>
            <CategoryForm onCategoryCreated={handleCategoryCreated} />
        </div>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
});
export default CreateFlashcardPage;
