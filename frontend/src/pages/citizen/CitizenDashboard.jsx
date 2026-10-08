import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./citizen.css";

function CitizenDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) || {};

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

	useEffect(() => {
	    const fetchComplaints = async () => {
	        if (!user || !user.id) {
	            setError("Citizen information not found. Please login again.");
	            setLoading(false);
	            return;
	        }

	        try {
	            const response = await fetch(
	                `http://localhost:8080/api/citizen/${user.id}/complaints`
	            );

	            const data = await response.json();

	            if (!response.ok) {
	                throw new Error(
	                    data.message || "Failed to fetch complaints"
	                );
	            }

	            setComplaints(data);
	        } catch (error) {
	            console.error("Error fetching complaints:", error);
	            setError(error.message || "Failed to fetch complaints");
	        } finally {
	            setLoading(false);
	        }
	    };

	    fetchComplaints();
	}, [user.id]);
    // =========================
    // DYNAMIC STATISTICS
    // =========================

    const totalComplaints = complaints.length;

    const pendingComplaints = complaints.filter(
        (complaint) =>
            complaint.status?.toUpperCase() === "PENDING"
    ).length;

    const inProgressComplaints = complaints.filter(
        (complaint) =>
            complaint.status?.toUpperCase() === "IN_PROGRESS" ||
            complaint.status?.toUpperCase() === "IN PROGRESS"
    ).length;

    const resolvedComplaints = complaints.filter(
        (complaint) =>
            complaint.status?.toUpperCase() === "RESOLVED"
    ).length;

    // Show latest 3 complaints
    const recentComplaints = [...complaints]
        .reverse()
        .slice(0, 3);

    // =========================
    // STATUS CSS
    // =========================

    const getStatusClass = (status) => {

        const normalizedStatus = status?.toUpperCase();

        if (normalizedStatus === "PENDING") {
            return "status-pending";
        }

        if (
            normalizedStatus === "IN_PROGRESS" ||
            normalizedStatus === "IN PROGRESS"
        ) {
            return "status-progress";
        }

        if (normalizedStatus === "RESOLVED") {
            return "status-resolved";
        }

        return "status-pending";
    };

    // =========================
    // DATE FORMAT
    // =========================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    return (

        <div className="citizen-app">

            {/* SIDEBAR */}

            <aside className="citizen-sidebar">

                <div className="citizen-brand">

                    <h2>🏛 CityConnect</h2>

                    <p>
                        Municipal Citizen Portal
                    </p>

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

                        <h1>
                            Citizen Dashboard
                        </h1>

                        <p>
                            Welcome back! Here's your complaint overview.
                        </p>

                    </div>

                    <div className="citizen-user">

                        👤 {user.name || "Citizen"}

                    </div>

                </div>

                {/* WELCOME */}

                <div className="citizen-panel">

                    <h3>
                        Hello, {user.name || "Citizen"}! 👋
                    </h3>

                    <p
                        style={{
                            color: "#8290a3",
                            fontSize: "14px"
                        }}
                    >
                        Welcome to CityConnect. You can submit municipal
                        complaints and track their progress from here.
                    </p>

                    <button
                        className="citizen-btn"
                        onClick={() =>
                            navigate("/citizen/create-complaint")
                        }
                    >
                        + Submit New Complaint
                    </button>

                </div>

                {/* LOADING */}

                {loading && (

                    <div className="citizen-panel">

                        <p>
                            Loading your complaints...
                        </p>

                    </div>

                )}

                {/* ERROR */}

                {error && !loading && (

                    <div className="citizen-panel">

                        <p style={{ color: "red" }}>
                            {error}
                        </p>

                    </div>

                )}

                {/* DASHBOARD DATA */}

                {!loading && !error && (

                    <>

                        {/* STATISTICS */}

                        <div className="citizen-stats">

                            <div className="citizen-stat-card stat-blue">

                                <p>
                                    Total Complaints
                                </p>

                                <h2>
                                    {totalComplaints}
                                </h2>

                                <span>
                                    All submitted complaints
                                </span>

                            </div>

                            <div className="citizen-stat-card stat-orange">

                                <p>
                                    Pending
                                </p>

                                <h2>
                                    {pendingComplaints}
                                </h2>

                                <span>
                                    Awaiting action
                                </span>

                            </div>

                            <div className="citizen-stat-card stat-purple">

                                <p>
                                    In Progress
                                </p>

                                <h2>
                                    {inProgressComplaints}
                                </h2>

                                <span>
                                    Currently being addressed
                                </span>

                            </div>

                            <div className="citizen-stat-card stat-green">

                                <p>
                                    Resolved
                                </p>

                                <h2>
                                    {resolvedComplaints}
                                </h2>

                                <span>
                                    Successfully completed
                                </span>

                            </div>

                        </div>

                        {/* RECENT COMPLAINTS */}

                        <div className="citizen-panel">

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "12px",
                                    marginBottom: "18px"
                                }}
                            >

                                <h3>
                                    Recent Complaints
                                </h3>

                                <button
                                    className="citizen-btn citizen-btn-secondary"
                                    onClick={() =>
                                        navigate("/citizen/my-complaints")
                                    }
                                >
                                    View All
                                </button>

                            </div>

                            {recentComplaints.length === 0 ? (

                                <p
                                    style={{
                                        color: "#8290a3",
                                        textAlign: "center",
                                        padding: "30px"
                                    }}
                                >
                                    You haven't submitted any complaints yet.
                                </p>

                            ) : (

                                <table className="citizen-table">

                                    <thead>

                                        <tr>

										<th>
										    Complaint ID
										</th>

										<th>
										    Category
										</th>

										<th>
										    Date
										</th>

										<th>
										    Location
										</th>

										<th>
										    Status
										</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {recentComplaints.map(
                                            (complaint) => (

                                                <tr
                                                    key={complaint.id}
                                                >

												<td>
												    CMP
												    {String(
												        complaint.id
												    ).padStart(3, "0")}
												</td>

												<td>
												    {complaint.category || "-"}
												</td>

												<td>
												    {formatDate(complaint.createdAt)}
												</td>

												<td>
												    {complaint.location || "-"}
												</td>

												<td>
												    <span
												        className={`citizen-status ${getStatusClass(
												            complaint.status
												        )}`}
												    >
												        {complaint.status || "PENDING"}
												    </span>
												</td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            )}

                        </div>

                    </>

                )}

                {/* FOOTER */}

                <p
                    style={{
                        textAlign: "center",
                        color: "#8290a3",
                        fontSize: "12px",
                        marginTop: "30px"
                    }}
                >
                    © 2026 CityConnect | Municipal Complaint Management System
                </p>

            </main>

        </div>
    );
}

export default CitizenDashboard;