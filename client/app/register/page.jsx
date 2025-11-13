"use client"

import { useState} from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { auth } from "../../utils/api.js"

export default function RegisterPage() {
    const router = useRouter()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
    const [formData, setFormData] = useState({
        name:"",
        email: "",
        password: "",
        confirmPassword:""
    })
    const [success, setSuccess] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }))

        console.log(formData)
        if (error) setError("")  //clear out any errors if the user starts to type
        if (success) setSuccess("")
    }

    const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    return true;
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true)
    setError("")

    try {
      console.log("payload:",formData)
      const res = await auth.register(formData.name,formData.email, formData.password);
      setSuccess("Account created successfully! Redirecting to login...")

      setTimeout(() => {
        router.push("/login");
      }, 2000);
      
    } catch(err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <div className="glass-card p-10 w-96 flex flex-col items-center justify-center">
          <h2 className="text-purple-800 text-2xl font-bold mb-8 text-center">
            Register to Pro-Cat
          </h2>
          <form className="flex flex-col gap-6 w-full" onSubmit={handleRegister}>
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="NAME"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full p-3 bg-transparent border-b-2 border-gray-500 text-white outline-none"
              />
            </div>

            <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-transparent border-b-2 border-gray-500 text-white outline-none"
              />  
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="PASSWORD"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full p-3 pr-10 bg-transparent border-b-2 border-gray-500 text-white outline-none"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 p-1"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c1.61 0 3.14.37 4.5 1.03" />
                    <path d="M21.542 12C20.268 16.057 16.477 19 12 19c-1.61 0-3.14-.37-4.5-1.03" />
                    <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-5.12" />
                    <path d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="CONFIRM PASSWORD"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full p-3 pr-10 bg-transparent border-b-2 border-gray-500 text-white outline-none"
              />
              <button
                type="button"
                aria-label={showConfirm ? "Hide password" : "Show password"}
                onClick={() => setShowConfirm(v => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 p-1"
              >
                {showConfirm ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c1.61 0 3.14.37 4.5 1.03" />
                    <path d="M21.542 12C20.268 16.057 16.477 19 12 19c-1.61 0-3.14-.37-4.5-1.03" />
                    <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-5.12" />
                    <path d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className = "text-green-400 text-sm">{success}</p>}

            <button 
              type="submit"
              disabled={loading}
              className="bg-purple-500 text-violet-900 font-bold py-3 rounded-lg hover:bg-purple-400 cursor-pointer transition transform hover:scale-105">
              {loading ? (
                <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
                Creating account...
              </div>
              ):(
                "Sign Up"
              )}
            </button>
          </form>
          <p className="text-gray-400 mt-4 hover:text-purple-600 cursor-pointer">
            <Link href="/login">
            Already a Pro-Cat user? Login Here!
            </Link>
          </p>
        </div>
      </div>
    )

}