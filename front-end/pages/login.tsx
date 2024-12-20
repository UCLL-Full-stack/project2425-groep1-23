import Head from 'next/head';
import LoginForm from '../components/loginForm';
import styles from '../styles/Home.module.css';

const Login: React.FC = () => {
    const users = [
        {
            email: 'admin@example.com',
            password: 'securepassword123',
            role: 'Admin',
        },
        {
            email: 'student1@example.com',
            password: 'studentpassword',
            role: 'Student',
        },
        {
            email: 'teacher1@example.com',
            password: 'teacherpassword',
            role: 'Teacher',
        },
    ];

    return (
        <>
            <Head>
                <title>Login</title>
                <meta name="description" content="Flashcard app login page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={`flex flex-col min-h-screen ${styles.background}`}>
                <main className="flex-grow flex items-center justify-center">
                    <div>
                        <LoginForm />
                        <div className="mt-8" id="login_information_div">
                            <h2 className="text-center text-lg font-bold mb-4">Login Information</h2>
                            <table className="table-auto border-collapse border border-gray-300 mx-auto">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Username</th>
                                        <th className="border border-gray-300 px-4 py-2">Password</th>
                                        <th className="border border-gray-300 px-4 py-2">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                            <td className="border border-gray-300 px-4 py-2">{user.password}</td>
                                            <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Login;