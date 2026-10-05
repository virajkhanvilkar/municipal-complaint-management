import { Link, useNavigate } from "react-router-dom";
import "./admin.css";

function AdminDashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) || {
        name: "Admin",
        email: "admin@example.com",
        role: "ADMIN",
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="admin-page">

            {/* ================= HEADER ================= */}
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


            {/* ================= MAIN CONTENT ================= */}
            <main className="admin-content">

                {/* Welcome */}
                <section className="admin-welcome">

                    <h2>
                        Welcome, {user.name || "Admin"}
                    </h2>

                    <p>
                        Monitor complaints, manage users, and oversee
                        the municipal complaint system.
                    </p>

                </section>


                {/* ================= STATISTICS ================= */}
                <section className="admin-stats">

                    <div className="admin-stat-card">
                        <span className="admin-stat-icon">📋</span>

                        <div>
                            <h3>Total Complaints</h3>
                            <p>—</p>
                        </div>
                    </div>


                    <div className="admin-stat-card">
                        <span className="admin-stat-icon">⏳</span>

                        <div>
                            <h3>Pending</h3>
                            <p>—</p>
                        </div>
                    </div>


                    <div className="admin-stat-card">
                        <span className="admin-stat-icon">🔄</span>

                        <div>
                            <h3>In Progress</h3>
                            <p>—</p>
                        </div>
                    </div>


                    <div className="admin-stat-card">
                        <span className="admin-stat-icon">✅</span>

                        <div>
                            <h3>Resolved</h3>
                            <p>—</p>
                        </div>
                    </div>


                    <div className="admin-stat-card">
                        <span className="admin-stat-icon">👥</span>

                        <div>
                            <h3>Total Users</h3>
                            <p>—</p>
                        </div>
                    </div>

                </section>


                {/* ================= QUICK ACTIONS ================= */}
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


                {/* ================= RECENT ACTIVITY ================= */}
                <section className="admin-recent">

                    <div className="admin-section-heading">
                        <h2>Recent Activity</h2>

                        <p>
                            Recent administrative activity will appear here.
                        </p>
                    </div>

                    <div className="admin-empty-state">
                        <span>📊</span>
                        <p>No recent activity available.</p>
                    </div>

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;