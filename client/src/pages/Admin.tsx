import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../Components/component-ui";
import { useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export const AdminSignup = () => {

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const Backend_Url = import.meta.env.VITE_BACKEND_URL;

  async function signUp() {

    setError("");

    const username = usernameRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    // Validation
    if (!username || !password) {
      setError("All fields are required.");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {

      setLoading(true);

      await axios.post(`${Backend_Url}/admin/signup`, {
        username,
        password
      });

      // small delay so loading text is visible
      await new Promise((resolve) => setTimeout(resolve, 700));

      navigate("/admin-signin");

    } catch (err: any) {

      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Invalid username or password."
        );
      } else {
        setError("Something went wrong.");
      }

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="border-dashed border-t-[15px] border-b-[15px] border-[#92260d] w-full h-screen bg-[#190a05] flex items-center justify-center overflow-hidden relative">

      {/* subtle background glow */}
      <div className="absolute top-0 left-0 w-56 h-56 bg-red-500/10 blur-2xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-orange-500/10 blur-2xl rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 bg-black md:w-1/2 w-[90%] rounded-2xl p-6 text-white border border-white/10 shadow-2xl"
      >

        {/* heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-6"
        >
          Admin Sign Up.
        </motion.h1>

        {/* username */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Input
            ref={usernameRef}
            label="Username:"
            placeholder="Enter Username"
          />
        </motion.div>

        {/* password */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Input
            type="password"
            ref={passwordRef}
            label="Password:"
            placeholder="Enter Password"
          />
        </motion.div>

        {/* error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-md mt-3 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              onClick={signUp}
              label={loading ? "Signing UP..." : "Sign UP"}
            />
          </motion.div>
        </motion.div>

        {/* footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-2 text-gray-300 mt-4 text-center"
        >
          Already have account?{" "}
          <Link
            to="/admin-signin"
            className="text-[#e02d30] hover:text-red-400 transition-all duration-300"
          >
            Sign In
          </Link>
        </motion.p>

      </motion.div>
    </div>
  );
};

export const AdminSignin = () => {

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const Backend_Url = import.meta.env.VITE_BACKEND_URL;

  async function signIn() {

    setError("");

    const username = usernameRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    // Validation
    if (!username || !password) {
      setError("All fields are required.");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {

      setLoading(true);

      const res = await axios.post(`${Backend_Url}/admin/signin`, {
        username,
        password
      });

      await new Promise((resolve) => setTimeout(resolve, 700));

      localStorage.setItem("token", res.data.token);

      navigate("/admin-dashboard");

    } catch (err: any) {

      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Invalid username or password."
        );
      } else {
        setError("Something went wrong.");
      }

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="border-dashed border-t-[15px] border-b-[15px] border-[#92260d] w-full h-screen bg-black flex items-center justify-center overflow-hidden relative">

      {/* subtle background glow */}
      <div className="absolute top-0 left-0 w-56 h-56 bg-red-500/10 blur-2xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-orange-500/10 blur-2xl rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 bg-[#190a05] md:w-1/2 w-[90%] rounded-2xl p-6 text-white border border-white/10 shadow-2xl"
      >

        {/* heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-6"
        >
          Admin Sign In.
        </motion.h1>

        {/* username */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Input
            ref={usernameRef}
            label="Username:"
            placeholder="Enter Username"
          />
        </motion.div>

        {/* password */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Input
            type="password"
            ref={passwordRef}
            label="Password:"
            placeholder="Enter Password"
          />
        </motion.div>

        {/* error */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-md mt-3 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              onClick={signIn}
              label={loading ? "Signing IN..." : "Sign In"}
            />
          </motion.div>
        </motion.div>

        {/* footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-2 text-gray-300 mt-4 text-center"
        >
          Didn't have account?{" "}
          <Link
            to="/admin-signup"
            className="text-[#e02d30] hover:text-red-400 transition-all duration-300"
          >
            Sign Up
          </Link>
        </motion.p>

      </motion.div>
    </div>
  );
};