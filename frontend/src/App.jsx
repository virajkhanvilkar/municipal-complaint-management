import { BrowserRouter, Routes, Route } from "react-router-dom";

// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageComplaints from "./pages/admin/ManageComplaints";
import ManageUsers from "./pages/admin/ManageUsers";
import AdminProfile from "./pages/admin/Profile";

// Citizen
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import CreateComplaint from "./pages/citizen/CreateComplaint";
import MyComplaints from "./pages/citizen/MyComplaints";
import CitizenProfile from "./pages/citizen/Profile";

// Employee
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import AssignedComplaints from "./pages/employee/AssignedComplaints";
import UpdateComplaint from "./pages/employee/UpdateComplaint";
import EmployeeProfile from "./pages/employee/Profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* ================= AUTH ================= */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* ================= ADMIN ================= */}

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/dashboard"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/complaints"
                    element={<ManageComplaints />}
                />

                <Route
                    path="/admin/users"
                    element={<ManageUsers />}
                />

                <Route
                    path="/admin/profile"
                    element={<AdminProfile />}
                />


                {/* ================= CITIZEN ================= */}

                <Route
                    path="/dashboard"
                    element={<CitizenDashboard />}
                />

                <Route
                    path="/citizen/create-complaint"
                    element={<CreateComplaint />}
                />

                <Route
                    path="/citizen/my-complaints"
                    element={<MyComplaints />}
                />

                <Route
                    path="/citizen/profile"
                    element={<CitizenProfile />}
                />


                {/* ================= EMPLOYEE ================= */}

                <Route
                    path="/employee"
                    element={<EmployeeDashboard />}
                />

                <Route
                    path="/employee/complaints"
                    element={<AssignedComplaints />}
                />

                <Route
                    path="/employee/update-complaint"
                    element={<UpdateComplaint />}
                />

                <Route
                    path="/employee/profile"
                    element={<EmployeeProfile />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;