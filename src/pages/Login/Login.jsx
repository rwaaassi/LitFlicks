import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, signUp, user,logout ,error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleLogin = async () => {
  //   await login(email, password);
  // };

  // const handleSignUp = async () => {
  //   await signUp(email, password);
  // };


  // useEffect(() => {
  //   if (user) {
  //     navigate("/"); 
  //     console.log("User logged in:", user);
  //   }
  // }, [user, navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={(e) => login(e, email, password)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <button
            onClick={(e) => signUp(e, email, password)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Sign Up
          </button>
        </div>
        {/* {user && <p className="text-green-500">Welcome, {user.email}</p>} */}
      </div>
    </div>
  );
};

export default Login;
