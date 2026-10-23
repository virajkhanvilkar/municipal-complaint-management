
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./admin.css";

function AdminDashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) || {
        name: "Admin",
        email: "admin@example.com",
        role: "ADMIN",
    };

    const [stats, setStats] = useState({
        totalComplaints: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0,
        totalUsers: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/admin/dashboard"
                );

                if (!response.ok) {
                    throw new Error("Failed to load dashboard statistics");
                }

                const data = await response.json();
                setStats(data);
                setError("");
            } catch (err) {
                setError(
                    "Unable to load live statistics. Check that the backend is running."
                );
                console.error("Dashboard API error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardStats();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    const statCards = [
        {
            title: "Total Complaints",
            value: stats.totalComplaints,
            icon: "📋",
        },
        {
            title: "Pending",
            value: stats.pending,
            icon: "⏳",
        },
        {
            title: "In Progress",
            value: stats.inProgress,
            icon: "🔄",
        },
        {
            title: "Resolved",
            value: stats.resolved,
            icon: "✅",
        },
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: "👥",
        },
    ];

    return (
        <div className="admin-page">
            <header className="admin-header">
                <div className="admin-brand">
                    <h1>Admin Dashboard</h1>
                    <p>Municipal Complaint Management System</p>
                </div>

                <nav className="admin-nav">
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/complaints">Complaints</Link>
                    <Link to="/admin/users">Users</Link>
                    <Link to="/admin/profile">Profile</Link>

                    <button
                        type="button"
                        className="admin-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </nav>
            </header>

            <main className="admin-content">
                <section className="admin-welcome">
                    <h2>Welcome, {user.name || "Admin"}</h2>
                    <p>
                        Monitor complaints, manage users, and oversee
                        the municipal complaint system.
                    </p>
                </section>

                {error && (
                    <p role="alert" className="admin-error">
                        {error}
                    </p>
                )}

                <section className="admin-stats">
                    {statCards.map((card) => (
                        <div className="admin-stat-card" key={card.title}>
                            <span className="admin-stat-icon">
                                {card.icon}
                            </span>

                            <div>
                                <h3>{card.title}</h3>
                                <p>
                                    {loading ? "Loading..." : card.value ?? 0}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="admin-actions">
                    <div className="admin-section-heading">
                        <h2>Quick Actions</h2>
                        <p>
                            Quickly access important administrative
                            functions.
                        </p>
                    </div>

                    <div className="admin-action-buttons">
                        <Link
                            to="/admin/complaints"
                            className="admin-action-button"
                        >
                            Manage Complaints
                        </Link>

                        <Link
                            to="/admin/users"
                            className="admin-action-button"
                        >
                            Manage Users
                        </Link>

                        <Link
                            to="/admin/profile"
                            className="admin-action-button secondary"
                        >
                            View Profile
                        </Link>
                    </div>
                </section>

                <section className="admin-recent">
                    <div className="admin-section-heading">
                        <h2>Recent Activity</h2>
                        <p>
                            Recent administrative activity will appear here.
                        </p>
                    </div>

                    <div className="admin-empty-state">
                        <span>📭</span>
                        <p>No recent activity available.</p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AdminDashboard;
