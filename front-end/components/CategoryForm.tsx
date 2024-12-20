import { FC, useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { createCategory } from '../services/categoryService';
import { CategoryInput } from '../types';
import styles from '../styles/FlashcardForm.module.css';

interface CategoryFormProps {
    onCategoryCreated: () => void;
}

const CategoryForm: FC<CategoryFormProps> = ({ onCategoryCreated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const newCategory: CategoryInput = { name, description };

        try {
            await createCategory(newCategory);
            setName('');
            setDescription('');
            setSuccessMessage('Category created successfully!');
            onCategoryCreated();
            setTimeout(() => {
                router.reload();
            }, 2000); // Refresh the page after 2 seconds
        } catch (error) {
            setError('Failed to create category. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Category Name:</label>
                <input
                    type="text"
                    className={styles.input}
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Description:</label>
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
                Create Category
            </button>
        </form>
    );
};

export default CategoryForm;
