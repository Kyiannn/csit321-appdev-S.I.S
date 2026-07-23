import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { User as UserIcon, Mail } from 'lucide-react';
import { ProfileLayout, Avatar } from '../../../components/ui';
import { useProfile } from './hooks/useProfile';
import { authService } from '../../../services/authService';

const ProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const { user, isLoading, error } = useProfile();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [logoutError, setLogoutError] = useState<string | null>(null);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        setLogoutError(null);

        try {
            await authService.logout();
            setShowLogoutConfirm(false);
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            setLogoutError(error instanceof Error ? error.message : 'Failed to logout');
        } finally {
            setIsLoggingOut(false);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <ProfileLayout showBackButton={false}>
                <div className="text-center py-8">
                    <div className="animate-pulse">
                        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-5"></div>
                        <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
                    </div>
                </div>
            </ProfileLayout>
        );
    }

    // Error state
    if (error) {
        return (
            <ProfileLayout showBackButton={false}>
                <div className="text-center py-8">
                    <div className="text-red-500 text-lg font-semibold mb-3">Error Loading Profile</div>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </ProfileLayout>
        );
    }

    // No user
    if (!user) {
        return (
            <ProfileLayout showBackButton={false}>
                <div className="text-center py-8">
                    <p className="text-gray-500">No user data available</p>
                </div>
            </ProfileLayout>
        );
    }

    // Get initials from username
    const getInitials = (username: string): string => {
        return username?.charAt(0).toUpperCase() || 'U';
    };

    return (
        <>
            <ProfileLayout showBackButton={false}>
                <Avatar initials={getInitials(user.username)} />

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
                    {user.username}
                </h1>
                <span className="text-gray-500 text-center block mb-5">{user.email}</span>

                {/* User Info Cards */}
                <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                        <UserIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                            <span className="font-semibold">Username:</span> {user.username}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">
                            <span className="font-semibold">Email:</span> {user.email}
                        </span>
                    </div>
                </div>

                <div className="h-px bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 my-5" />

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => setShowLogoutConfirm(true)}
                        disabled={isLoggingOut}
                        className="px-8 py-3 bg-red-500 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/30 active:translate-y-0 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </button>
                </div>

                {logoutError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                        {logoutError}
                    </div>
                )}
            </ProfileLayout>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Confirm Logout</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                                disabled={isLoggingOut}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="flex-1 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoggingOut ? 'Logging out...' : 'Logout'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfilePage;