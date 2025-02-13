/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Profile = ({isLogin,setIsLogin }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    useEffect(() => {
        // Fetch user data from backend
        const fetchUser = async () => {
            try {
                const response = await fetch("https://localhost/4000/profile"); // Replace with your API
                if (!response.ok) throw new Error("Failed to fetch user data");
                const data = await response.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handlePasswordChange = async () => {
        if (newPassword.length < 6) {
            setPasswordMessage("Password must be at least 6 characters long.");
            return;
        }

        try {
            const response = await fetch("https://localhost/4000/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: newPassword }),
            });

            if (!response.ok) throw new Error("Failed to update password");

            setPasswordMessage("Password updated successfully!");
            setNewPassword("");
        } catch (err) {
            setPasswordMessage(err.message);
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-20-6">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-96 text-center">
                <img
                    src=""
                    alt="Profile"
                    className="w-24 h-24 mx-auto rounded-full border-4 border-[#fc823f]"
                />
                <h2 className="mt-4 text-xl font-semibold text-[#222020]">
                    {user?.name}
                </h2>
                <p className="text-gray-500">@{user?.username}</p>
                <p className="text-gray-500">{user?.email}</p>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-[#222020]">
                        Change Password
                    </h3>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fc823f]"
                        placeholder="New Password"
                    />
                    <button
                        onClick={handlePasswordChange}
                        className="mt-3 px-4 py-2 bg-[#fc823f] text-white rounded-lg shadow-md hover:bg-orange-500 transition"
                    >
                        Update Password
                    </button>
                    {passwordMessage && (
                        <p className="mt-2 text-sm text-red-500">{passwordMessage}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
