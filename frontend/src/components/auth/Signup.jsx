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
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import image2 from "../image/skill.png"

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      if (input[key]) formData.append(key, input[key]);
    });

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
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

      <div className="max-w-7xl mx-auto px-6 py-2 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="hidden lg:flex flex-col">
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            Join <span className="text-orange-600">SkillLift</span> Today
          </h1>

          <p className="mt-4 text-lg text-slate-700 max-w-md">
            Create your account to manage campus hiring, internships, and
            training opportunities with ease.
          </p>

          <img
            src={image2}
            alt="Signup illustration"
            className="mt-10 max-w-md rounded-xl h-95"
          />
        </div>

        <div className="flex justify-center">
          <form
            onSubmit={submitHandler}
            className="w-full max-w-md rounded-2xl bg-white/70 backdrop-blur-md border border-orange-200 shadow-xl p-8"
          >
            <h2 className="text-2xl font-extrabold text-slate-900">
              Create an account
            </h2>

            <p className="text-sm text-slate-600 mt-1">
              Fill in your details to get started
            </p>

            <div className="mt-5">
              <Label>Full Name</Label>
              <Input
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="Your full name"
                className="mt-1"
              />
            </div>

            <div className="mt-4">
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
              <Label>Phone Number</Label>
              <Input
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="Mobile number"
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
              <Label className="block mb-2">Register as</Label>
              <RadioGroup className="flex gap-4">
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

            <div className="mt-5">
              <Label>Profile Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="mt-1 cursor-pointer"
              />
            </div>

            <div className="mt-6">
              {loading ? (
                <Button className="w-full" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Sign Up
                </Button>
              )}
            </div>

            <p className="text-sm text-center text-slate-700 mt-5">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-600 font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
