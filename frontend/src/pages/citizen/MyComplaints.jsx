import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./citizen.css";

function MyComplaints() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user")) || {};

    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(() => !user?.id);

    const [error, setError] = useState(() =>
        !user?.id
            ? "Citizen information not found. Please login again."
            : ""
    );

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");


    // =========================================================
    // FETCH CITIZEN COMPLAINTS
    // =========================================================

    useEffect(() => {

        if (!user?.id) {
            return;
        }

        const fetchComplaints = async () => {

            try {

                const response = await fetch(
                    `http://localhost:8080/api/citizen/${user.id}/complaints`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch complaints"
                    );
                }

                setComplaints(data);
                setError("");

            } catch (error) {

                console.error(
                    "Error fetching complaints:",
                    error
                );

                setError(
                    error.message || "Failed to fetch complaints"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchComplaints();

    }, [user.id]);


    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/login");

    };


    // =========================================================
    // STATUS CSS
    // =========================================================

    const getStatusClass = (status) => {

        const normalizedStatus = status?.toUpperCase();

        if (normalizedStatus === "PENDING") {
            return "status-pending";
        }

        if (
            normalizedStatus === "IN_PROGRESS" ||
            normalizedStatus === "IN PROGRESS"
        ) {
            return "status-progress";
        }

        if (normalizedStatus === "RESOLVED") {
            return "status-resolved";
        }

        return "status-pending";
    };


    // =========================================================
    // DATE FORMAT
    // =========================================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };


    // =========================================================
    // FILTER COMPLAINTS
    // =========================================================

    const filteredComplaints = complaints.filter((complaint) => {

        const complaintId =
            `CMP${String(complaint.id).padStart(3, "0")}`;

        const description =
            complaint.description || "";

        const category =
            complaint.category || "";

        const location =
            complaint.location || "";

        const searchText =
            search.toLowerCase();

        const matchesSearch =
            complaintId
                .toLowerCase()
                .includes(searchText) ||

            description
                .toLowerCase()
                .includes(searchText) ||

            category
                .toLowerCase()
                .includes(searchText) ||

            location
                .toLowerCase()
                .includes(searchText);


        const normalizedStatus =
            complaint.status?.toUpperCase();

        const matchesFilter =
            filter === "All" ||
            normalizedStatus === filter.toUpperCase();


        return matchesSearch && matchesFilter;

    });


    // =========================================================
    // STATISTICS
    // =========================================================

    const totalComplaints =
        complaints.length;


    const pendingComplaints =
        complaints.filter(
            (complaint) =>
                complaint.status?.toUpperCase() === "PENDING"
        ).length;


    const inProgressComplaints =
        complaints.filter(
            (complaint) =>
                complaint.status?.toUpperCase() === "IN_PROGRESS" ||
                complaint.status?.toUpperCase() === "IN PROGRESS"
        ).length;


    const resolvedComplaints =
        complaints.filter(
            (complaint) =>
                complaint.status?.toUpperCase() === "RESOLVED"
        ).length;


    // =========================================================
    // UI
    // =========================================================

    return (

        <div className="citizen-app">


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="citizen-sidebar">

                <div className="citizen-brand">

                    <h2>
                        🏛 CityConnect
                    </h2>

                    <p>
                        Municipal Citizen Portal
                    </p>

                </div>


                <nav className="citizen-nav">


                    {/* Dashboard */}

                    <a
                        href="#dashboard"
                        onClick={(e) => {

                            e.preventDefault();

                            navigate("/dashboard");

                        }}
                    >
                        🏠 Dashboard
                    </a>


                    {/* Create Complaint */}

                    <a
                        href="#create"
                        onClick={(e) => {

                            e.preventDefault();

                            navigate(
                                "/citizen/create-complaint"
                            );

                        }}
                    >
                        📝 Create Complaint
                    </a>


                    {/* My Complaints */}

                    <a
                        href="#complaints"
                        className="active"
                        onClick={(e) =>
                            e.preventDefault()
                        }
                    >
                        📋 My Complaints
                    </a>


                    {/* Profile */}

                    <a
                        href="#profile"
                        onClick={(e) => {

                            e.preventDefault();

                            navigate(
                                "/citizen/profile"
                            );

                        }}
                    >
                        👤 My Profile
                    </a>

                </nav>


                {/* Logout */}

                <div
                    style={{
                        marginTop: "50px"
                    }}
                >

                    <button
                        className="citizen-btn citizen-btn-secondary"
                        style={{
                            width: "100%"
                        }}
                        onClick={handleLogout}
                    >
                        ↪ Logout
                    </button>

                </div>

            </aside>



            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <main className="citizen-main">


                {/* =================================================
                    TOP HEADER
                ================================================= */}

                <div className="citizen-topbar">

                    <div>

                        <h1>
                            My Complaints
                        </h1>

                        <p>
                            View and track the progress of your complaints.
                        </p>

                    </div>


                    <div className="citizen-user">

                        👤 {user.name || "Citizen"}

                    </div>

                </div>



                {/* =================================================
                    SUMMARY CARDS
                ================================================= */}

                {!loading && !error && (

                    <div className="citizen-stats">


                        {/* Total */}

                        <div className="citizen-stat-card stat-blue">

                            <p>
                                Total Complaints
                            </p>

                            <h2>
                                {totalComplaints}
                            </h2>

                            <span>
                                All submitted complaints
                            </span>

                        </div>


                        {/* Pending */}

                        <div className="citizen-stat-card stat-orange">

                            <p>
                                Pending
                            </p>

                            <h2>
                                {pendingComplaints}
                            </h2>

                            <span>
                                Awaiting action
                            </span>

                        </div>


                        {/* In Progress */}

                        <div className="citizen-stat-card stat-purple">

                            <p>
                                In Progress
                            </p>

                            <h2>
                                {inProgressComplaints}
                            </h2>

                            <span>
                                Currently being addressed
                            </span>

                        </div>


                        {/* Resolved */}

                        <div className="citizen-stat-card stat-green">

                            <p>
                                Resolved
                            </p>

                            <h2>
                                {resolvedComplaints}
                            </h2>

                            <span>
                                Successfully completed
                            </span>

                        </div>

                    </div>

                )}



                {/* =================================================
                    LOADING
                ================================================= */}

                {loading && (

                    <div className="citizen-panel">

                        <p>
                            Loading your complaints...
                        </p>

                    </div>

                )}



                {/* =================================================
                    ERROR
                ================================================= */}

                {error && !loading && (

                    <div className="citizen-panel">

                        <p
                            style={{
                                color: "red"
                            }}
                        >
                            {error}
                        </p>

                    </div>

                )}



                {/* =================================================
                    COMPLAINT DATA
                ================================================= */}

                {!loading && !error && (

                    <div className="citizen-panel">


                        <h3>
                            Complaint History
                        </h3>


                        {/* =================================================
                            SEARCH AND FILTER
                        ================================================= */}

                        <div
                            style={{
                                display: "flex",
                                gap: "15px",
                                flexWrap: "wrap",
                                marginBottom: "22px"
                            }}
                        >


                            {/* Search */}

                            <input
                                type="text"
                                placeholder="Search by ID, description, category or location..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                style={{
                                    flex: "1",
                                    minWidth: "220px",
                                    padding: "12px",
                                    border: "1px solid #dce3ed",
                                    borderRadius: "7px"
                                }}
                            />


                            {/* Filter */}

                            <select
                                value={filter}
                                onChange={(e) =>
                                    setFilter(e.target.value)
                                }
                                style={{
                                    padding: "12px",
                                    border: "1px solid #dce3ed",
                                    borderRadius: "7px"
                                }}
                            >

                                <option value="All">
                                    All Status
                                </option>

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

                        </div>



                        {/* =================================================
                            COMPLAINT TABLE
                        ================================================= */}

                        <table className="citizen-table">

                            <thead>

                                <tr>

                                    <th>
                                        Complaint ID
                                    </th>

                                    <th>
                                        Description
                                    </th>

                                    <th>
                                        Category
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Location
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredComplaints.length > 0 ? (

                                    filteredComplaints.map(
                                        (complaint) => (

                                            <tr
                                                key={complaint.id}
                                            >


                                                {/* Complaint ID */}

                                                <td>

                                                    CMP
                                                    {String(
                                                        complaint.id
                                                    ).padStart(
                                                        3,
                                                        "0"
                                                    )}

                                                </td>


                                                {/* Description */}

                                                <td>

                                                    {complaint.description ||
                                                        "-"}

                                                </td>


                                                {/* Category */}

                                                <td>

                                                    {complaint.category ||
                                                        "-"}

                                                </td>


                                                {/* Date */}

                                                <td>

                                                    {formatDate(
                                                        complaint.createdAt
                                                    )}

                                                </td>


                                                {/* Location */}

                                                <td>

                                                    {complaint.location ||
                                                        "-"}

                                                </td>


                                                {/* Status */}

                                                <td>

                                                    <span
                                                        className={`citizen-status ${getStatusClass(
                                                            complaint.status
                                                        )}`}
                                                    >

                                                        {complaint.status ||
                                                            "PENDING"}

                                                    </span>

                                                </td>

                                            </tr>

                                        )
                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            style={{
                                                textAlign: "center",
                                                padding: "30px"
                                            }}
                                        >

                                            No complaints found.

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>


                    </div>

                )}



                {/* =================================================
                    FOOTER
                ================================================= */}

                <p
                    style={{
                        textAlign: "center",
                        color: "#8290a3",
                        fontSize: "12px",
                        marginTop: "30px"
                    }}
                >
                    © 2026 CityConnect | Municipal Complaint Management System
                </p>


            </main>

        </div>

    );
}


export default MyComplaints;