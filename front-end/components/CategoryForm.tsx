import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'next-i18next';
import { createCategory } from '../services/categoryService';
import { CategoryInput } from '../types';
import styles from '../styles/FlashcardForm.module.css';

interface CategoryFormProps {
    onCategoryCreated: () => void;
}

const CategoryForm: FC<CategoryFormProps> = ({ onCategoryCreated }) => {
    const { t } = useTranslation('common');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const newCategory: CategoryInput = { name, description };

        try {
            await createCategory(newCategory);
            setName('');
            setDescription('');
            setSuccessMessage(t('categories.create.success'));
            onCategoryCreated();
        } catch (error) {
            setError(t('categories.create.error'));
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formGroup}>
                <label className={styles.label}>{t('categories.name.label')}</label>
                <input
                    type="text"
                    className={styles.input}
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>{t('categories.description.label')}</label>
                <input
                    type="text"
                    className={styles.input}
                    value={description}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            {successMessage && <div className={styles.success}>{successMessage}</div>}
            <button type="submit" className={styles.button}>
                {t('categories.create.button')}
            </button>
        </form>
    );
};

export default CategoryForm;
