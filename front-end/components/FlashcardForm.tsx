import { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FlashcardInput, Category } from '../types';
import { getCategories } from '../services/categoryService';
import styles from './FlashcardForm.module.css';

interface FlashcardFormProps {
  onSubmit: (data: FlashcardInput) => void;
}

const FlashcardForm: FC<FlashcardFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [categoryId, setCategoryId] = useState<number | undefined>();
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
      setError('Please select a category.');
      return;
    }
    setError(null);
    onSubmit({ question, answer, categoryId });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Question:</label>
        <input
          type="text"
          className={styles.input}
          value={question}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Answer:</label>
        <input
          type="text"
          className={styles.input}
          value={answer}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Category:</label>
        <select
          className={styles.select}
          value={categoryId ?? ''}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            const value = e.target.value;
            setCategoryId(value ? Number(value) : undefined);
          }}
          required
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <button type="submit" className={styles.button}>
        Create Flashcard
      </button>
    </form>
  );
};

export default FlashcardForm;