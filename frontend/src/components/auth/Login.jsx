import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import image from "../image/login.jpg";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7ed] via-[#fdebd3] to-[#fff1e6]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="hidden lg:flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Welcome back to <br />
            <span className="text-orange-600">SkillLift</span>
          </h1>

          <p className="mt-4 text-lg text-slate-700 max-w-md">
            Login to manage internships, training opportunities, and campus
            hiring seamlessly.
          </p>

          <img
            src={image}
            alt="Login illustration"
            className="mt-10 w-full max-w-md rounded-xl"
          />
        </div>

        <div className="flex justify-center">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md rounded-2xl bg-white/70 backdrop-blur-md shadow-xl border border-orange-200 p-8"
          >
            <h2 className="text-2xl font-extrabold text-slate-900">
              Login to your account
            </h2>

            <p className="text-sm text-slate-600 mt-1">
              Enter your credentials to continue
            </p>

            <div className="mt-6">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="you@example.com"
                className="mt-1"
              />
            </div>

            <div className="mt-4">
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="••••••••"
                className="mt-1"
              />
            </div>

            <div className="mt-5">
              <Label className="mb-2 block">Login as</Label>
              <RadioGroup className="flex gap-6">
                {["college", "recruiter"].map((role) => (
                  <label
                    key={role}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition ${
                      input.role === role
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <Input
                      type="radio"
                      name="role"
                      value={role}
                      checked={input.role === role}
                      onChange={changeEventHandler}
                    />
                    <span className="capitalize font-medium">{role}</span>
                  </label>
                ))}
              </RadioGroup>
            </div>

            <div className="mt-6">
              {loading ? (
                <Button className="w-full" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Login
                </Button>
              )}
            </div>

            <p className="text-sm text-center text-slate-700 mt-5">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-orange-600 font-medium">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
