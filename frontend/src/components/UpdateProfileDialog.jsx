import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    city: user?.profile?.city || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("city", input.city);

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="
          sm:max-w-[460px] rounded-2xl border border-orange-200 shadow-2xl
          bg-gradient-to-br from-[#fff7ed] via-[#fdebd3] to-[#fff1e6]
        "
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-900">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={submitHandler}>
          <div className="grid gap-5 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-700">Name</Label>
              <Input
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3 bg-white/70 border-slate-300 focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-700">Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3 bg-white/70 border-slate-300 focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-700">Phone</Label>
              <Input
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3 bg-white/70 border-slate-300 focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-700">Bio</Label>
              <Input
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="col-span-3 bg-white/70 border-slate-300 focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-slate-700">City</Label>
              <Input
                name="city"
                value={input.city}
                onChange={changeEventHandler}
                className="col-span-3 bg-white/70 border-slate-300 focus:border-orange-500"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white transition"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
