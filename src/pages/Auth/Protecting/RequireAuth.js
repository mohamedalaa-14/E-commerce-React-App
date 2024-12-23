import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { USER } from "../../../Api/Api";
import LoadingSubmit from "../../../components/Loading/Loading";
import { Axios } from "../../../Api/Axios";
import Err403 from "../Errors/403";
export default function RequireAuth({allowedRole}) {
  // user
  const [user, setUser] = useState("");
  console.log(user)
  const navigate = useNavigate();
  useEffect(() => {
    Axios
      .get(`/${USER}`)
      .then((data) => setUser(data.data)).catch(() => navigate("/login", {replace:true}))
  }, []);
  // Token & cookie
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  return token ? (
    user === "" ? (
      <LoadingSubmit />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Err403 role={user.role}/>
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}
