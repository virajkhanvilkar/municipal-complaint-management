
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const loggedInUser = JSON.parse(savedUser);

      if (!loggedInUser?.id) {
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
        return;
      }

      setUser(loggedInUser);
    } catch {
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  if (!user) {
    return <p>Loading employee profile...</p>;
  }

  const employeeName = user.name || "Employee";
  const employeeInitial = employeeName.charAt(0).toUpperCase();

  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "40px auto",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Employee Profile</h1>

      <p>View your employee account information.</p>

      <section
        style={{
          marginTop: "28px",
          padding: "28px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          background: "#ffffff",
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "50%",
              background: "#b91c1c",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            {employeeInitial}
          </div>

          <div>
            <h2 style={{ margin: "0 0 8px" }}>{employeeName}</h2>
            <span>{user.role || "EMPLOYEE"}</span>
          </div>
        </div>

        <hr style={{ border: "0", borderTop: "1px solid #e5e7eb" }} />

        <div style={{ marginTop: "24px" }}>
          <p>
            <strong>Full Name</strong>
          </p>
          <p>{user.name || "Not available"}</p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Email Address</strong>
          </p>
          <p>{user.email || "Not available"}</p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Employee ID</strong>
          </p>
          <p>{user.id}</p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Role</strong>
          </p>
          <p>{user.role || "EMPLOYEE"}</p>
        </div>

        <p
          style={{
            marginTop: "28px",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          Profile details are displayed from your current login session.
        </p>
      </section>
    </div>
  );
}

export default Profile;
