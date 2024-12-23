import { Outlet } from "react-router-dom";
import SideBardash from "../../components/Dashboard/SideBardash";
import TopBardash from "../../components/Dashboard/TopBardash";
import './dashboard.css'

export default function Dashboard() {
    return (
        <div className="position-relative ">
             <div className="dashboard d-flex gap-1">
             <SideBardash/>
             <Outlet/>
             </div>
         
        </div>
    )
}