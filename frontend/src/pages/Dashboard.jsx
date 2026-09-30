import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {

        // Remove logged-in user
        localStorage.removeItem("user");

        // Go back to login
        navigate("/login");
    };

    return (
        <div>

            <h1>Municipal Complaint Management System</h1>

            <h2>Dashboard</h2>

            <p>Welcome to the dashboard!</p>

            <button onClick={handleLogout}>
                Logout
            </button>

        </div>
    );
}

export default Dashboard;