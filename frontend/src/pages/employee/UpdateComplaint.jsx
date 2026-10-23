import React, { useEffect, useState } from "react";
import "./UpdateComplaint.css";

const API_URL = "http://localhost:8080/api/employee";

function UpdateComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState("");
  const [status, setStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const getEmployeeId = () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      throw new Error("Please log in again.");
    }

    const user = JSON.parse(storedUser);

    if (!user?.id) {
      throw new Error("Employee ID not found. Please log in again.");
    }

    return user.id;
  };

  const loadComplaints = async () => {
    const employeeId = getEmployeeId();

    const response = await fetch(
      `${API_URL}/${employeeId}/complaints`
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
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        await loadComplaints();
      } catch (err) {
        setError(err.message || "Unable to load complaints.");
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const handleComplaintChange = (e) => {
    const complaintId = e.target.value;

    setSelectedComplaint(complaintId);
    setMessage("");
    setError("");

    const complaint = complaints.find(
      (item) => String(item.id) === complaintId
    );

    setStatus(complaint?.status || (complaintId ? "PENDING" : ""));
    setRemarks(complaint?.remarks || "");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

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
      const employeeId = getEmployeeId();

      const response = await fetch(
        `${API_URL}/complaints/${selectedComplaint}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            employeeId,
            status,
            remarks,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          errorText || `Failed to update complaint (HTTP ${response.status}).`
        );
      }

      await response.json();

      await loadComplaints();

      const updated = complaints.find(
        (item) => String(item.id) === String(selectedComplaint)
      );

      setMessage(
        `Complaint #${selectedComplaint} updated successfully.`
      );

      // Re-selecting is not necessary; reload the saved values.
      const refreshedResponse = await fetch(
        `${API_URL}/${employeeId}/complaints`
      );

      if (refreshedResponse.ok) {
        const refreshed = await refreshedResponse.json();
        setComplaints(refreshed);

        const refreshedComplaint = refreshed.find(
          (item) => String(item.id) === String(selectedComplaint)
        );

        if (refreshedComplaint) {
          setStatus(refreshedComplaint.status || "PENDING");
          setRemarks(refreshedComplaint.remarks || "");
        }
      }
    } catch (err) {
      setError(err.message || "Unable to update complaint.");
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
              <label htmlFor="complaint">Select Complaint</label>

              <select
                id="complaint"
                value={selectedComplaint}
                onChange={handleComplaintChange}
                required
              >
                <option value="">-- Select Complaint --</option>

                {complaints.map((complaint) => (
                  <option key={complaint.id} value={complaint.id}>
                    Complaint #{complaint.id} -{" "}
                    {complaint.category || complaint.title || "Complaint"}
                  </option>
                ))}
              </select>
            </div>

            {selectedComplaint && (
              <>
                {(() => {
                  const complaint = complaints.find(
                    (item) =>
                      String(item.id) === String(selectedComplaint)
                  );

                  if (!complaint) return null;

                  return (
                    <div className="selected-complaint">
                      <h3>Complaint #{complaint.id}</h3>
                      <p>
                        <strong>Category:</strong>{" "}
                        {complaint.category || complaint.title || "N/A"}
                      </p>
                      <p>
                        <strong>Location:</strong>{" "}
                        {complaint.location || "N/A"}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {complaint.description || "N/A"}
                      </p>
                    </div>
                  );
                })()}

                <div className="form-group">
                  <label htmlFor="status">Complaint Status</label>

                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="remarks">Remarks</label>

                  <textarea
                    id="remarks"
                    rows="5"
                    maxLength={2000}
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
