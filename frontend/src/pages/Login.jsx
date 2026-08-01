import React, { useState } from "react";
import { authService } from "../services/AuthService";

function Login({ onAuthSuccess, showNotification }) {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("User");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isLoginMode) {
                const response = await authService.login(username, password);
                if (response.success) {
                    showNotification("🔑 Login successful! Welcome back.", "success");
                    onAuthSuccess(response.user);
                } else {
                    setError(response.message || "Failed to log in");
                }
            } else {
                const response = await authService.register(username, email, password, role);
                if (response.success) {
                    showNotification("🎉 Registration successful! Please log in.", "success");
                    setIsLoginMode(true);
                    setPassword("");
                    setError("");
                } else {
                    setError(response.message || "Failed to register");
                }
            }
        } catch (err) {
            console.error("Auth error:", err);
            setError(
                err.response?.data?.message || 
                "Could not connect to authentication server. Please ensure the backend is running."
            );
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setUsername("");
        setEmail("");
        setPassword("");
        setError("");
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl overflow-hidden p-8 transition-all duration-300">
                <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 rounded-2xl text-3xl mb-3 shadow-inner">
                        🛡️
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        {isLoginMode ? "Sign In" : "Register"}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                        {isLoginMode 
                            ? "Access your employee & inventory system" 
                            : "Create an administrator or staff profile"
                        }
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-800/30 text-rose-600 dark:text-rose-400 rounded-xl text-sm font-semibold flex items-center gap-2">
                        <span>⚠️</span>
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Username
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-600 text-sm transition-all"
                        />
                    </div>

                    {!isLoginMode && (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-600 text-sm transition-all"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-600 text-sm transition-all"
                        />
                    </div>

                    {!isLoginMode && (
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Organization Role
                            </label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-600 text-sm transition-all"
                            >
                                <option value="User">Standard User</option>
                                <option value="Manager">Manager</option>
                                <option value="Admin">Administrator</option>
                            </select>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3.5 mt-2 rounded-xl text-white font-bold text-sm tracking-wide shadow-lg transition-all duration-300 cursor-pointer ${
                            loading 
                                ? "bg-violet-400 dark:bg-violet-700 cursor-not-allowed" 
                                : "bg-violet-600 hover:bg-violet-700 hover:shadow-violet-500/20 active:scale-[0.98]"
                        }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Authenticating...
                            </span>
                        ) : (
                            isLoginMode ? "Sign In" : "Register Account"
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {isLoginMode ? "New to the platform?" : "Already have an account?"}{" "}
                        <button
                            onClick={toggleMode}
                            className="font-bold text-violet-600 dark:text-violet-400 hover:underline cursor-pointer"
                        >
                            {isLoginMode ? "Register profile" : "Sign in here"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
