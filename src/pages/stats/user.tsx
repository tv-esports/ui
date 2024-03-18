import React, { useState } from 'react';
import { FaSpinner, FaUser } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';

import UserDataDisplay from '../../components/UserDataDisplay';

const StatsUserPage: React.FC = () => {
    const [discordId, setDiscordId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showMenu, setShowMenu] = useState<boolean>(true);
    const [showFullDate, setShowFullDate] = useState<boolean>(false);
    const [hoveredDate, setHoveredDate] = useState<string>('');

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate Discord ID
        if (!discordId.trim() || discordId.length < 15) {
            setError('Enter a valid Discord ID (min length 15 numbers)');
            return;
        }

        // Clear previous error, user data, and set loading state
        setError(null);
        setUserData(null);
        setLoading(true);

        try {
            // Make both API requests simultaneously
            const [userResponse, discordResponse] = await Promise.all([
                fetch(`/api/user/${discordId}`),
                fetch(`/api/discord/${discordId}`),
            ]);

            // Process user data response
            if (userResponse.ok) {
                const userData = await userResponse.json();
                setUserData(userData);

                // Cache the data
                localStorage.setItem(discordId, JSON.stringify(userData));
            } else if (userResponse.status === 404) {
                setError('User not found');
            } else {
                setError('User not found.');
            }

            // Process Discord data response
            if (discordResponse.ok) {
                const discordData = await discordResponse.json();
                setUserData((prevUserData: string[]) => ({ ...prevUserData, username: discordData.username }));
            } else {
                setError('User not found.');
            }

            setShowMenu(false);
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred.');
        } finally {
            // Set loading state to false
            setLoading(false);
        }
    };

    const handleShowMenu = () => {
        setUserData(null);
        setShowMenu(true);
        setError('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/, ''); // Only allow numbers
        setDiscordId(value);
    };

    const handleDateHover = (date: string) => {
        setShowFullDate(true);
        setHoveredDate(date);
    };

    const handleDateLeave = () => {
        setShowFullDate(false);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-white text-gray-800">
            <div className="max-w-md w-full p-6 bg-gray-100 rounded-md shadow-lg relative">
                <h1 className="text-3xl font-bold mb-6">{userData ? userData.username : 'Statistics'}</h1>
                {showMenu && (
                    <form onSubmit={handleFormSubmit} className="mb-6">
                        <label className="block mb-4">
                            <span className="text-gray-800">Enter Discord ID:</span>
                            <input
                                type="text"
                                value={discordId}
                                onChange={handleInputChange}
                                className="border p-2 w-full mt-1 bg-white text-gray-800"
                            />
                        </label>
                        <button
                            type="submit"
                            className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${loading || (!discordId.trim() || discordId.length < 15) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            disabled={loading || !discordId.trim() || discordId.length < 15}
                        >
                            {loading ? (
                                <FaSpinner className="animate-spin mr-2" />
                            ) : (
                                <span>{userData ? 'Refreshing Stats' : 'Get Stats'}</span>
                            )}
                        </button>
                    </form>
                )}
                {error && (
                    <div>
                        <p className="text-red-500 mb-4">{error}</p>
                        <button onClick={handleShowMenu} className="text-blue-600 hover:text-blue-500">Retry</button>
                    </div>
                )}
                {userData && (
                    <UserDataDisplay
                        data={userData}
                        loading={loading}
                        onDateHover={handleDateHover}
                        onDateLeave={handleDateLeave}
                    />
                )}
                {loading && (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
                    </div>
                )}
                {userData && (
                    <div className="absolute top-0 right-0 mt-8 mr-5">
                        <button
                            onClick={handleShowMenu}
                            className="text-blue-600"
                        >
                            <FaUser className="mr-2" />
                        </button>
                        <button
                            onClick={() => alert('TODO: Implement settings')}
                            className="text-blue-600"
                        >
                            <IoSettingsSharp className="mr-2" />
                        </button>
                    </div>
                )}
                {showFullDate && (
                    <div className="absolute top-0 right-0 mt-8 mr-5">
                        <div className="bg-white p-2 rounded-md shadow-md">
                            <p>{hoveredDate}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsUserPage;