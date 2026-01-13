import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"
import { LogOut, Menu, User2, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { USER_API_END_POINT } from "@/utils/constant"
import { setUser } from "@/redux/authSlice"
import axios from "axios"

const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const DEFAULT_IMAGE =
    "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"

  const links =
    user && user.role === "recruiter"
      ? [
          { name: "Companies", path: "/admin/companies" },
          { name: "Jobs", path: "/admin/jobs" },
          { name: "About Us", path: "/aboutus" },
          { name: "Browse", path: "/browse" }
        ]
      : [
          { name: "Home", path: "/" },
          { name: "Jobs", path: "/jobs" },
          { name: "About Us", path: "/aboutus" },
          { name: "Browse", path: "/browse" }
        ]

  const navLinkClass =
    "relative text-gray-300 transition hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-400 after:transition-all after:duration-300 hover:after:w-full"

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-white hover:opacity-90 transition">
          Skill<span className="text-orange-400">Lift</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link key={link.name} to={link.path} className={navLinkClass}>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {!user ? (
            <div className="hidden md:flex gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-gray-600 text-gray-200 hover:bg-gray-800 hover:scale-105 transition"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gray-100 text-gray-900 hover:bg-white hover:scale-105 transition">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer transition hover:scale-110">
                  <AvatarImage src={user?.profile?.profilePhoto || DEFAULT_IMAGE} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 bg-gray-900 border-gray-800 text-gray-200">
                <div className="flex gap-3 items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.profile?.profilePhoto || DEFAULT_IMAGE} />
                  </Avatar>
                  <div>
                    <p className="font-semibold">{user?.fullname}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {user.role === "college" && (
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                    >
                      <User2 className="w-4 h-4" /> Profile
                    </Link>
                  )}
                  <button
                    onClick={logoutHandler}
                    className="flex items-center gap-2 text-red-400 hover:text-red-500 transition"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white transition hover:scale-110"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-4 space-y-3">
          {links.map(link => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="block text-gray-300 hover:text-white transition"
            >
              {link.name}
            </Link>
          ))}
          {!user && (
            <div className="flex gap-3 pt-2">
              <Link to="/login">
                <Button variant="outline" className="hover:scale-105 transition bg-black text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="hover:scale-105 transition bg-white text-black">Signup</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar
