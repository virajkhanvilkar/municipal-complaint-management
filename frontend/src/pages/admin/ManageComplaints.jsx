import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./admin.css";

function ManageComplaints() {
    const [complaints, setComplaints] = useState([
        {
            id: "CMP-1001",
            citizen: "Rahul Patil",
            category: "Road",
            status: "Pending",
            date: "2026-10-01",
        },
        {
            id: "CMP-1002",
            citizen: "Sneha Joshi",
            category: "Water",
            status: "In Progress",
            date: "2026-10-01",
        },
        {
            id: "CMP-1003",
            citizen: "Amit Shinde",
            category: "Garbage",
            status: "Resolved",
            date: "2026-09-30",
        },
        {
            id: "CMP-1004",
            citizen: "Priya Kulkarni",
            category: "Electricity",
            status: "Pending",
            date: "2026-09-29",
        },
        {
            id: "CMP-1005",
            citizen: "Vishal More",
            category: "Sewage",
            status: "In Progress",
            date: "2026-09-28",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const handleStatusChange = (complaintId, newStatus) => {
        setComplaints((currentComplaints) =>
            currentComplaints.map((complaint) =>
                complaint.id === complaintId
                    ? { ...complaint, status: newStatus }
                    : complaint
            )
        );
    };

    const filteredComplaints = useMemo(() => {
        return complaints.filter((complaint) => {
            const search = searchTerm.toLowerCase().trim();

            const matchesSearch =
                complaint.id.toLowerCase().includes(search) ||
                complaint.citizen.toLowerCase().includes(search) ||
                complaint.category.toLowerCase().includes(search);

            const matchesStatus =
                statusFilter === "All" ||
                complaint.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [complaints, searchTerm, statusFilter]);

    return (
        <div className="admin-page">

            {/* ================= HEADER ================= */}

            <header className="admin-header">

                <div className="admin-brand">
                    <h1>Admin Panel</h1>
                    <p>Municipal Complaint Management System</p>
                </div>

                <nav className="admin-nav">
                    <Link to="/admin/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/admin/complaints">
                        Complaints
                    </Link>

                    <Link to="/admin/users">
                        Users
                    </Link>

                    <Link to="/admin/profile">
                        Profile
                    </Link>
                </nav>

            </header>


            {/* ================= MAIN CONTENT ================= */}

            <main className="admin-content">

                <section className="admin-page-heading">

                    <h2>Manage Complaints</h2>

                    <p>
                        Search, filter, and update municipal complaints.
                    </p>

                </section>


                {/* ================= FILTERS ================= */}

                <section className="admin-filter-section">

                    <div className="admin-search">

                        <label htmlFor="complaint-search">
                            Search
                        </label>

                        <input
                            id="complaint-search"
                            type="text"
                            placeholder="Search by ID, citizen, or category"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />

                    </div>


                    <div className="admin-filter">

                        <label htmlFor="status-filter">
                            Status
                        </label>

                        <select
                            id="status-filter"
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(e.target.value)
                            }
                        >
                            <option value="All">All</option>
                            <option value="Pending">Pending</option>
                            <option value="In Progress">
                                In Progress
                            </option>
                            <option value="Resolved">
                                Resolved
                            </option>
                        </select>

                    </div>

                </section>


                {/* ================= COMPLAINT TABLE ================= */}

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
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredComplaints.length > 0 ? (

                                    filteredComplaints.map(
                                        (complaint) => (
                                            <tr key={complaint.id}>

                                                <td>
                                                    <strong>
                                                        {complaint.id}
                                                    </strong>
                                                </td>

                                                <td>
                                                    {complaint.citizen}
                                                </td>

                                                <td>
                                                    {complaint.category}
                                                </td>

                                                <td>

                                                    <span
                                                        className={`admin-status ${complaint.status
                                                            .toLowerCase()
                                                            .replace(
                                                                " ",
                                                                "-"
                                                            )}`}
                                                    >
                                                        {complaint.status}
                                                    </span>

                                                </td>

                                                <td>
                                                    {complaint.date}
                                                </td>

                                                <td>

                                                    <select
                                                        className="admin-status-select"
                                                        value={
                                                            complaint.status
                                                        }
                                                        onChange={(e) =>
                                                            handleStatusChange(
                                                                complaint.id,
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="Pending">
                                                            Pending
                                                        </option>

                                                        <option value="In Progress">
                                                            In Progress
                                                        </option>

                                                        <option value="Resolved">
                                                            Resolved
                                                        </option>
                                                    </select>

                                                </td>

                                            </tr>
                                        )
                                    )

                                ) : (

                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="admin-no-results"
                                        >
                                            No complaints found.
                                        </td>
                                    </tr>

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