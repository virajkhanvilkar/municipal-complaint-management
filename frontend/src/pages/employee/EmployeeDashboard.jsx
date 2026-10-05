import React from "react";
import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  return (
    <div className="employee-layout">

      {/* Sidebar */}
      <aside className="employee-sidebar">

        <div className="sidebar-logo">
          <div className="logo-icon">🏛️</div>

          <div>
            <h2>Municipal</h2>
            <span>Complaint System</span>
          </div>
        </div>

        <div className="employee-info">
          <div className="employee-avatar">E</div>

          <div>
            <h3>Employee</h3>
            <p>EMPLOYEE</p>
          </div>
        </div>

        <nav className="employee-nav">

          <a href="/employee" className="active">
            <span>📊</span>
            Dashboard
          </a>

          <a href="/employee/complaints">
            <span>📋</span>
            Assigned Complaints
          </a>

          <a href="/employee/update-complaint">
            <span>✏️</span>
            Update Complaint
          </a>

          <a href="/employee/profile">
            <span>👤</span>
            Profile
          </a>

        </nav>

        <div className="sidebar-bottom">
          <a href="/">
            <span>↪</span>
            Logout
          </a>
        </div>

      </aside>

      {/* Main Content */}
      <main className="employee-main">

        {/* Header */}
        <header className="employee-header">

          <div>
            <h1>Employee Dashboard</h1>
            <p>Manage and track your assigned complaints.</p>
          </div>

          <div className="header-user">
            <div className="header-avatar">E</div>

            <div>
              <strong>Employee</strong>
              <span>Employee</span>
            </div>
          </div>

        </header>

        {/* Welcome Card */}
        <section className="welcome-card">

          <div>
            <h2>Welcome back, Employee!</h2>

            <p>
              Here is an overview of your assigned municipal complaints.
            </p>
          </div>

          <div className="welcome-icon">
            🏢
          </div>

        </section>

        {/* Statistics */}
        <section className="employee-stats">

          <div className="stat-card">
            <div className="stat-icon">📋</div>

            <div>
              <span>Total Assigned</span>
              <h2>12</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⏳</div>

            <div>
              <span>Pending</span>
              <h2>05</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔄</div>

            <div>
              <span>In Progress</span>
              <h2>03</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✓</div>

            <div>
              <span>Resolved</span>
              <h2>04</h2>
            </div>
          </div>

        </section>

        {/* Recent Complaints */}
        <section className="complaints-section">

          <div className="section-header">

            <div>
              <h2>Recent Assigned Complaints</h2>

              <p>
                Complaints currently assigned to you
              </p>
            </div>

            <a href="/employee/complaints">
              View All
            </a>

          </div>

          <div className="complaint-table">

            <div className="table-header">
              <span>Complaint ID</span>
              <span>Category</span>
              <span>Location</span>
              <span>Status</span>
            </div>

            <div className="table-row">
              <span>#CMP-1024</span>
              <span>Road Damage</span>
              <span>Pune</span>

              <span className="status pending">
                Pending
              </span>
            </div>

            <div className="table-row">
              <span>#CMP-1023</span>
              <span>Street Light</span>
              <span>Kothrud</span>

              <span className="status progress">
                In Progress
              </span>
            </div>

            <div className="table-row">
              <span>#CMP-1021</span>
              <span>Garbage</span>
              <span>Shivajinagar</span>

              <span className="status resolved">
                Resolved
              </span>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default EmployeeDashboard;