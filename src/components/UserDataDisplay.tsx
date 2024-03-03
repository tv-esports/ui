// components/UserDataDisplay.tsx
import React from 'react';
import { FaExclamationTriangle, FaCalendar, FaCoins } from 'react-icons/fa';
import { calculateXPForNextLevel, progressBar } from '../xp'; // Import the progressBar function
import { PiHandCoinsDuotone } from 'react-icons/pi';

interface UserDataDisplayProps {
    data: {
        userID: string;
        username: string;
        avatar: string;
        xp_level: number;
        xp_points: number;
        warnings: number;
        inserted_at: string;
        updated_at: string;
    };
    loading: boolean;
    onDateHover: (date: string) => void;
    onDateLeave: () => void;
}

const UserDataDisplay: React.FC<UserDataDisplayProps> = ({ data, loading, onDateHover, onDateLeave }) => {
    const { missingXP } = progressBar(data.xp_points, calculateXPForNextLevel(data.xp_level));
    const progressPercentage = Math.floor((data.xp_points / calculateXPForNextLevel(data.xp_level)) * 100);

    return (
        <div className="bg-gray-100 p-6 rounded-md shadow-lg max-w-md mx-auto mt-6">
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center">
                            <FaCoins className="mr-2" />
                            <strong className="mr-2">XP Level:</strong> {data.xp_level}
                        </div>
                        <div className="flex items-center">
                            <FaExclamationTriangle className="mr-2 text-yellow-500" />
                            <strong className="mr-2">Warnings:</strong> {data.warnings}
                        </div>
                        <div className="flex items-center">
                            <PiHandCoinsDuotone className="mr-2" />
                            <strong className="mr-2">XP Points:</strong> {data.xp_points}
                        </div>
                        <div className="flex items-center">
                            {/* Empty */}
                        </div>
                        <div className="flex items-center" onMouseEnter={() => onDateHover(new Date(data.inserted_at).toLocaleString())} onMouseLeave={onDateLeave}>
                            <FaCalendar className="mr-2" />
                            <strong className="mr-2">Inserted:</strong>{' '}
                            <span title={new Date(data.inserted_at).toLocaleString()}>{new Date(data.inserted_at).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center" onMouseEnter={() => onDateHover(new Date(data.updated_at).toLocaleString())} onMouseLeave={onDateLeave}>
                            <FaCalendar className="mr-2" />
                            <strong className="mr-2">Updated:</strong>{' '}
                            <span title={new Date(data.updated_at).toLocaleString()}>{new Date(data.updated_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="flex-grow">
                            <strong>XP Progress: {progressPercentage}%</strong>
                            <div className="bg-gray-300 h-4 rounded-md overflow-hidden relative">
                                <div className="bg-blue-500 h-full" style={{ width: `${progressPercentage}%`, animation: 'pulseAnimation 2s ease-in-out infinite' }}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {missingXP} XP needed for the next level (lvl. {data.xp_level + 1})
                            </p>
                        </div>
                    </div>
                </div>
            )}
             <style>{`
                @keyframes pulseAnimation {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
};

export default UserDataDisplay;
