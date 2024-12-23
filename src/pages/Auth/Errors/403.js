import "./403.css";
import { Link } from "react-router-dom";
export default function Err403({ role }) {
  return (
    <div className="text-wrapper text-center">
      <div className="title" data-content={404}>
        403 - ACCESS DENIED
      </div>
      <div className="subtitle">
        Oops, You don`t have permission to access this page.
        <Link
          className="d-block text-center btn btn-primary"
          to={role === "1996" ? "/dashboard/writer" : "/"}
        >
         { role === "1996" ? "Go To Writer Page" : "Go To Home Page"}
        </Link>
      </div>
    </div>
  );
}
