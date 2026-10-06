import React, { useEffect, useState } from "react";
import "./UpdateComplaint.css";

function UpdateComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState("");
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
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
          throw new Error("Failed to load complaints");
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

  const handleComplaintChange = (e) => {
    const complaintId = e.target.value;
    setSelectedComplaint(complaintId);
    setMessage("");
    setError("");

    const complaint = complaints.find(
      (item) => String(item.id) === String(complaintId)
    );

    if (complaint) {
      setStatus(complaint.status || "PENDING");
      setRemarks(complaint.remarks || "");
    } else {
      setStatus("");
      setRemarks("");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const employeeId = user?.id;

    if (!selectedComplaint) {
      setError("Please select a complaint.");
      return;
    }

    if (!status) {
      setError("Please select a status.");
      return;
    }

    setUpdating(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/employee/complaints/${selectedComplaint}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeId: employeeId,
            status: status,
            remarks: remarks,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update complaint");
      }

      const updatedComplaint = await response.json();

      setComplaints((previousComplaints) =>
        previousComplaints.map((complaint) =>
          complaint.id === updatedComplaint.id
            ? updatedComplaint
            : complaint
        )
      );

      setMessage(
        `Complaint #${updatedComplaint.id} updated successfully.`
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="update-page">
        <div className="update-box">Loading complaints...</div>
      </div>
    );
  }

  return (
    <div className="update-page">
      <div className="update-header">
        <div>
          <h1>Update Complaint</h1>
          <p>Update the status and remarks of your assigned complaint.</p>
        </div>
      </div>

      <div className="update-box">
        {error && <div className="update-error">{error}</div>}

        {message && <div className="update-success">{message}</div>}

        {complaints.length === 0 ? (
          <div className="no-complaints">
            No complaints are currently assigned to you.
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Select Complaint</label>

              <select
                value={selectedComplaint}
                onChange={handleComplaintChange}
              >
                <option value="">-- Select Complaint --</option>

                {complaints.map((complaint) => (
                  <option key={complaint.id} value={complaint.id}>
                    Complaint #{complaint.id} - {complaint.category}
                  </option>
                ))}
              </select>
            </div>

            {selectedComplaint && (
              <>
                <div className="selected-complaint">
                  <h3>
                    Complaint #{selectedComplaint}
                  </h3>

                  {(() => {
                    const complaint = complaints.find(
                      (item) =>
                        String(item.id) === String(selectedComplaint)
                    );

                    return complaint ? (
                      <>
                        <p>
                          <strong>Category:</strong>{" "}
                          {complaint.category}
                        </p>

                        <p>
                          <strong>Location:</strong>{" "}
                          {complaint.location}
                        </p>

                        <p>
                          <strong>Description:</strong>{" "}
                          {complaint.description}
                        </p>
                      </>
                    ) : null;
                  })()}
                </div>

                <div className="form-group">
                  <label>Complaint Status</label>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Remarks</label>

                  <textarea
                    rows="5"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter update remarks..."
                  />
                </div>

                <button
                  type="submit"
                  className="update-button"
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Update Complaint"}
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default UpdateComplaint;