import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./admin.css";

const API_URL = "http://localhost:8080/api/admin";

function formatStatus(status) {
    if (!status) return "Unknown";

    return status
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(date) {
    if (!date) return "—";

    return String(date).includes("T")
        ? String(date).split("T")[0]
        : String(date);
}

function ManageComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [assigningId, setAssigningId] = useState(null);

    async function fetchData() {
        setLoading(true);
        setError("");

        try {
            const [complaintsResponse, employeesResponse] =
                await Promise.all([
                    fetch(`${API_URL}/complaints`),
                    fetch(`${API_URL}/employees`),
                ]);

            if (!complaintsResponse.ok) {
                throw new Error("Could not load complaints.");
            }

            if (!employeesResponse.ok) {
                throw new Error("Could not load employees.");
            }

            const complaintsData = await complaintsResponse.json();
            const employeesData = await employeesResponse.json();

            setComplaints(
                Array.isArray(complaintsData) ? complaintsData : []
            );

            setEmployees(
                Array.isArray(employeesData) ? employeesData : []
            );
        } catch (err) {
            setError(
                `${err.message} Check that the Spring Boot backend is running.`
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleAssignment = async (complaintId) => {
        const employeeId = selectedEmployees[complaintId];

        if (!employeeId) {
            setMessage("");
            setError("Please select an employee first.");
            return;
        }

        setAssigningId(complaintId);
        setError("");
        setMessage("");

        try {
            const response = await fetch(
                `${API_URL}/complaints/${complaintId}/assign`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        employeeId: Number(employeeId),
                    }),
                }
            );

            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(
                    result.message || "Employee assignment failed."
                );
            }

            setMessage(
                `Employee assigned successfully to complaint #${complaintId}.`
            );

            await fetchData();
        } catch (err) {
            setError(err.message);
        } finally {
            setAssigningId(null);
        }
    };

    const filteredComplaints = useMemo(() => {
        const search = searchTerm.trim().toLowerCase();

        return complaints.filter((complaint) => {
            const citizenName =
                complaint.citizen?.name ||
                complaint.citizenName ||
                "Unknown citizen";

            const category = complaint.category || "";
            const id = String(complaint.id ?? "");

            const matchesSearch =
                id.toLowerCase().includes(search) ||
                citizenName.toLowerCase().includes(search) ||
                category.toLowerCase().includes(search) ||
                String(complaint.description || "")
                    .toLowerCase()
                    .includes(search);

            const status = formatStatus(complaint.status);

            const matchesStatus =
                statusFilter === "All" ||
                status.toLowerCase() === statusFilter.toLowerCase();

            return matchesSearch && matchesStatus;
        });
    }, [complaints, searchTerm, statusFilter]);

    return (
        <div className="admin-page">
            <header className="admin-header">
                <div className="admin-brand">
                    <h1>Admin Panel</h1>
                    <p>Municipal Complaint Management System</p>
                </div>

                <nav className="admin-nav">
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/complaints">Complaints</Link>
                    <Link to="/admin/users">Users</Link>
                    <Link to="/admin/profile">Profile</Link>
                </nav>
            </header>

            <main className="admin-content">
                <section className="admin-page-heading">
                    <h2>Manage Complaints</h2>
                    <p>
                        View complaints, filter by status, and assign
                        employees.
                    </p>
                </section>

                {error && (
                    <p className="admin-error" role="alert">
                        {error}
                    </p>
                )}

                {message && (
                    <p role="status">
                        {message}
                    </p>
                )}

                <section className="admin-filter-section">
                    <div className="admin-search">
                        <label htmlFor="complaint-search">Search</label>
                        <input
                            id="complaint-search"
                            type="text"
                            placeholder="Search by ID, citizen, category, or description"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="admin-filter">
                        <label htmlFor="status-filter">Status</label>
                        <select
                            id="status-filter"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>

                    <button type="button" onClick={fetchData}>
                        Refresh
                    </button>
                </section>

                <section className="admin-table-card">
                    <div className="admin-table-header">
                        <div>
                            <h3>Complaints</h3>
                            <p>
                                Showing {filteredComplaints.length} of{" "}
                                {complaints.length} complaints
                            </p>
                        </div>
                    </div>

                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Complaint ID</th>
                                    <th>Citizen</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Assigned Employee</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="admin-no-results">
                                            Loading complaints...
                                        </td>
                                    </tr>
                                ) : filteredComplaints.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="admin-no-results">
                                            {complaints.length === 0
                                                ? "No complaints in the database yet."
                                                : "No complaints match your search."}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredComplaints.map((complaint) => {
                                        const assignedEmployee =
                                            complaint.employee;

                                        return (
                                            <tr key={complaint.id}>
                                                <td>
                                                    <strong>
                                                        #{complaint.id}
                                                    </strong>
                                                </td>

                                                <td>
                                                    {complaint.citizen?.name ||
                                                        complaint.citizenName ||
                                                        "Unknown"}
                                                </td>

                                                <td>
                                                    {complaint.category || "—"}
                                                </td>

                                                <td>
                                                    <span
                                                        className={`admin-status ${String(
                                                            complaint.status || "unknown"
                                                        )
                                                            .toLowerCase()
                                                            .replaceAll("_", "-")
                                                            .replaceAll(" ", "-")}`}
                                                    >
                                                        {formatStatus(
                                                            complaint.status
                                                        )}
                                                    </span>
                                                </td>

                                                <td>
                                                    {formatDate(
                                                        complaint.createdAt
                                                    )}
                                                </td>

                                                <td>
                                                    {assignedEmployee?.name ||
                                                        "Not assigned"}
                                                </td>

                                                <td>
                                                    <div>
                                                        <select
                                                            aria-label={`Select employee for complaint ${complaint.id}`}
                                                            value={
                                                                selectedEmployees[
                                                                    complaint.id
                                                                ] ??
                                                                assignedEmployee?.id ??
                                                                ""
                                                            }
                                                            onChange={(e) =>
                                                                setSelectedEmployees(
                                                                    (current) => ({
                                                                        ...current,
                                                                        [complaint.id]:
                                                                            e.target.value,
                                                                    })
                                                                )
                                                            }
                                                            disabled={
                                                                assigningId ===
                                                                complaint.id
                                                            }
                                                        >
                                                            <option value="">
                                                                Select employee
                                                            </option>

                                                            {employees.map(
                                                                (employee) => (
                                                                    <option
                                                                        key={employee.id}
                                                                        value={employee.id}
                                                                    >
                                                                        {employee.name}
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleAssignment(
                                                                    complaint.id
                                                                )
                                                            }
                                                            disabled={
                                                                assigningId ===
                                                                    complaint.id ||
                                                                employees.length ===
                                                                    0
                                                            }
                                                        >
                                                            {assigningId ===
                                                            complaint.id
                                                                ? "Assigning..."
                                                                : "Assign"}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default ManageComplaints;