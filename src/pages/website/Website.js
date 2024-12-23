import { Outlet } from "react-router-dom";
import NavBar from "../../components/website/NavBar/NavBar";

export default function Website() {
    return (
        <>
        <NavBar/>
        <Outlet/>
        </>
    )
}