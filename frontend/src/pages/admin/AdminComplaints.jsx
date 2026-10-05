import "./admin.css";

function AdminComplaints() {

    // Temporary data.
    // We will replace this with data from the Spring Boot API later.
    const complaints = [];

    return (
        <div className="admin-page">

            {/* ================= HEADER ================= */}

            <header className="admin-header">

                <div>
                    <h1>Manage Complaints</h1>

                    <p>
                        Municipal Complaint Management System
                    </p>
                </div>

                <nav className="admin-nav">

                    <a href="/admin">
                        Dashboard
                    </a>

                    <a href="/admin/complaints">
                        Complaints
                    </a>

                    <a href="/admin/users">
                        Users
                    </a>

                    <a href="/admin/profile">
                        Profile
                    </a>

                </nav>

            </header>


            {/* ================= CONTENT ================= */}

            <main className="admin-content">

                <div className="admin-welcome">

                    <h2>
                        All Complaints
                    </h2>

                    <p>
                        View and manage complaints submitted by citizens.
                    </p>

                </div>


                {/* ================= COMPLAINT SECTION ================= */}

                <div className="complaints-card">

                    <div className="complaints-header">

                        <div>
                            <h2>
                                Complaint List
                            </h2>

                            <p>
                                Manage citizen complaints and their status.
                            </p>
                        </div>


                        {/* Filters */}

                        <div className="complaint-filters">

                            <select defaultValue="">
                                <option value="">
                                    All Status
                                </option>

                                <option value="PENDING">
                                    Pending
                                </option>

                                <option value="IN_PROGRESS">
                                    In Progress
                                </option>

                                <option value="RESOLVED">
                                    Resolved
                                </option>

                            </select>


                            <select defaultValue="">
                                <option value="">
                                    All Priority
                                </option>

                                <option value="HIGH">
                                    High
                                </option>

                                <option value="MEDIUM">
                                    Medium
                                </option>

                                <option value="LOW">
                                    Low
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* ================= EMPTY STATE ================= */}

                    {complaints.length === 0 ? (

                        <div className="complaint-empty">

                            <div className="empty-icon">
                                📋
                            </div>

                            <h3>
                                No complaints available
                            </h3>

                            <p>
                                Complaints submitted by citizens
                                will appear here.
                            </p>

                        </div>

                    ) : (

                        /* ================= COMPLAINT TABLE ================= */

                        <div className="complaints-table-wrapper">

                            <table className="complaints-table">

                                <thead>

                                    <tr>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            Citizen
                                        </th>

                                        <th>
                                            Title
                                        </th>

                                        <th>
                                            Category
                                        </th>

                                        <th>
                                            Location
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Priority
                                        </th>

                                        <th>
                                            Created
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {complaints.map((complaint) => (

                                        <tr key={complaint.id}>

                                            <td>
                                                #{complaint.id}
                                            </td>

                                            <td>
                                                {complaint.citizen}
                                            </td>

                                            <td>
                                                {complaint.title}
                                            </td>

                                            <td>
                                                {complaint.category}
                                            </td>

                                            <td>
                                                {complaint.location}
                                            </td>

                                            <td>

                                                <span
                                                    className={`status-badge status-${complaint.status?.toLowerCase()}`}
                                                >
                                                    {complaint.status}
                                                </span>

                                            </td>

                                            <td>

                                                <span
                                                    className={`priority-badge priority-${complaint.priority?.toLowerCase()}`}
                                                >
                                                    {complaint.priority}
                                                </span>

                                            </td>

                                            <td>
                                                {complaint.createdAt}
                                            </td>

                                            <td>

                                                <button
                                                    type="button"
                                                    className="view-complaint-button"
                                                >
                                                    View
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}

export default AdminComplaints;