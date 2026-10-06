import React, { useEffect, useState } from "react";
import "./AssignedComplaints.css";

function AssignedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const employeeId = user?.id;

    if (!employeeId) {
      setError("Employee ID not found. Please login again.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:8080/api/employee/${employeeId}/complaints`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch assigned complaints");
        }
        return response.json();
      })
      .then((data) => {
        setComplaints(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getStatusClass = (status) => {
    if (status === "PENDING") return "status-pending";
    if (status === "IN_PROGRESS") return "status-progress";
    if (status === "RESOLVED") return "status-resolved";
    return "";
  };

  if (loading) {
    return (
      <div className="assigned-page">
        <div className="assigned-loading">
          Loading assigned complaints...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="assigned-page">
        <div className="assigned-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="assigned-page">
      <div className="assigned-header">
        <div>
          <h1>Assigned Complaints</h1>
          <p>View and manage complaints assigned to you.</p>
        </div>

        <div className="complaint-count">
          <span>{complaints.length}</span>
          <small>Assigned</small>
        </div>
      </div>

      {complaints.length === 0 ? (
        <div className="empty-complaints">
          <div className="empty-icon">✓</div>
          <h2>No Complaints Assigned</h2>
          <p>There are currently no complaints assigned to you.</p>
        </div>
      ) : (
        <div className="complaints-grid">
          {complaints.map((complaint) => (
            <div className="complaint-card" key={complaint.id}>
              <div className="complaint-card-header">
                <div>
                  <span className="complaint-label">COMPLAINT</span>
                  <h2>#{complaint.id}</h2>
                </div>

                <span
                  className={`status-badge ${getStatusClass(
                    complaint.status
                  )}`}
                >
                  {complaint.status === "IN_PROGRESS"
                    ? "IN PROGRESS"
                    : complaint.status}
                </span>
              </div>

              <div className="complaint-details">
                <div className="detail-box">
                  <span>Category</span>
                  <strong>{complaint.category || "Not available"}</strong>
                </div>

                <div className="detail-box">
                  <span>Location</span>
                  <strong>{complaint.location || "Not available"}</strong>
                </div>
              </div>

              <div className="description-section">
                <span>Description</span>
                <p>{complaint.description || "No description available."}</p>
              </div>

              <div className="citizen-section">
                <div className="citizen-title">Citizen Information</div>

                <div className="citizen-details">
                  <div>
                    <span>Name</span>
                    <strong>
                      {complaint.citizen?.name || "Not available"}
                    </strong>
                  </div>

                  <div>
                    <span>Email</span>
                    <strong>
                      {complaint.citizen?.email || "Not available"}
                    </strong>
                  </div>
                </div>
              </div>

              {complaint.remarks && (
                <div className="remarks-section">
                  <span>Latest Remarks</span>
                  <p>{complaint.remarks}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AssignedComplaints;