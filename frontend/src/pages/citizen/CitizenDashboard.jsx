
import { useNavigate } from "react-router-dom";
import "./citizen.css";

function CitizenDashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) || {};

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const complaints = [
        {
            id: "CMP001",
            title: "Water Supply Issue",
            category: "Water Supply",
            date: "02 Oct 2026",
            status: "Pending"
        },
        {
            id: "CMP002",
            title: "Street Light Not Working",
            category: "Street Light",
            date: "28 Sep 2026",
            status: "In Progress"
        },
        {
            id: "CMP003",
            title: "Garbage Collection Problem",
            category: "Garbage",
            date: "25 Sep 2026",
            status: "Resolved"
        }
    ];

    const getStatusClass = (status) => {
        if (status === "Pending") return "status-pending";
        if (status === "In Progress") return "status-progress";
        return "status-resolved";
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

                    <a
                        href="#dashboard"
                        className="active"
                        onClick={(e) => e.preventDefault()}
                    >
                        🏠 Dashboard
                    </a>

                    <a
                        href="#create"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/citizen/create-complaint");
                        }}
                    >
                        📝 Create Complaint
                    </a>

                    <a
                        href="#complaints"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/citizen/my-complaints");
                        }}
                    >
                        📋 My Complaints
                    </a>

                    <a
                        href="#profile"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/citizen/profile");
                        }}
                    >
                        👤 My Profile
                    </a>

                </nav>

                <div style={{ marginTop: "50px" }}>
                    <button
                        className="citizen-btn citizen-btn-secondary"
                        onClick={handleLogout}
                        style={{ width: "100%" }}
                    >
                        ↪ Logout
                    </button>
                </div>

            </aside>

            {/* MAIN CONTENT */}
            <main className="citizen-main">

                {/* TOP HEADER */}
                <div className="citizen-topbar">

                    <div>
                        <h1>Citizen Dashboard</h1>
                        <p>
                            Welcome back! Here's your complaint overview.
                        </p>
                    </div>

                    <div className="citizen-user">
                        👤 {user.name || "Citizen"}
                    </div>

                </div>

                {/* WELCOME SECTION */}
                <div className="citizen-panel">
                    <h3>Hello, {user.name || "Citizen"}! 👋</h3>

                    <p style={{ color: "#8290a3", fontSize: "14px" }}>
                        Welcome to CityConnect. You can submit municipal
                        complaints and track their progress from here.
                    </p>

                    <button
                        className="citizen-btn"
                        onClick={() => navigate("/citizen/create-complaint")}
                    >
                        + Submit New Complaint
                    </button>
                </div>

                {/* STATISTICS */}
                <div className="citizen-stats">

                    <div className="citizen-stat-card stat-blue">
                        <p>Total Complaints</p>
                        <h2>12</h2>
                        <span>All submitted complaints</span>
                    </div>

                    <div className="citizen-stat-card stat-orange">
                        <p>Pending</p>
                        <h2>4</h2>
                        <span>Awaiting action</span>
                    </div>

                    <div className="citizen-stat-card stat-purple">
                        <p>In Progress</p>
                        <h2>2</h2>
                        <span>Currently being addressed</span>
                    </div>

                    <div className="citizen-stat-card stat-green">
                        <p>Resolved</p>
                        <h2>6</h2>
                        <span>Successfully completed</span>
                    </div>

                </div>

                {/* RECENT COMPLAINTS */}
                <div className="citizen-panel">

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "18px"
                    }}>
                        <h3>Recent Complaints</h3>

                        <button
                            className="citizen-btn citizen-btn-secondary"
                            onClick={() => navigate("/citizen/my-complaints")}
                        >
                            View All
                        </button>
                    </div>

                    <table className="citizen-table">

                        <thead>
                            <tr>
                                <th>Complaint ID</th>
                                <th>Complaint Title</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {complaints.map((complaint) => (
                                <tr key={complaint.id}>
                                    <td>{complaint.id}</td>
                                    <td>{complaint.title}</td>
                                    <td>{complaint.category}</td>
                                    <td>{complaint.date}</td>
                                    <td>
                                        <span className={`citizen-status ${getStatusClass(complaint.status)}`}>
                                            {complaint.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                    <p style={{
                        color: "#8290a3",
                        fontSize: "12px",
                        marginTop: "15px"
                    }}>
                        Note: Complaint records and statistics are sample data
                        for the initial UI.
                    </p>

                </div>

                {/* FOOTER */}
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

export default CitizenDashboard;
