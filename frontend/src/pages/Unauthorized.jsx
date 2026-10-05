import { Link } from "react-router-dom";

function Unauthorized() {
    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>403 - Access Denied</h1>

            <p>
                You do not have permission to access this page.
            </p>

            <Link to="/">
                Go Back
            </Link>
        </div>
    );
}

export default Unauthorized;