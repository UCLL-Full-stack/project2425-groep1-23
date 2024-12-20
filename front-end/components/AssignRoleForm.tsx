import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { User, Role } from '../types';
import styles from '../styles/AssignRoleForm.module.css';

interface AssignRoleFormProps {
    users: User[];
    onUserChange: (userId: number) => void;
    onRoleChange: (role: Role) => void;
}

const AssignRoleForm: React.FC<AssignRoleFormProps> = ({ users, onUserChange, onRoleChange }) => {
    const { t } = useTranslation('common');
    const [selectedRole, setSelectedRole] = useState<Role | ''>('');

    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = parseInt(event.target.value, 10);
        onUserChange(userId);
    };

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const role = event.target.value as Role;
        setSelectedRole(role);
        onRoleChange(role);
    };

    return (
        <form className={styles.form}>
            <div className={styles.formGroup}>
                <h1 className={styles.title}>{t('assignRole.title')}</h1>
                <label htmlFor="user">{t('assignRole.label.user')}</label>
                <select id="user" onChange={handleUserChange} className={styles.select}>
                    <option value="">{t('assignRole.select.user')}</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.email}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="role">{t('assignRole.label.role')}</label>
                <select
                    id="role"
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className={styles.select}
                >
                    <option value="">{t('assignRole.select.role')}</option>
                    <option value="USER">{t('assignRole.role.user')}</option>
                    <option value="ADMIN">{t('assignRole.role.admin')}</option>
                    <option value="STUDENT">{t('assignRole.role.student')}</option>
                    <option value="TEACHER">{t('assignRole.role.teacher')}</option>
                </select>
                <button type="submit" className={styles.button}>
                    {t('assignRole.button')}
                </button>
            </div>
        </form>
    );
};

export default AssignRoleForm;
