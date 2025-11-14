"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {auth} from "../../utils/api.js"

export default function LoginPage() {
    const router= useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError("") // clear out any errors if the user starts to type
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await auth.login(formData.email, formData.password);

            localStorage.setItem("token", res.token);
            localStorage.setItem("userId", res.id);
            const userData = { 
                name: res.name, 
                email: formData.email,
                username: res.username,
                id: res.id 
            };
            localStorage.setItem("user", JSON.stringify(userData));

            router.push("/home") //push to home page
        } catch (err) {
            console.error("Login error:", err);
            
            if (err && 'status' in err) {
            const statusError = err;

                if(statusError.status === 401) {
                    setError("Invalid Email or password")
                }
                if(statusError.status === 0) {
                    setError("Network error. Please check your connection.")
                }
                else {
                    console.log(statusError)
                    logger.info("Login error:", statusError);
                    //setError("Something went wrong. Please try again")
                }
            }
        } finally {
            setLoading(false) //after everything is handled, finish the loading animation
        }
    }

    return (
        <div className="w-screen h-screen bg-black flex items-center justify-center">
        <div className="glass-card p-10 w-96 flex flex-col items-center justify-center">
            <h2 className="text-purple-800 text-2xl font-bold mb-8 text-center">
            Login to Pro-Cat
            </h2>
            <form className="flex flex-col gap-6 w-full" onSubmit={handleLogin}>
            <div className="relative">
                <input
                name="email"
                type="text"
                placeholder="EMAIL"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full p-3 bg-transparent border-b-2 border-gray-500 text-white outline-none"
                />
            </div>

                        <div className="relative">
                                <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="PASSWORD"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                //disabled={loading}
                                className="w-full p-3 pr-10 bg-transparent border-b-2 border-gray-500 text-white outline-none"
                                />
                                <button
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 p-1"
                                >
                                    {showPassword ? (
                                        // Eye with slash
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                                            <path d="M3 3l18 18" />
                                            <path d="M10.58 10.58A3 3 0 0 0 12 15a3 3 0 0 0 2.42-4.42" />
                                            <path d="M9.88 5.09A10.46 10.46 0 0 1 12 5c5 0 9 4 10 7-.
                                            27.76-.76 1.5-1.38 2.2M6.61 6.61C4.6 7.76 3.06 9.52 2 12c1 3 5 7 10 7 1.3 0 2.55-.25 3.7-.7" />
                                        </svg>
                                    ) : (
                                        // Eye
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    )}
                                </button>
                        </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button 
                type="submit"
                disabled={loading}
                className="bg-purple-500 text-violet-900 font-bold py-3 rounded-lg hover:bg-purple-400 cursor-pointer transition transform hover:scale-105">
                {loading ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-800 mr-2"></div>
                    Signing in...
                </div>
                ) : (
                "Sign In"
                )}
            </button>
            </form>

            <p className="text-gray-400 mt-4 hover:text-purple-600 cursor-pointer">
            <Link href="/register">
            New to Pro-Cat? Register Here!
            </Link>
            </p>
        </div>
        </div>
    );
}

