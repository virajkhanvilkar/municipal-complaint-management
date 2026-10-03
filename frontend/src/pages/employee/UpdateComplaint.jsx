import React from "react";

function UpdateComplaint() {
  return (
    <div>
      <h1>Update Complaint</h1>

      <p>Update the status and details of assigned complaints.</p>

      <form>
        <label>Complaint Status:</label>

        <select>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
        </select>

        <br />
        <br />

        <label>Remarks:</label>

        <br />

        <textarea
          rows="5"
          cols="40"
          placeholder="Enter complaint update..."
        ></textarea>

        <br />
        <br />

        <button type="button">Update Complaint</button>
      </form>
    </div>
  );
}

export default UpdateComplaint;