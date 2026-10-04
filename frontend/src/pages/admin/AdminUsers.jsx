import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminUsers.css";

const initialUsers = [
    {
        id: 1,
        name: "Rahul Patil",
        email: "rahul.patil@gmail.com",
        phone: "9876543210",
        role: "CITIZEN",
        active: true
    },
    {
        id: 2,
        name: "Sneha Kulkarni",
        email: "sneha.kulkarni@gmail.com",
        phone: "9876543211",
        role: "CITIZEN",
        active: true
    },
    {
        id: 3,
        name: "Amit Jadhav",
        email: "amit.jadhav@pmc.gov.in",
        phone: "9876543212",
        role: "EMPLOYEE",
        active: true
    },
    {
        id: 4,
        name: "Priya Deshmukh",
        email: "priya.deshmukh@pmc.gov.in",
        phone: "9876543213",
        role: "EMPLOYEE",
        active: false
    },
    {
        id: 5,
        name: "Admin",
        email: "admin@pmc.gov.in",
        phone: "9876543214",
        role: "ADMIN",
        active: true
    }
];

function AdminUsers() {

    const [users, setUsers] = useState(initialUsers);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {

            const searchText = search.toLowerCase();

            const matchesSearch =
                user.name.toLowerCase().includes(searchText) ||
                user.email.toLowerCase().includes(searchText) ||
                user.phone.includes(searchText);

            const matchesRole =
                roleFilter === "ALL" ||
                user.role === roleFilter;

            const matchesStatus =
                statusFilter === "ALL" ||
                (statusFilter === "ACTIVE" && user.active) ||
                (statusFilter === "INACTIVE" && !user.active);

            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users, search, roleFilter, statusFilter]);

    const totalUsers = users.length;

    const citizens = users.filter(
        (user) => user.role === "CITIZEN"
    ).length;

    const employees = users.filter(
        (user) => user.role === "EMPLOYEE"
    ).length;

    const activeUsers = users.filter(
        (user) => user.active
    ).length;

    const toggleUserStatus = (id) => {
        setUsers((currentUsers) =>
            currentUsers.map((user) =>
                user.id === id
                    ? { ...user, active: !user.active }
                    : user
            )
        );
    };

    return (
        <div className="admin-page">

            {/* HEADER */}
            <header className="admin-header">

                <div className="admin-brand">

                    <div className="admin-brand-icon">
                        🏛️
                    </div>

                    <div>
                        <h1>Manage Users</h1>
                        <p>
                            Municipal Complaint Management System
                        </p>
                    </div>

                </div>

                <nav className="admin-nav">

                    <Link to="/admin">
                        Dashboard
                    </Link>

                    <Link to="/admin/complaints">
                        Complaints
                    </Link>

                    <Link
                        to="/admin/users"
                        className="active"
                    >
                        Users
                    </Link>

                    <Link to="/admin/profile">
                        Profile
                    </Link>

                </nav>

            </header>

            {/* MAIN */}
            <main className="admin-content">

                <div className="admin-welcome">

                    <h2>All Users</h2>

                    <p>
                        View and manage citizens, employees and administrators.
                    </p>

                </div>

                {/* STAT CARDS */}
                <div className="user-stats">

                    <div className="user-stat-card">
                        <div className="stat-icon purple">
                            👥
                        </div>

                        <div>
                            <span>Total Users</span>
                            <strong>{totalUsers}</strong>
                        </div>
                    </div>

                    <div className="user-stat-card">
                        <div className="stat-icon blue">
                            👤
                        </div>

                        <div>
                            <span>Citizens</span>
                            <strong>{citizens}</strong>
                        </div>
                    </div>

                    <div className="user-stat-card">
                        <div className="stat-icon orange">
                            👨‍💼
                        </div>

                        <div>
                            <span>Employees</span>
                            <strong>{employees}</strong>
                        </div>
                    </div>

                    <div className="user-stat-card">
                        <div className="stat-icon green">
                            ✓
                        </div>

                        <div>
                            <span>Active Users</span>
                            <strong>{activeUsers}</strong>
                        </div>
                    </div>

                </div>

                {/* USERS TABLE */}
                <section className="users-panel">

                    <div className="users-header">

                        <div>
                            <h2>User List</h2>

                            <p>
                                Registered users in the municipal complaint system.
                            </p>
                        </div>

                        <div className="user-filters">

                            <input
                                type="text"
                                placeholder="Search name, email or phone..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="user-search"
                            />

                            <select
                                value={roleFilter}
                                onChange={(e) =>
                                    setRoleFilter(e.target.value)
                                }
                            >
                                <option value="ALL">
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

                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                            >
                                <option value="ALL">
                                    All Status
                                </option>

                                <option value="ACTIVE">
                                    Active
                                </option>

                                <option value="INACTIVE">
                                    Inactive
                                </option>

                            </select>

                        </div>

                    </div>

                    <div className="users-count">
                        Showing <strong>{filteredUsers.length}</strong> of{" "}
                        <strong>{users.length}</strong> users
                    </div>

                    <div className="users-table-wrapper">

                        <table className="users-table">

                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredUsers.map((user) => (

                                    <tr key={user.id}>

                                        <td>
                                            <div className="user-name">

                                                <div className="user-avatar">
                                                    {user.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <strong>
                                                        {user.name}
                                                    </strong>

                                                    <small>
                                                        User ID #{user.id}
                                                    </small>
                                                </div>

                                            </div>
                                        </td>

                                        <td>
                                            {user.email}
                                        </td>

                                        <td>
                                            {user.phone}
                                        </td>

                                        <td>

                                            <span
                                                className={`role-badge ${user.role.toLowerCase()}`}
                                            >
                                                {user.role === "CITIZEN"
                                                    ? "Citizen"
                                                    : user.role === "EMPLOYEE"
                                                    ? "Employee"
                                                    : "Admin"}
                                            </span>

                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    user.active
                                                        ? "status active-status"
                                                        : "status inactive-status"
                                                }
                                            >
                                                ●{" "}
                                                {user.active
                                                    ? "ACTIVE"
                                                    : "INACTIVE"}
                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="view-user-btn"
                                                onClick={() =>
                                                    toggleUserStatus(user.id)
                                                }
                                            >
                                                {user.active
                                                    ? "Deactivate"
                                                    : "Activate"}
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                                {filteredUsers.length === 0 && (

                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="no-users"
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

export default AdminUsers;