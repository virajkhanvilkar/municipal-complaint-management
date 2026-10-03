import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import AssignedComplaints from "./pages/employee/AssignedComplaints";
import UpdateComplaint from "./pages/employee/UpdateComplaint";
import EmployeeProfile from "./pages/employee/Profile";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/employee" element={<EmployeeDashboard />} />
<Route path="/employee/complaints" element={<AssignedComplaints />} />
<Route path="/employee/update-complaint" element={<UpdateComplaint />} />
<Route path="/employee/profile" element={<EmployeeProfile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;