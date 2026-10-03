
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./citizen.css";

function Profile() {
    const navigate = useNavigate();

    const savedUser = JSON.parse(localStorage.getItem("user")) || {};

    const [user, setUser] = useState({
        name: savedUser.name || "",
        email: savedUser.email || "",
        phone: savedUser.phone || "",
        role: savedUser.role || "CITIZEN"
    });

    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = (e) => {
        e.preventDefault();

        const updatedUser = {
            ...savedUser,
            ...user
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        setEditMode(false);
        setMessage("Profile updated successfully!");
    };

    const handleCancel = () => {
        setUser({
            name: savedUser.name || "",
            email: savedUser.email || "",
            phone: savedUser.phone || "",
            role: savedUser.role || "CITIZEN"
        });

        setEditMode(false);
        setMessage("");
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="citizen-app">

            {/* SIDEBAR */}
            <aside className="citizen-sidebar">

                <div className="citizen-brand">
                    <h2>🏛 CityConnect</h2>
                    <p>Municipal Citizen Portal</p>
                </div>

                <nav className="citizen-nav">

                    <a href="#dashboard"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/dashboard");
                        }}>
                        🏠 Dashboard
                    </a>

                    <a href="#create"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/citizen/create-complaint");
                        }}>
                        📝 Create Complaint
                    </a>

                    <a href="#complaints"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/citizen/my-complaints");
                        }}>
                        📋 My Complaints
                    </a>

                    <a href="#profile" className="active"
                        onClick={(e) => e.preventDefault()}>
                        👤 My Profile
                    </a>

                </nav>

                <div style={{ marginTop: "50px" }}>
                    <button
                        className="citizen-btn citizen-btn-secondary"
                        style={{ width: "100%" }}
                        onClick={handleLogout}
                    >
                        ↪ Logout
                    </button>
                </div>

            </aside>

            {/* MAIN CONTENT */}
            <main className="citizen-main">

                <div className="citizen-topbar">
                    <div>
                        <h1>My Profile</h1>
                        <p>View and manage your personal information.</p>
                    </div>

                    <div className="citizen-user">
                        👤 {user.name || "Citizen"}
                    </div>
                </div>

                {/* PROFILE CARD */}
                <div className="citizen-panel">

                    <div style={{
                        textAlign: "center",
                        marginBottom: "30px"
                    }}>
                        <div style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "50%",
                            background: "#e6efff",
                            color: "#2864b4",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "38px",
                            margin: "0 auto 15px"
                        }}>
                            👤
                        </div>

                        <h2>{user.name || "Citizen"}</h2>

                        <p style={{ color: "#8290a3" }}>
                            {user.role}
                        </p>
                    </div>

                    {message && (
                        <div style={{
                            background: "#def5e8",
                            color: "#16834b",
                            padding: "13px",
                            borderRadius: "7px",
                            marginBottom: "20px"
                        }}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSave}>

                        <div className="citizen-form-group">
                            <label>Full Name</label>

                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                disabled={!editMode}
                                required
                            />
                        </div>

                        <div className="citizen-form-group">
                            <label>Email Address</label>

                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                disabled
                            />

                            <small style={{ color: "#8290a3" }}>
                                Email address cannot be changed here.
                            </small>
                        </div>

                        <div className="citizen-form-group">
                            <label>Phone Number</label>

                            <input
                                type="tel"
                                name="phone"
                                value={user.phone}
                                onChange={handleChange}
                                disabled={!editMode}
                                required
                            />
                        </div>

                        <div className="citizen-form-group">
                            <label>Account Role</label>

                            <input
                                type="text"
                                value={user.role}
                                disabled
                            />
                        </div>

                        <div style={{
                            display: "flex",
                            gap: "12px",
                            marginTop: "25px"
                        }}>

                            {!editMode ? (
                                <button
                                    type="button"
                                    className="citizen-btn"
                                    onClick={() => {
                                        setEditMode(true);
                                        setMessage("");
                                    }}
                                >
                                    ✏️ Edit Profile
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="submit"
                                        className="citizen-btn"
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        type="button"
                                        className="citizen-btn citizen-btn-secondary"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}

                        </div>

                    </form>

                </div>

                <p style={{
                    textAlign: "center",
                    color: "#8290a3",
                    fontSize: "12px",
                    marginTop: "30px"
                }}>
                    © 2026 CityConnect | Municipal Complaint Management System
                </p>

            </main>

        </div>
    );
}

export default Profile;
