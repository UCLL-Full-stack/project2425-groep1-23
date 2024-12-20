import { NextPage, GetServerSideProps } from 'next';
import { useState } from 'react';
import { getUsers, updateUserRole } from '../../services/userService';
import { User, Role } from '../../types';
import AssignRoleForm from '../../components/AssignRoleForm';
import styles from '../../styles/AssignRoleForm.module.css';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface AssignRolesPageProps {
    users: User[];
}

const AssignRolesPage: NextPage<AssignRolesPageProps> = ({ users }) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleUserChange = (userId: number) => {
        const user = users.find((user) => user.id === userId);
        setSelectedUser(user || null);
    };

    const handleRoleChange = async (role: Role) => {
        if (selectedUser) {
            try {
                await updateUserRole(selectedUser.id, role);
                alert('Role updated successfully');
            } catch (error) {
                console.error('Failed to update role:', error);
                alert('Failed to update role');
            }
        }
    };

    return (
        <div className={styles.container}>
            <AssignRoleForm
                users={users}
                onUserChange={handleUserChange}
                onRoleChange={handleRoleChange}
            />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const users = await getUsers();
        return {
            props: {
                users,
            },
        };
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return {
            props: {
                users: [],
            },
        };
    }
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
});

export default AssignRolesPage;
