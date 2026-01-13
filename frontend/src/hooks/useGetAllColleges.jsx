import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import {
  setColleges,
  setUserLoading,
  setUserError,
} from "@/redux/userSlice";

const useGetAllColleges = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        dispatch(setUserLoading());

        const res = await axios.get(
          `${USER_API_END_POINT}/colleges`,
          { withCredentials: true }
        );

        if (res.data.success) {
          dispatch(setColleges(res.data.colleges));
        }
      } catch (error) {
        dispatch(setUserError("Failed to load colleges"));
        console.log(error);
      }
    };

    fetchColleges();
  }, [dispatch]);
};

export default useGetAllColleges;
