import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useStore } from "../stores/RootStore";
import type { UserRole } from "../types";

const ROLES: UserRole[] = ["MANAGER", "TEAMLEADER", "FLOORSTAFF"];

const LoginPage = observer(() => {
    const { authStore } = useStore();
    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState<UserRole>("FLOORSTAFF");
    const [success, setSuccess] = useState("");

    const resetForm = () => {
        setUsername("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setRole("FLOORSTAFF");
        setSuccess("");
        authStore.setError(null);
    };

    const handleToggle = () => {
        setIsRegister((prev) => !prev);
        resetForm();
    };

    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await authStore.login(username, password);
        if (authStore.isAuthenticated) {
            setSuccess("Login successful! Redirecting...");
            setTimeout(() => {
                navigate("/movies");
            }, 500);
        }
    };

    const handleRegister = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await authStore.register(
                username,
                password,
                role,
                firstName,
                lastName,
            );
            setSuccess(
                "Account created successfully!",
            );
            setTimeout(() => {
                resetForm(); 
                setIsRegister(false);
            }, 500);
        } catch {
            // error แสดงจาก authStore.error อยู่แล้ว
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                {/* Header */}
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
                    Movie Management
                </h1>
                <p className="text-center text-sm text-gray-500 mb-6">
                    {isRegister
                        ? "Create a new account"
                        : "Sign in to your account"}
                </p>

                {/* Success */}
                {success && (
                    <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4 text-sm">
                        {success}
                    </div>
                )}

                {/* Error */}
                {authStore.error && (
                    <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                        {authStore.error}
                    </div>
                )}

                {/* Form */}
                <form
                    onSubmit={isRegister ? handleRegister : handleLogin}
                    className="flex flex-col gap-4"
                >
                    {isRegister && (
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="First name"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Last name"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Username */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter username"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {/* Role — เฉพาะตอน Register */}
                    {isRegister && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Role
                            </label>
                            <select
                                value={role}
                                onChange={(e) =>
                                    setRole(e.target.value as UserRole)
                                }
                                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {ROLES.map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={authStore.isLoading}
                        className="w-full bg-gray-800 text-white py-2 rounded font-medium hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {authStore.isLoading
                            ? isRegister
                                ? "Creating..."
                                : "Signing in..."
                            : isRegister
                              ? "Sign up"
                              : "Sign in"}
                    </button>
                </form>

                {/* Toggle */}
                <p className="text-center text-sm text-gray-500 mt-4">
                    {isRegister
                        ? "Already have an account?"
                        : "Don't have an account?"}
                    <button
                        onClick={handleToggle}
                        className="ml-1 text-blue-600 hover:underline font-medium"
                    >
                        {isRegister ? "Sign in" : "Sign up"}
                    </button>
                </p>
            </div>
        </div>
    );
});

export default LoginPage;
