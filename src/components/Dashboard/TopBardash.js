import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./bars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Menu } from "../../Context/MenuContext";
import { useEffect, useState } from "react";
import { LOGOUT, USER } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { DropdownButton, DropdownItem } from "react-bootstrap";
import Cookie from "cookie-universal";

export default function TopBardash() {
  const menu = useContext(Menu);
  const setIsopen = menu.setIsopen;
  const [name, setName] = useState("");
  const cookie = Cookie();
  useEffect(() => {
    Axios.get(`/${USER}`).then((data) => setName(data.data.name));
  }, []);

  async function handleLogout() {
    try {
      const res = await Axios.get(`/${LOGOUT}`);
      cookie.remove("e-commerce");
      window.location.pathname = "/login";
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="top-bar">
      <div className="d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center gap-5">
          <h3>{name}</h3>
          <FontAwesomeIcon
            onClick={() => setIsopen((prev) => !prev)}
            cursor={"pointer"}
            icon={faBars}
          />
        </div>
        <div>
          <DropdownButton id="dropdown-basic-button" title={name}>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}
