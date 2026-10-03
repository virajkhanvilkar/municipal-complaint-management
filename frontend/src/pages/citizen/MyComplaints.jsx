
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./citizen.css";

function MyComplaints() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) || {};

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const complaints = [
        {
            id: "CMP001",
            title: "Water Supply Issue",
            category: "Water Supply",
            date: "02 Oct 2026",
            location: "Kolhapur",
            status: "Pending"
        },
        {
            id: "CMP002",
            title: "Street Light Not Working",
            category: "Street Light",
            date: "28 Sep 2026",
            location: "Shahupuri",
            status: "In Progress"
        },
        {
            id: "CMP003",
            title: "Garbage Collection Problem",
            category: "Garbage",
            date: "25 Sep 2026",
            location: "Rajarampuri",
            status: "Resolved"
        },
        {
            id: "CMP004",
            title: "Damaged Road",
            category: "Road Damage",
            date: "20 Sep 2026",
            location: "Tarabai Park",
            status: "Pending"
        }
    ];

    const getStatusClass = (status) => {
        if (status === "Pending") return "status-pending";
        if (status === "In Progress") return "status-progress";
        return "status-resolved";
    };

    const filteredComplaints = complaints.filter((complaint) => {
        const matchesSearch =
            complaint.id.toLowerCase().includes(search.toLowerCase()) ||
            complaint.title.toLowerCase().includes(search.toLowerCase()) ||
            complaint.category.toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
            filter === "All" || complaint.status === filter;

        return matchesSearch && matchesFilter;
    });

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

                    <a href="#complaints" className="active"
                        onClick={(e) => e.preventDefault()}>
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
                        <h1>My Complaints</h1>
                        <p>
                            View and track the progress of your complaints.
                        </p>
                    </div>

                    <div className="citizen-user">
                        👤 {user.name || "Citizen"}
                    </div>

                </div>

                {/* SUMMARY */}
                <div className="citizen-stats">

                    <div className="citizen-stat-card stat-blue">
                        <p>Total Complaints</p>
                        <h2>{complaints.length}</h2>
                    </div>

                    <div className="citizen-stat-card stat-orange">
                        <p>Pending</p>
                        <h2>
                            {complaints.filter(c => c.status === "Pending").length}
                        </h2>
                    </div>

                    <div className="citizen-stat-card stat-purple">
                        <p>In Progress</p>
                        <h2>
                            {complaints.filter(c => c.status === "In Progress").length}
                        </h2>
                    </div>

                    <div className="citizen-stat-card stat-green">
                        <p>Resolved</p>
                        <h2>
                            {complaints.filter(c => c.status === "Resolved").length}
                        </h2>
                    </div>

                </div>

                {/* COMPLAINT TABLE */}
                <div className="citizen-panel">

                    <h3>Complaint History</h3>

                    {/* SEARCH AND FILTER */}
                    <div style={{
                        display: "flex",
                        gap: "15px",
                        flexWrap: "wrap",
                        marginBottom: "22px"
                    }}>

                        <input
                            type="text"
                            placeholder="Search by ID, title or category..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                flex: "1",
                                minWidth: "220px",
                                padding: "12px",
                                border: "1px solid #dce3ed",
                                borderRadius: "7px"
                            }}
                        />

                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{
                                padding: "12px",
                                border: "1px solid #dce3ed",
                                borderRadius: "7px"
                            }}
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>

                    </div>

                    <table className="citizen-table">

                        <thead>
                            <tr>
                                <th>Complaint ID</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredComplaints.length > 0 ? (

                                filteredComplaints.map((complaint) => (

                                    <tr key={complaint.id}>
                                        <td>{complaint.id}</td>
                                        <td>{complaint.title}</td>
                                        <td>{complaint.category}</td>
                                        <td>{complaint.date}</td>
                                        <td>{complaint.location}</td>

                                        <td>
                                            <span className={`citizen-status ${getStatusClass(complaint.status)}`}>
                                                {complaint.status}
                                            </span>
                                        </td>
                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="6" style={{
                                        textAlign: "center",
                                        padding: "30px"
                                    }}>
                                        No complaints found.
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                    <p style={{
                        color: "#8290a3",
                        fontSize: "12px",
                        marginTop: "18px"
                    }}>
                        Note: Complaint records are sample data for the initial UI.
                    </p>

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

export default MyComplaints;
