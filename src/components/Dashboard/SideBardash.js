import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";

import { NavLink } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { useContext } from "react";
import { WindowSize } from "../../Context/WindowContext";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { useNavigate } from "react-router-dom";
import { USER } from "../../Api/Api";
import { Links } from "./NavLink";


export default function SideBardash() {
  const menu = useContext(Menu);
  const windowContext = useContext(WindowSize);
  const windowSize = windowContext.windowSize;
  console.log(windowSize);
  const isOpen = menu.isopen;


    // user
    const [user, setUser] = useState("");
    console.log(user)
    const navigate = useNavigate();
    useEffect(() => {
      Axios
        .get(`/${USER}`)
        .then((data) => setUser(data.data)).catch(() => navigate("/login", {replace:true}))
    }, []);

    
  return (
    <>
 
      <div
        style={{
          position: "fixed",
          top: "70 px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          display: windowSize < "768" && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar pt-3 low-shadow"
        style={{
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "290px" : "fit-content",
          position: windowSize < "768" ? "fixed" : "sticky",
        }}
      >
           <h2 className="text-center mb-4">Dashboard</h2>
        {Links.map((link, key) => link.role.includes(user.role) && (
          
   <NavLink
   key={key}
   to={link.path}
   className="d-flex align-items-center gap-2 side-bar-link"
 >
   <FontAwesomeIcon
     style={{
       padding: isOpen ? "10px 8px 10px 15px" : "10px 13px",
     }}
     icon={link.icon}
   />
   <p
     className="m-0"
     style={{
       display: isOpen ? "block" : "none",
     }}
   >
     {link.name}
   </p>
 </NavLink>

        ))}
      </div>
    </>
  );
}
