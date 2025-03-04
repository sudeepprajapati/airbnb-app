import React, { useState } from 'react';
import axios from 'axios';

function UserDetails({ user }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
    });

    const handleEditClick = () => {
        if (isEditing) {
            axios.put('/update-user', editedUser)
                .then(response => {
                    console.log('User updated:', response.data);
                    setIsEditing(false);
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                });
        } else {
            setIsEditing(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const deleteUser = () => {
        axios.delete('/delete-user')
            .then(response => {
                console.log('User deleted:', response.data);
                logout();
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    return (
        <div className="max-w-lg flex  justify-between mx-auto my-10">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Name</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={editedUser.name}
                            onChange={handleChange}
                            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-lg font-medium text-gray-800">{editedUser.name}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Username</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="username"
                            value={editedUser.username}
                            onChange={handleChange}
                            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-lg font-medium text-gray-800">{editedUser.username}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-500">Email</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={editedUser.email}
                            onChange={handleChange}
                            className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-lg text-gray-600">{editedUser.email}</p>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
                <button
                    onClick={handleEditClick}
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-blue-700 transition-all"
                >
                    {isEditing ? "Save" : "Edit"}
                </button>

                <button
                    onClick={deleteUser}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-red-700 transition-all"
                >
                    Delete Account
                </button>
             
            </div>
        </div>
    );
}

export default UserDetails;