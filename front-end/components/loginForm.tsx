import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Cookies from 'js-cookie';
import styles from '../styles/LoginForm.module.css';

const LoginForm: React.FC = () => {
    const { t } = useTranslation('common');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [generalError, setGeneralError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    const validate = () => {
        const validationErrors: { email?: string; password?: string } = {};

        if (!email) {
            validationErrors.email = t('login.validate.email');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = t('login.validate.emailInvalid');
        }

        if (!password) {
            validationErrors.password = t('login.validate.password');
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const formHandling = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || t('login.error'));
            }

            const data = await response.json();
            if (data.token) {
                sessionStorage.setItem(
                    'loggedInUser',
                    JSON.stringify({
                        token: data.token,
                        email: data.email,
                        role: data.role,
                    })
                );

                setSuccessMessage(t('login.success'));
                setTimeout(() => {
                    Cookies.set('token', data.token, { expires: 1 });
                    router.push('/flashcards'); // Redirect to flashcards page
                }, 2000);
            }
        } catch (error) {
            if (error instanceof Error) {
                setGeneralError(error.message || t('login.error'));
            } else {
                setGeneralError(t('login.error'));
            }
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={formHandling} className={styles.form}>
                <h1 className={styles.title}>{t('login.title')}</h1>
                <label htmlFor="email" className={styles.label}>
                    {t('login.label.email')}
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${styles.input} ${
                        errors.email ? styles.errorBorder : styles.focusBorder
                    }`}
                />
                {errors.email && <p className={styles.errorText}>{errors.email}</p>}

                <label htmlFor="password" className={styles.label}>
                    {t('login.label.password')}
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${styles.input} ${
                        errors.password ? styles.errorBorder : styles.focusBorder
                    }`}
                />
                {errors.password && <p className={styles.errorText}>{errors.password}</p>}

                <button type="submit" className={styles.button}>
                    {t('login.button')}
                </button>
                <a className={styles.link} href="/register">
                    {t('login.registerLink')}
                </a>
                {generalError && <p className={styles.generalError}>{generalError}</p>}
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
            </form>
        </div>
    );
};

export default LoginForm;
