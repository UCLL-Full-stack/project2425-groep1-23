import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import styles from '../styles/LoginForm.module.css';

const RegisterForm: React.FC = () => {
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
            validationErrors.email = 'Email address is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            validationErrors.email = 'Please enter a valid email address';
        }

        if (!password) {
            validationErrors.password = 'Password is required';
        } else if (password.length < 8) {
            validationErrors.password = 'Password must be at least 8 characters long';
        }

        if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(validationErrors);

        return JSON.stringify(validationErrors) === '{}';
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
                throw new Error('Registration failed. Please try again');
            }

            const data = await response.json();
            if (data.token) {
                setSuccessMessage('Registration successful! Redirecting...');
                setTimeout(() => {
                    Cookies.set('token', data.token, { expires: 1 });
                    router.push('/profile');
                }, 2000);
            }
        } catch (error) {
            setGeneralError(error.message || 'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={formHandling} className={styles.form}>
                <h1 className={styles.title}>Register</h1>
                <label htmlFor="email" className={styles.label}>
                    Email
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
                    Password
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
                    Confirm Password
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
                    Register
                </button>
                <a className={styles.link} href="/login">
                    Already have an account? Login
                </a>

                {generalError && <div className={styles.generalError}>{generalError}</div>}
                {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
            </form>
        </div>
    );
};

export default RegisterForm;
