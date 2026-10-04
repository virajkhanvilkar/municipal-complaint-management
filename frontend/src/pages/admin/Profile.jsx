import { useState } from "react";
import { Link } from "react-router-dom";
import "./admin.css";

function Profile() {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {
        name: "Admin",
        email: "admin@example.com",
        phone: "",
        role: "ADMIN",
    };

    const [name, setName] = useState(storedUser.name || "");
    const [phone, setPhone] = useState(storedUser.phone || "");
    const [message, setMessage] = useState("");

    const handleSave = (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setMessage("Name cannot be empty.");
            return;
        }

        const updatedUser = {
            ...storedUser,
            name: name.trim(),
            phone: phone.trim(),
        };

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        setMessage("Profile updated successfully.");
    };

    return (
        <div className="admin-page">

            {/* ================= HEADER ================= */}

            <header className="admin-header">

                <div className="admin-brand">
                    <h1>Admin Panel</h1>
                    <p>Municipal Complaint Management System</p>
                </div>

                <nav className="admin-nav">

                    <Link to="/admin/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/admin/complaints">
                        Complaints
                    </Link>

                    <Link to="/admin/users">
                        Users
                    </Link>

                    <Link to="/admin/profile">
                        Profile
                    </Link>

                </nav>

            </header>


            {/* ================= MAIN CONTENT ================= */}

            <main className="admin-content">

                <section className="admin-page-heading">

                    <h2>Admin Profile</h2>

                    <p>
                        View and update your administrator profile.
                    </p>

                </section>


                {/* ================= PROFILE CARD ================= */}

                <section className="admin-profile-card">

                    <div className="admin-profile-avatar">
                        {name
                            ? name.charAt(0).toUpperCase()
                            : "A"}
                    </div>


                    <form
                        className="admin-profile-form"
                        onSubmit={handleSave}
                    >

                        {/* Name */}

                        <div className="admin-form-group">

                            <label htmlFor="admin-name">
                                Name
                            </label>

                            <input
                                id="admin-name"
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />

                        </div>


                        {/* Email */}

                        <div className="admin-form-group">

                            <label htmlFor="admin-email">
                                Email
                            </label>

                            <input
                                id="admin-email"
                                type="email"
                                value={storedUser.email || ""}
                                disabled
                            />

                        </div>


                        {/* Phone */}

                        <div className="admin-form-group">

                            <label htmlFor="admin-phone">
                                Phone
                            </label>

                            <input
                                id="admin-phone"
                                type="tel"
                                value={phone}
                                placeholder="Enter phone number"
                                onChange={(e) =>
                                    setPhone(e.target.value)
                                }
                            />

                        </div>


                        {/* Role */}

                        <div className="admin-form-group">

                            <label htmlFor="admin-role">
                                Role
                            </label>

                            <input
                                id="admin-role"
                                type="text"
                                value={storedUser.role || "ADMIN"}
                                disabled
                            />

                        </div>


                        {/* Message */}

                        {message && (
                            <div className="admin-profile-message">
                                {message}
                            </div>
                        )}


                        {/* Save */}

                        <button
                            type="submit"
                            className="admin-profile-save"
                        >
                            Save Changes
                        </button>

                    </form>

                </section>

            </main>

        </div>
    );
}

export default Profile;