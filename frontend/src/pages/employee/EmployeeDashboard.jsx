
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EmployeeDashboard.css";

const API_URL = "http://localhost:8080/api/employee";

function EmployeeDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          navigate("/");
          return;
        }

        const loggedInUser = JSON.parse(storedUser);

        if (!loggedInUser?.id) {
          throw new Error("Employee information not found. Please log in again.");
        }

        setUser(loggedInUser);

        const response = await fetch(
          `${API_URL}/${loggedInUser.id}/complaints`
        );

        if (!response.ok) {
          throw new Error(
            `Unable to load complaints (HTTP ${response.status}).`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid complaints response from server.");
        }

        setComplaints(data);
      } catch (err) {
        setError(err.message || "Unable to load dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [navigate]);

  const pendingCount = complaints.filter(
    (c) => c.status?.toUpperCase() === "PENDING"
  ).length;

  const inProgressCount = complaints.filter(
    (c) => c.status?.toUpperCase() === "IN_PROGRESS"
  ).length;

  const resolvedCount = complaints.filter(
    (c) => c.status?.toUpperCase() === "RESOLVED"
  ).length;

  const recentComplaints = [...complaints]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )
    .slice(0, 5);

  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return "pending";
      case "IN_PROGRESS":
        return "progress";
      case "RESOLVED":
        return "resolved";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="employee-layout">
        <main className="employee-main">
          <p>Loading employee dashboard...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="employee-layout">
      <aside className="employee-sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">🏛️</div>
          <div>
            <h2>Municipal</h2>
            <span>Complaint System</span>
          </div>
        </div>

        <div className="employee-info">
          <div className="employee-avatar">
            {(user?.name || "E").charAt(0).toUpperCase()}
          </div>
          <div>
            <h3>{user?.name || "Employee"}</h3>
            <p>{user?.role || "EMPLOYEE"}</p>
          </div>
        </div>

        <nav className="employee-nav">
          <Link to="/employee" className="active">
            🏠 Dashboard
          </Link>
          <Link to="/employee/complaints">
            📋 Assigned Complaints
          </Link>
          <Link to="/employee/update-complaint">
            ✏️ Update Complaint
          </Link>
          <Link to="/employee/profile">
            👤 Profile
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            ↪ Logout
          </button>
        </div>
      </aside>

      <main className="employee-main">
        <header className="employee-header">
          <div>
            <h1>Employee Dashboard</h1>
            <p>Manage and track your assigned complaints.</p>
          </div>

          <div className="header-user">
            <div className="header-avatar">
              {(user?.name || "E").charAt(0).toUpperCase()}
            </div>
            <div>
              <strong>{user?.name || "Employee"}</strong>
              <span>{user?.role || "EMPLOYEE"}</span>
            </div>
          </div>
        </header>

        <section className="welcome-card">
          <div>
            <h2>Welcome back, {user?.name || "Employee"}!</h2>
            <p>
              Here is the latest overview of your assigned municipal
              complaints.
            </p>
          </div>
          <div className="welcome-icon">🏢</div>
        </section>

        {error && <div className="update-error">{error}</div>}

        <section className="employee-stats">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div>
              <span>Total Assigned</span>
              <h2>{complaints.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div>
              <span>Pending</span>
              <h2>{pendingCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔧</div>
            <div>
              <span>In Progress</span>
              <h2>{inProgressCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div>
              <span>Resolved</span>
              <h2>{resolvedCount}</h2>
            </div>
          </div>
        </section>

        <section className="complaints-section">
          <div className="section-header">
            <div>
              <h2>Recent Assigned Complaints</h2>
              <p>Complaints currently assigned to you.</p>
            </div>
            <Link to="/employee/complaints">View All</Link>
          </div>

          {recentComplaints.length === 0 ? (
            <div className="no-complaints">
              No complaints are currently assigned to you.
            </div>
          ) : (
            <div className="complaint-table">
              <div className="table-header">
                <span>Complaint ID</span>
                <span>Category</span>
                <span>Location</span>
                <span>Status</span>
              </div>

              {recentComplaints.map((complaint) => (
                <div className="table-row" key={complaint.id}>
                  <span>#{complaint.id}</span>
                  <span>{complaint.category || complaint.title || "N/A"}</span>
                  <span>{complaint.location || "N/A"}</span>
                  <span className={`status ${getStatusClass(complaint.status)}`}>
                    {(complaint.status || "UNKNOWN").replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default EmployeeDashboard;
