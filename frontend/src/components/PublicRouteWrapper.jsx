import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import LoadingSpinner from "./LoadingSpinner"; // optional spinner

const PublicRouteWrapper = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      // Not logged in → do nothing
      console.log("Not logged in");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (user && user._id) {
    return <Navigate to="/app/feed" replace />;
  }

  return <Outlet />;
};

export default PublicRouteWrapper;
