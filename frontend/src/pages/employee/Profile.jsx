
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        navigate("/");
        return;
      }

      setUser(JSON.parse(storedUser));
    } catch {
      localStorage.removeItem("user");
      navigate("/");
    }
  }, [navigate]);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="employee-main">
      <header className="employee-header">
        <div>
          <h1>Employee Profile</h1>
          <p>View your account information.</p>
        </div>
      </header>

      <section className="welcome-card">
        <div>
          <h2>{user.name || "Employee"}</h2>
          <p>{user.role || "EMPLOYEE"}</p>
        </div>

        <div className="welcome-icon">
          {(user.name || "E").charAt(0).toUpperCase()}
        </div>
      </section>

      <section className="complaints-section">
        <h2>Personal Information</h2>

        <div className="complaint-details">
          <div className="detail-box">
            <span>Employee ID</span>
            <strong>{user.id ?? "N/A"}</strong>
          </div>

          <div className="detail-box">
            <span>Full Name</span>
            <strong>{user.name || "N/A"}</strong>
          </div>

          <div className="detail-box">
            <span>Email</span>
            <strong>{user.email || "N/A"}</strong>
          </div>

          <div className="detail-box">
            <span>Phone</span>
            <strong>{user.phone || "N/A"}</strong>
          </div>

          <div className="detail-box">
            <span>Role</span>
            <strong>{user.role || "EMPLOYEE"}</strong>
          </div>
        </div>

        <Link to="/employee" className="update-button">
          Back to Dashboard
        </Link>
      </section>
    </div>
  );
}

export default Profile;
