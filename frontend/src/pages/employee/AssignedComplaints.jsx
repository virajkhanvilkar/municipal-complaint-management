
import React, { useEffect, useState } from "react";
import "./AssignedComplaints.css";

const API_URL = "http://localhost:8080/api/employee";

function AssignedComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          throw new Error("Please log in again.");
        }

        const user = JSON.parse(storedUser);

        if (!user?.id) {
          throw new Error("Employee ID not found. Please log in again.");
        }

        const response = await fetch(
          `${API_URL}/${user.id}/complaints`
        );

        if (!response.ok) {
          throw new Error(
            `Unable to load complaints (HTTP ${response.status}).`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid complaints data received.");
        }

        setComplaints(data);
      } catch (err) {
        setError(err.message || "Unable to load complaints.");
      } finally {
        setLoading(false);
      }
    };

    loadComplaints();
  }, []);

  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return "status-pending";
      case "IN_PROGRESS":
        return "status-progress";
      case "RESOLVED":
        return "status-resolved";
      default:
        return "";
    }
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
          <p>View and track your assigned municipal complaints.</p>
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
                  {(complaint.status || "UNKNOWN").replace("_", " ")}
                </span>
              </div>

              <div className="complaint-details">
                <div className="detail-box">
                  <span>Category</span>
                  <strong>
                    {complaint.category || complaint.title || "Not available"}
                  </strong>
                </div>

                <div className="detail-box">
                  <span>Location</span>
                  <strong>{complaint.location || "Not available"}</strong>
                </div>
              </div>

              <div className="description-section">
                <span>Description</span>
                <p>
                  {complaint.description || "No description available."}
                </p>
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
