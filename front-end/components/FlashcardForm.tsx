import { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'next-i18next';
import { FlashcardInput, Category } from '../types';
import { getCategories } from '../services/categoryService';
import styles from '../styles/FlashcardForm.module.css';

interface FlashcardFormProps {
    onSubmit: (data: FlashcardInput) => void;
    initialData?: FlashcardInput;
}

const FlashcardForm: FC<FlashcardFormProps> = ({ onSubmit, initialData }) => {
    const { t } = useTranslation('common');
    const [question, setQuestion] = useState(initialData?.question || '');
    const [answer, setAnswer] = useState(initialData?.answer || '');
    const [categoryId, setCategoryId] = useState<number | undefined>(initialData?.categoryId);
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data))
            .catch((error) => {
                console.error('Failed to fetch categories:', error);
            });
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!categoryId) {
            setError(t('categories.create.error'));
            return;
        }
        onSubmit({ question, answer, categoryId });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formGroup}>
                <label className={styles.label}>{t('flashcards.create.question')}</label>
                <input
                    type="text"
                    className={styles.input}
                    value={question}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>{t('flashcards.create.answer')}</label>
                <input
                    type="text"
                    className={styles.input}
                    value={answer}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>{t('categories.name.label')}</label>
                <select
                    className={styles.select}
                    value={categoryId ?? ''}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        const value = e.target.value;
                        setCategoryId(value ? Number(value) : undefined);
                    }}
                    required
                >
                    <option value="">{t('categories.create.select')}</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button type="submit" className={styles.button}>
                {initialData ? t('flashcards.edit.button') : t('flashcards.create.button')}
            </button>
        </form>
    );
};

export default FlashcardForm;
