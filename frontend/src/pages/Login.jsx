import { useState } from "react";
import "./Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setMessage("");

        // Email validation
        if (!email.trim()) {
            setError("Please enter email.");
            return;
        }

        // Password validation
        if (!password.trim()) {
            setError("Please enter password.");
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                }
            );

            const data = await response.json();

            console.log("Login response:", data);

            // Login successful
            if (response.ok) {

                console.log("Logged-in user:", data);

                // Get role from backend
                const role = data.role?.toUpperCase();

                console.log("User role:", role);

                // Check whether valid role exists
                if (
                    role !== "ADMIN" &&
                    role !== "EMPLOYEE" &&
                    role !== "CITIZEN"
                ) {
                    setError("Invalid user role. Please contact administrator.");
                    return;
                }

                // Save user information with normalized role
                const userData = {
                    ...data,
                    role: role
                };

                localStorage.setItem(
                    "user",
                    JSON.stringify(userData)
                );

                setMessage(
                    data.message || "Login successful!"
                );

                // Redirect based on role
                setTimeout(() => {

                    if (role === "EMPLOYEE") {

                        window.location.href = "/employee";

                    }
                    else if (role === "ADMIN") {

                        window.location.href = "/admin";

                    }
                    else if (role === "CITIZEN") {

                        window.location.href = "/dashboard";

                    }

                }, 500);

            } else {

                // Login failed
                setError(
                    data.message ||
                    "Invalid email or password."
                );
            }

        } catch (error) {

            console.error("Login error:", error);

            setError(
                "Cannot connect to Spring Boot server."
            );
        }
    };

    return (

        <div className="login-page">

            <div className="login-card">

                {/* Header */}

                <div className="login-header">

                    <div className="logo">
                        🏛️
                    </div>

                    <h1>
                        Municipal Complaint
                    </h1>

                    <p>
                        Management System
                    </p>

                </div>


                {/* Login Form */}

                <form onSubmit={handleSubmit}>

                    {/* Error message */}

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}


                    {/* Success message */}

                    {message && (
                        <div className="success-message">
                            {message}
                        </div>
                    )}


                    {/* Email */}

                    <div className="form-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                    </div>


                    {/* Password */}

                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="password-container">

                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                            <button
                                type="button"
                                className="show-password"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >
                                {showPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>

                    </div>


                    {/* Login options */}

                    <div className="login-options">

                        <label>

                            <input
                                type="checkbox"
                            />

                            Remember me

                        </label>

                        <a href="#forgot">
                            Forgot password?
                        </a>

                    </div>


                    {/* Sign in */}

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Sign In
                    </button>

                </form>


                {/* Register */}

                <div className="register-section">

                    <p>

                        Don't have an account?

                        <a href="/register">
                            {" "}Register
                        </a>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;