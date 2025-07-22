import { SignupType } from "@mohit-kumar/common-zod-all";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
const url=import.meta.env.VITE_BACKEND_URL

const Signup = () => {
     const navigate = useNavigate()
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);
     const [postInputs , setPostInputs] = useState<SignupType>({
      name:"",
      password:"",
      email:""
     })

     // Basic form validation
     const validateForm = () => {
       if (!postInputs.name.trim()) {
         setError("Username is required");
         return false;
       }
       if (!postInputs.email.trim()) {
         setError("Email is required");
         return false;
       }
       if (!postInputs.email.includes('@')) {
         setError("Please enter a valid email address");
         return false;
       }
       if (postInputs.password.length < 6) {
         setError("Password must be at least 6 characters");
         return false;
       }
       setError(null);
       return true;
     };

     async function handleRequest(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();

      // Clear previous errors
      setError(null);

      // Validate form before submission
      if (!validateForm()) {
        return;
      }

      setLoading(true);
      try{
        const response = await axios.post(`${url}/api/v1/signup`, postInputs);
        const jwt = response.data.jwt;
        const name = response.data.name;
        const id = response.data.id;

        // Store authentication data
        localStorage.setItem("token", jwt);
        localStorage.setItem("name", name);
        localStorage.setItem("id", id);

        // Update loading state and navigate to blogs page
        console.log("Signup successful! Redirecting to blogs page...");

        // Important: Set loading to false before navigation
        setLoading(false);

        // Dispatch a custom event to notify components about auth change
        window.dispatchEvent(new Event('auth-change'));

        // Use a small timeout to ensure state updates before navigation
        setTimeout(() => {
          // Navigate directly to blogs page
          navigate("/blogs");
        }, 100);
      } catch(error: any) {
        setLoading(false);
        console.error("Signup error:", error);

        // Handle specific error responses from the server
        if (error.response) {
          console.error("Server response:", error.response.status, error.response.data);

          if (error.response.status === 409) {
            setError("This email is already registered. Please use a different email or sign in.");
          } else if (error.response.status === 500) {
            setError("Server error. Please try again later.");
          } else if (error.response.data && error.response.data.error) {
            // Display the error message from the server without the status code
            setError(`${error.response.data.error}`);
          } else {
            setError(`Registration failed. Please try again.`);
          }
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received:", error.request);
          setError("No response from server. Please check if the backend is running.");
        } else {
          // Error in setting up the request
          console.error("Request setup error:", error.message);
          setError(`Network error: ${error.message}`);
        }

        // Log additional details for debugging
        if (error.config) {
          console.log("Request URL:", error.config.url);
          console.log("Request method:", error.config.method);
          console.log("Request data:", error.config.data);
        }
      }
     }

    return (
      <div className="flex flex-col lg:flex-row h-screen">
             {loading ? (
        <Loader />
      ) : (
        <>
        {/* Form Section */}
        <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-12 w-full lg:w-1/2 bg-gradient-to-br from-indigo-50 via-slate-50 to-slate-100 py-8 lg:py-0">
        <div className="w-full max-w-md sm:max-w-lg lg:w-[450px] shadow-xl rounded-xl p-6 sm:p-8 mx-auto bg-white border border-indigo-100">
  <h1 className="text-2xl sm:text-3xl font-bold text-center font-serif">
    <span className="bg-gradient-to-r from-indigo-950 to-purple-900 text-transparent bg-clip-text">Join BlogNest</span>
  </h1>
  <form className="mt-4 sm:mt-6 space-y-4" onSubmit={handleRequest}>
    {error && (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 mb-4">
        <p className="text-sm font-medium">{error}</p>
      </div>
    )}
    <div className="mb-4">
      <label className="block text-base sm:text-lg font-medium font-serif text-indigo-950">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Enter your username"
        value={postInputs.name}
        className="mt-1 w-full px-3 py-2 sm:py-3 border border-indigo-200 rounded-lg shadow-sm text-base sm:text-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-indigo-950 transition-all duration-200"
        onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            name:e.target.value
          })
          if (error) setError(null);
        }}
/>
    </div>
    <div className="mb-4">
      <label className="text-base sm:text-lg font-medium font-serif text-indigo-950">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        value={postInputs.email}
        className="mt-1 w-full px-3 py-2 sm:py-3 border border-indigo-200 rounded-lg shadow-sm text-base sm:text-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-indigo-950 transition-all duration-200"
        onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            email:e.target.value
          })
          if (error) setError(null);
        }}
      />
    </div>
    <div className="mb-6">
      <label className="text-base sm:text-lg font-medium font-serif text-indigo-950">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        value={postInputs.password}
        className="mt-1 w-full px-3 py-2 sm:py-3 border border-indigo-200 rounded-lg shadow-sm text-base sm:text-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-indigo-950 transition-all duration-200"
        onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            password:e.target.value
          })
          if (error) setError(null);
        }}
      />
      <p className="text-xs text-indigo-600 mt-1">Password must be at least 6 characters</p>
    </div>
    <button
      type="submit"
      className="w-full py-3 sm:py-4 px-4 mt-6 sm:mt-8 font-bold rounded-lg text-white bg-gradient-to-r from-indigo-950 to-purple-800 hover:from-indigo-900 hover:to-purple-700 text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg font-serif" >
      Sign Up
    </button>
    <p className="mt-4 text-base sm:text-lg font-medium text-center font-serif text-indigo-950">
    Already have an account? <a href="/signin" className="text-purple-700 font-bold hover:text-purple-900 transition-colors duration-200">Sign in</a>
  </p>
  </form>
</div>
</div>

        {/* Right Section - Info and Social Links */}
        <div className="flex-1 flex justify-center items-center bg-gradient-to-br from-indigo-950 to-purple-900 w-full lg:w-1/2 px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
          <div className="max-w-md p-4 sm:p-6 lg:p-8">
            <div className="mb-4 sm:mb-6 w-12 sm:w-16 h-1 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full"></div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-slate-50 mb-6 sm:mb-8 leading-relaxed">
              Step into a world of infinite possibilities. Launch your blogging journey with BlogNest and let your words shine like stars in the vast digital sky!
            </h1>
            <div className="mb-4 sm:mb-6 w-12 sm:w-16 h-1 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full"></div>
            <p className="text-lg sm:text-xl text-slate-50 mb-2 font-serif">
              <span className="bg-gradient-to-r from-indigo-200 to-purple-200 text-transparent bg-clip-text font-semibold">Mohit Kumar</span>
            </p>
            <p className="text-slate-300 text-base sm:text-lg font-serif mb-4 sm:mb-6">Passionate web developer, creating digital experiences</p>

            <div className="flex space-x-3 sm:space-x-4 mb-4"> 
              <a href="https://github.com/viratdogra1982" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/virat-dogra-158264327/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="mailto:viratd918@gmail.com" className="text-slate-300 hover:text-white transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        </>)}
      </div>
    );
  };
export default Signup;

