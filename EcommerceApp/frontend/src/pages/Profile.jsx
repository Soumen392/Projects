import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const Profile = () => {
    const { fetchUserProfile, updateUserProfile, token } = useContext(ShopContext);
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (!token) return;
        const getUser = async () => {
            const data = await fetchUserProfile();
            if (data) setUser({ ...data, password: '' }); // password empty initially
        };
        getUser();
    }, [token]);

    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const handleUpdate = async () => {
        const updated = await updateUserProfile(user);
        if (updated) setUser({ ...updated, password: '' }); // reset password field
        setEditMode(false);
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-gray-50 shadow rounded mt-10 sm:mt-16 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">My Profile</h2>

            {/* Name */}
            <div className="mb-5">
                <label className="block text-gray-600 mb-1">Name</label>
                {editMode ? (
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                ) : (
                    <p className="text-gray-700">{user.name || '—'}</p>
                )}
            </div>

            {/* Email */}
            <div className="mb-5">
                <label className="block text-gray-600 mb-1">Email</label>
                <p className="text-gray-700">{user.email || '—'}</p>
            </div>

            {/* Password */}
            {editMode && (
                <div className="mb-5">
                    <label className="block text-gray-600 mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        placeholder="Enter new password (min 8 chars)"
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row sm:gap-4 gap-3">
                {editMode ? (
                    <>
                        <button
                            onClick={handleUpdate}
                            className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded transition"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditMode(false)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setEditMode(true)}
                        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded transition"
                    >
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default Profile;
