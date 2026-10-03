import { BrowserRouter, Routes, Route } from "react-router-dom";

// Authentication
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin
import Dashboard from "./pages/Dashboard";

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

                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />


                {/* ================= ADMIN ================= */}

                <Route
                    path="/admin"
                    element={<Dashboard />}
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