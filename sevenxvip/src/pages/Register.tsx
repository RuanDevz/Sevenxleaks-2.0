import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Helmet } from "react-helmet";

const Register = () => {
    const { theme } = useTheme();

    const [name, setName] = useState(""); // Added state for name
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
                name,
                email,
                password,
                vip: false,
                isAdmin: false
            });
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("email", email);

            const loginResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
                {
                    email,
                    password,
                }
            );

            const token = loginResponse.data.token;
            localStorage.setItem("Token", token);
            console.log("Logged in successfully with token:", token);

            window.location.href = "/";
        } catch (err: any) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage("There was an error registering. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dreamy-page flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="dreamy-form w-full max-w-md"
            >

<Helmet>
  <title>Sevenxleaks - Register</title>
  <link rel="canonical" href={`https://sevenxleaks.com/register`} />
</Helmet>
                <div className="flex justify-center mb-8">
                    <motion.div 
                        className="rounded-2xl p-4 bg-gradient-to-br from-red-500 to-red-600"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <LogIn className="w-8 h-8 text-white" />
                    </motion.div>
                </div>

                <h2 className="dreamy-form-title">
                    Create an Account
                </h2>
                <p className="dreamy-form-subtitle">
                    Please fill in the details to create a new account
                </p>

                {errorMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="dreamy-alert-error flex items-center gap-3"
                    >
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-medium">{errorMessage}</span>
                    </motion.div>
                )}

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <div className="relative">
                            <LogIn className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="dreamy-input block w-full pl-12 pr-4 text-gray-900 placeholder-gray-500"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="dreamy-input block w-full pl-12 pr-4 text-gray-900 placeholder-gray-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="dreamy-input block w-full pl-12 pr-4 text-gray-900 placeholder-gray-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="dreamy-input block w-full pl-12 pr-4 text-gray-900 placeholder-gray-500"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className={`dreamy-button w-full py-4 flex items-center justify-center gap-3 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </motion.button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-red-500 hover:text-red-600 transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;