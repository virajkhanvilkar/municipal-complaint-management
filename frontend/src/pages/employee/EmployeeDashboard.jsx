
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EmployeeDashboard.css";

const API_URL = "http://localhost:8080/api/employee";

function EmployeeDashboard() {
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
          navigate("/login", { replace: true });
          return;
        }

        let loggedInUser;

        try {
          loggedInUser = JSON.parse(savedUser);
        } catch {
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
          return;
        }

        if (!loggedInUser?.id) {
          navigate("/login", { replace: true });
          return;
        }

        if (active) {
          setUser(loggedInUser);
        }

        const response = await fetch(
          `${API_URL}/${loggedInUser.id}/complaints`
        );

        if (!response.ok) {
          throw new Error(
            `Could not load complaints (HTTP ${response.status}).`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("The server returned an unexpected response.");
        }

        if (active) {
          setComplaints(data);
          setError("");
        }
      } catch (err) {
        if (active) {
          setError(
            err.message ||
              "Unable to load dashboard data. Check whether the backend is running."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [navigate]);

  const normalizeStatus = (status) =>
    String(status || "PENDING").trim().toUpperCase();

  const pendingCount = complaints.filter(
    (complaint) => normalizeStatus(complaint.status) === "PENDING"
  ).length;

  const progressCount = complaints.filter(
    (complaint) => normalizeStatus(complaint.status) === "IN_PROGRESS"
  ).length;

  const resolvedCount = complaints.filter(
    (complaint) => normalizeStatus(complaint.status) === "RESOLVED"
  ).length;

  const displayStatus = (status) => {
    const normalized = normalizeStatus(status);

    if (normalized === "IN_PROGRESS") {
      return "In Progress";
    }

    return normalized
      .toLowerCase()
      .replace(/\b\w/g, (character) => character.toUpperCase());
  };

  const getStatusClass = (status) => {
    const normalized = normalizeStatus(status);

    if (normalized === "IN_PROGRESS") {
      return "progress";
    }

    if (normalized === "RESOLVED") {
      return "resolved";
    }

    return "pending";
  };

  const employeeName = user?.name?.trim() || "Employee";
  const employeeInitial = employeeName.charAt(0).toUpperCase();

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
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
          <div className="employee-avatar">{employeeInitial}</div>

          <div>
            <h3>{employeeName}</h3>
            <p>{user?.role || "EMPLOYEE"}</p>
          </div>
        </div>

        <nav className="employee-nav">
          <Link to="/employee" className="active">
            <span>📊</span>
            Dashboard
          </Link>

          <Link to="/employee/complaints">
            <span>📋</span>
            Assigned Complaints
          </Link>

          <Link to="/employee/update-complaint">
            <span>✏️</span>
            Update Complaint
          </Link>

          <Link to="/employee/profile">
            <span>👤</span>
            Profile
          </Link>
        </nav>

        <div className="sidebar-bottom">
          <button
            type="button"
            onClick={handleLogout}
            className="employee-logout"
          >
            <span>↪</span>
            Logout
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
            <div className="header-avatar">{employeeInitial}</div>

            <div>
              <strong>{employeeName}</strong>
              <span>{user?.role || "EMPLOYEE"}</span>
            </div>
          </div>
        </header>

        <section className="welcome-card">
          <div>
            <h2>Welcome back, {employeeName}!</h2>

            <p>
              Here is an overview of your assigned municipal complaints.
            </p>
          </div>

          <div className="welcome-icon">🏢</div>
        </section>

        {error && (
          <div role="alert" className="employee-dashboard-error">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        <section className="employee-stats">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div>
              <span>Total Assigned</span>
              <h2>{loading ? "—" : complaints.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div>
              <span>Pending</span>
              <h2>{loading ? "—" : pendingCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔄</div>
            <div>
              <span>In Progress</span>
              <h2>{loading ? "—" : progressCount}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✓</div>
            <div>
              <span>Resolved</span>
              <h2>{loading ? "—" : resolvedCount}</h2>
            </div>
          </div>
        </section>

        <section className="complaints-section">
          <div className="section-header">
            <div>
              <h2>Recent Assigned Complaints</h2>
              <p>Complaints currently assigned to you</p>
            </div>

            <Link to="/employee/complaints">View All</Link>
          </div>

          <div className="complaint-table">
            <div className="table-header">
              <span>Complaint ID</span>
              <span>Category</span>
              <span>Location</span>
              <span>Status</span>
            </div>

            {loading ? (
              <div className="table-row">
                <span>Loading complaints...</span>
              </div>
            ) : error ? (
              <div className="table-row">
                <span>Dashboard data could not be loaded.</span>
              </div>
            ) : complaints.length === 0 ? (
              <div className="table-row">
                <span>No complaints are currently assigned to you.</span>
              </div>
            ) : (
              [...complaints]
                .sort(
                  (a, b) =>
                    Number(b.id || 0) - Number(a.id || 0)
                )
                .slice(0, 5)
                .map((complaint) => (
                  <div className="table-row" key={complaint.id}>
                    <span>#{complaint.id}</span>
                    <span>{complaint.category || "—"}</span>
                    <span>{complaint.location || "—"}</span>
                    <span
                      className={`status ${getStatusClass(complaint.status)}`}
                    >
                      {displayStatus(complaint.status)}
                    </span>
                  </div>
                ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default EmployeeDashboard;
