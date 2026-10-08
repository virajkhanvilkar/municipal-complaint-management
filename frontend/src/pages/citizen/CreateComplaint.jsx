
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./citizen.css";

function CreateComplaint() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) || {};

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        location: "",
        landmark: "",
        description: ""
    });

    const [attachment, setAttachment] = useState(null);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        // Check logged-in citizen
        if (!user.id) {
            setMessage("User information not found. Please login again.");
            return;
        }

        // Required field validation
        if (!formData.title.trim()) {
            setMessage("Please enter complaint title.");
            return;
        }

        if (!formData.category) {
            setMessage("Please select complaint category.");
            return;
        }

        if (!formData.location.trim()) {
            setMessage("Please enter complaint location.");
            return;
        }

        if (!formData.description.trim()) {
            setMessage("Please enter complaint description.");
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:8080/api/citizen/complaints",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        citizenId: user.id,
                        category: formData.category,
                        location: formData.location,
                        description: formData.description
                    })
                }
            );

            const data = await response.json();

            console.log("Complaint response:", data);

            if (response.ok) {

                setMessage(
                    data.message || "Complaint submitted successfully!"
                );

                setFormData({
                    title: "",
                    category: "",
                    location: "",
                    landmark: "",
                    description: ""
                });

                setAttachment(null);

                e.target.reset();

            } else {

                setMessage(
                    data.message || "Failed to submit complaint."
                );
            }

        } catch (error) {

            console.error("Complaint submission error:", error);

            setMessage(
                "Cannot connect to Spring Boot server."
            );
        }
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

                    <a href="#create" className="active"
                        onClick={(e) => e.preventDefault()}>
                        📝 Create Complaint
                    </a>

                    <a href="#complaints"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/citizen/my-complaints");
                        }}>
                        📋 My Complaints
                    </a>

                    <a href="#profile"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/citizen/profile");
                        }}>
                        👤 My Profile
                    </a>

                </nav>

                <div style={{ marginTop: "50px" }}>
                    <button
                        className="citizen-btn citizen-btn-secondary"
                        style={{ width: "100%" }}
                        onClick={() => {
                            localStorage.removeItem("user");
                            navigate("/login");
                        }}
                    >
                        ↪ Logout
                    </button>
                </div>

            </aside>

            {/* MAIN CONTENT */}
            <main className="citizen-main">

                <div className="citizen-topbar">
                    <div>
                        <h1>Create New Complaint</h1>
                        <p>
                            Submit your municipal issue and help improve
                            your community.
                        </p>
                    </div>

                    <div className="citizen-user">
                        👤 {user.name || "Citizen"}
                    </div>
                </div>

                <div className="citizen-panel">

                    <h3>Complaint Information</h3>

                    <p style={{
                        color: "#8290a3",
                        fontSize: "13px",
                        marginBottom: "25px"
                    }}>
                        Please provide accurate details about the issue.
                    </p>

                    {message && (
                        <div style={{
                            background: "#def5e8",
                            color: "#16834b",
                            padding: "13px",
                            borderRadius: "7px",
                            marginBottom: "20px",
                            fontSize: "14px"
                        }}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="citizen-form-group">
                            <label>Complaint Title *</label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter a short complaint title"
                                required
                            />
                        </div>

                        <div className="citizen-form-group">
                            <label>Complaint Category *</label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select complaint category</option>
                                <option value="Water Supply">Water Supply</option>
                                <option value="Road Damage">Road Damage</option>
                                <option value="Street Light">Street Light</option>
                                <option value="Garbage">Garbage Collection</option>
                                <option value="Drainage">Drainage</option>
                                <option value="Public Sanitation">Public Sanitation</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="citizen-form-group">
                            <label>Complaint Location *</label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter area, street or address"
                                required
                            />
                        </div>

                        <div className="citizen-form-group">
                            <label>Nearby Landmark (Optional)</label>

                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleChange}
                                placeholder="Enter a nearby landmark"
                            />
                        </div>

                        <div className="citizen-form-group">
                            <label>Complaint Description *</label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Explain the issue in detail..."
                                rows="5"
                                required
                            />
                        </div>

                        <div className="citizen-form-group">
                            <label>Upload Supporting Image (Optional)</label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setAttachment(e.target.files[0] || null)
                                }
                            />

                            <small style={{ color: "#8290a3" }}>
                                {attachment
                                    ? `Selected: ${attachment.name}`
                                    : "You can attach an image to help explain the issue."}
                            </small>
                        </div>

                        <div style={{
                            display: "flex",
                            gap: "12px",
                            marginTop: "25px"
                        }}>

                            <button
                                type="submit"
                                className="citizen-btn"
                            >
                                Submit Complaint
                            </button>

                            <button
                                type="button"
                                className="citizen-btn citizen-btn-secondary"
                                onClick={() => navigate("/dashboard")}
                            >
                                Cancel
                            </button>

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

export default CreateComplaint;
