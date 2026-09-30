import { useState } from "react";
import "./Login.css";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setMessage("");

        // Validation
        if (!name.trim()) {
            setError("Please enter your name.");
            return;
        }

        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        if (!phone.trim()) {
            setError("Please enter your phone number.");
            return;
        }

        if (!password.trim()) {
            setError("Please enter your password.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:8080/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phone: phone,
                        password: password,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {

                setMessage(
                    data.message || "Registration successful!"
                );

                console.log("Registered user:", data);

                // Clear form
                setName("");
                setEmail("");
                setPhone("");
                setPassword("");
                setConfirmPassword("");

            } else {

                setError(
                    data.message || "Registration failed."
                );
            }

        } catch (error) {

            console.error("Registration error:", error);

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

                    <h1>Municipal Complaint</h1>

                    <p>Management System</p>

                </div>


                {/* Register Form */}

                <form onSubmit={handleSubmit}>

                    {/* Error */}

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}


                    {/* Success */}

                    {message && (
                        <div className="success-message">
                            {message}
                        </div>
                    )}


                    {/* Name */}

                    <div className="form-group">

                        <label htmlFor="name">
                            Full Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                    </div>


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


                    {/* Phone */}

                    <div className="form-group">

                        <label htmlFor="phone">
                            Phone Number
                        </label>

                        <input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)
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


                    {/* Confirm Password */}

                    <div className="form-group">

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <div className="password-container">

                            <input
                                id="confirmPassword"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                className="show-password"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                            >
                                {showConfirmPassword
                                    ? "Hide"
                                    : "Show"}
                            </button>

                        </div>

                    </div>


                    {/* Register */}

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Create Account
                    </button>

                </form>


                {/* Login */}

                <div className="register-section">

                    <p>

                        Already have an account?

                        <a href="/">
                            {" "}Sign In
                        </a>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;