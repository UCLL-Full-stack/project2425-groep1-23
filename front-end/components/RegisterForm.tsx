import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Cookies from 'js-cookie';
import styles from '../styles/LoginForm.module.css';

const RegisterForm: React.FC = () => {
    const { t } = useTranslation('common');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        confirmPassword?: string;
    }>({});
    const [generalError, setGeneralError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    const validate = () => {
        const validationErrors: { email?: string; password?: string; confirmPassword?: string } =
            {};

        if (!email) {
            validationErrors.email = t('register.validate.email');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = t('register.validate.emailInvalid');
        }

        if (!password) {
            validationErrors.password = t('register.validate.password');
        } else if (password.length < 8) {
            validationErrors.password = t('register.validate.passwordLength');
        }

        if (password !== confirmPassword) {
            validationErrors.confirmPassword = t('register.validate.confirmPasswordMatch');
        }

        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const formHandling = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setGeneralError('');

        if (!validate()) {
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                throw new Error(t('register.error'));
            }

            const data = await response.json();
            if (data.token) {
                setSuccessMessage(t('register.success'));
                setTimeout(() => {
                    Cookies.set('token', data.token, { expires: 1 });
                    router.push('/flashcards');
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            if (error instanceof Error) {
                setGeneralError(error.message || t('register.error'));
            } else {
                setGeneralError(t('register.error'));
            }
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={formHandling} className={styles.form}>
                <h1 className={styles.title}>{t('register.title')}</h1>
                <label htmlFor="email" className={styles.label}>
                    {t('register.label.email')}
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
                    {t('register.label.password')}
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

                <label htmlFor="confirmPassword" className={styles.label}>
                    {t('register.label.confirmPassword')}
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`${styles.input} ${
                        errors.confirmPassword ? styles.errorBorder : styles.focusBorder
                    }`}
                />
                {errors.confirmPassword && (
                    <p className={styles.errorText}>{errors.confirmPassword}</p>
                )}

                <button type="submit" className={styles.button}>
                    {t('register.button')}
                </button>
                <a className={styles.link} href="/login">
                    {t('register.loginLink')}
                </a>

                {generalError && <div className={styles.generalError}>{generalError}</div>}
                {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
            </form>
        </div>
    );
};

export default RegisterForm;
