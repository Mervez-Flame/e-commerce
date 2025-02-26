import { useEffect, useState } from "react";
import axios from "axios";


const Profile = () => {
    const [user, setUser] = useState(null);
    const [image, setImage] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        axios
            .get(`htt/profile`, {
                headers: { Authorization: localStorage.getItem("token") },
            })
            .then((res) => setUser(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("profilePic", file);

        try {
            const res = await axios.put(`${API_URL}/profile/picture`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: localStorage.getItem("token"),
                },
            });
            setUser({ ...user, profilePic: res.data.profilePic });
        } catch (error) {
            console.log(error);
        }
    };

    const handlePasswordChange = async () => {
        try {
            await axios.put(
                `${API_URL}/profile/password`,
                { oldPassword, newPassword },
                { headers: { Authorization: localStorage.getItem("token") } }
            );
            alert("Password changed successfully!");
        } catch (error) {
            alert("Error changing password");
        }
    };

    return user ? (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
            <h2>Profile</h2>
            <img
                src={`http://localhost:5000${user.profilePic || "/default-avatar.png"}`}
                alt="Profile"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <input type="file" onChange={handleImageUpload} />

            <p>Name: {user.name}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>

            <h3>Change Password</h3>
            <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handlePasswordChange}>Change Password</button>
        </div>
    ) : (
        <p>Loading...</p>
    );
};

export default Profile;