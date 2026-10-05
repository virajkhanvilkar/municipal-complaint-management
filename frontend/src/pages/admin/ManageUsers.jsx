import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./admin.css";

function ManageUsers() {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Rahul Patil",
            email: "rahul.patil@example.com",
            role: "CITIZEN",
            status: "Active",
        },
        {
            id: 2,
            name: "Sneha Joshi",
            email: "sneha.joshi@example.com",
            role: "CITIZEN",
            status: "Active",
        },
        {
            id: 3,
            name: "Amit Shinde",
            email: "amit.shinde@example.com",
            role: "EMPLOYEE",
            status: "Active",
        },
        {
            id: 4,
            name: "Priya Kulkarni",
            email: "priya.kulkarni@example.com",
            role: "CITIZEN",
            status: "Inactive",
        },
        {
            id: 5,
            name: "Vishal More",
            email: "vishal.more@example.com",
            role: "EMPLOYEE",
            status: "Active",
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");

    const handleStatusToggle = (userId) => {
        setUsers((currentUsers) =>
            currentUsers.map((user) =>
                user.id === userId
                    ? {
                          ...user,
                          status:
                              user.status === "Active"
                                  ? "Inactive"
                                  : "Active",
                      }
                    : user
            )
        );
    };

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const search = searchTerm.toLowerCase().trim();

            const matchesSearch =
                user.name.toLowerCase().includes(search) ||
                user.email.toLowerCase().includes(search);

            const matchesRole =
                roleFilter === "All" ||
                user.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [users, searchTerm, roleFilter]);

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

                    <h2>Manage Users</h2>

                    <p>
                        View users and manage their account status.
                    </p>

                </section>


                {/* ================= FILTERS ================= */}

                <section className="admin-filter-section">

                    <div className="admin-search">

                        <label htmlFor="user-search">
                            Search
                        </label>

                        <input
                            id="user-search"
                            type="text"
                            placeholder="Search by name or email"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                        />

                    </div>


                    <div className="admin-filter">

                        <label htmlFor="role-filter">
                            Role
                        </label>

                        <select
                            id="role-filter"
                            value={roleFilter}
                            onChange={(e) =>
                                setRoleFilter(e.target.value)
                            }
                        >

                            <option value="All">
                                All Roles
                            </option>

                            <option value="CITIZEN">
                                Citizen
                            </option>

                            <option value="EMPLOYEE">
                                Employee
                            </option>

                            <option value="ADMIN">
                                Admin
                            </option>

                        </select>

                    </div>

                </section>


                {/* ================= USER TABLE ================= */}

                <section className="admin-table-card">

                    <div className="admin-table-header">

                        <div>
                            <h3>Users</h3>

                            <p>
                                Showing {filteredUsers.length} of{" "}
                                {users.length} users
                            </p>
                        </div>

                    </div>


                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>

                            </thead>


                            <tbody>

                                {filteredUsers.length > 0 ? (

                                    filteredUsers.map((user) => (

                                        <tr key={user.id}>

                                            <td>
                                                <strong>
                                                    {user.name}
                                                </strong>
                                            </td>

                                            <td>
                                                {user.email}
                                            </td>

                                            <td>

                                                <span className="admin-role">
                                                    {user.role}
                                                </span>

                                            </td>

                                            <td>

                                                <span
                                                    className={`admin-user-status ${
                                                        user.status ===
                                                        "Active"
                                                            ? "active"
                                                            : "inactive"
                                                    }`}
                                                >
                                                    {user.status}
                                                </span>

                                            </td>

                                            <td>

                                                <button
                                                    type="button"
                                                    className={`admin-user-toggle ${
                                                        user.status ===
                                                        "Active"
                                                            ? "deactivate"
                                                            : "activate"
                                                    }`}
                                                    onClick={() =>
                                                        handleStatusToggle(
                                                            user.id
                                                        )
                                                    }
                                                >
                                                    {user.status ===
                                                    "Active"
                                                        ? "Deactivate"
                                                        : "Activate"}
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="admin-no-results"
                                        >
                                            No users found.
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

export default ManageUsers;