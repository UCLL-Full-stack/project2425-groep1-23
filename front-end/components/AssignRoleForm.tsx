import React, { useState } from 'react';
import { User, Role } from '../types';
import styles from '../styles/AssignRoleForm.module.css';

interface AssignRoleFormProps {
    users: User[];
    onUserChange: (userId: number) => void;
    onRoleChange: (role: Role) => void;
}

const AssignRoleForm: React.FC<AssignRoleFormProps> = ({ users, onUserChange, onRoleChange }) => {
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
                <h1 className={styles.title}>Assign Role</h1>
                <label htmlFor="user">User:</label>
                <select id="user" onChange={handleUserChange} className={styles.select}>
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.email}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="role">Role:</label>
                <select
                    id="role"
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className={styles.select}
                >
                    <option value="">Select a role</option>
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Teacher</option>
                </select>
                <button type="submit" className={styles.button}>
                    Assign Role
                </button>
            </div>
        </form>
    );
};

export default AssignRoleForm;
