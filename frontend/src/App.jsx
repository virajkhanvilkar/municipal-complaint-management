import { BrowserRouter, Routes, Route } from "react-router-dom";

// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

// Route Security
import ProtectedRoute from "./components/ProtectedRoute";

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

                <Route
                    path="/unauthorized"
                    element={<Unauthorized />}
                />


                {/* ================= ADMIN ================= */}

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/complaints"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <ManageComplaints />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <ManageUsers />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/profile"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <AdminProfile />
                        </ProtectedRoute>
                    }
                />


                {/* ================= CITIZEN ================= */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["CITIZEN"]}>
                            <CitizenDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/citizen/create-complaint"
                    element={
                        <ProtectedRoute allowedRoles={["CITIZEN"]}>
                            <CreateComplaint />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/citizen/my-complaints"
                    element={
                        <ProtectedRoute allowedRoles={["CITIZEN"]}>
                            <MyComplaints />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/citizen/profile"
                    element={
                        <ProtectedRoute allowedRoles={["CITIZEN"]}>
                            <CitizenProfile />
                        </ProtectedRoute>
                    }
                />


                {/* ================= EMPLOYEE ================= */}

                <Route
                    path="/employee"
                    element={
                        <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                            <EmployeeDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employee/complaints"
                    element={
                        <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                            <AssignedComplaints />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employee/update-complaint"
                    element={
                        <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                            <UpdateComplaint />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employee/profile"
                    element={
                        <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                            <EmployeeProfile />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;