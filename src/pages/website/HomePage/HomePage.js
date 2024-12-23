import { Container } from "react-bootstrap";
import NavBar from "../../../components/website/NavBar/NavBar";
import { Link } from "react-router-dom";
import "./Home.css"
import Landing from "../../../components/website/Landing/Landing";
import ShowLatestSaleProducts from "../../../components/website/Product/SaleProducts/ShowLatestSaleProducts";
import TopRated from "../../../components/website/Product/TopRated/TopRated";
import ShowTopRated from "../../../components/website/Product/TopRated/ShowTopRated";
import BeforeTopRated from "../../../components/website/BeforeTopRated/BeforeTopRated";
import ShowLatestProduct from "../../../components/website/Product/LatestProducts/ShowLatestProducts";

export default function HomePage(){
    return(
        <div>
           {/* <NavBar/> */}
           <Landing/>
           <ShowLatestSaleProducts/>
           <BeforeTopRated/>
           <Container>
            <div className="d-flex align-items-start flex-wrap mt-5">
            <ShowTopRated/>
            <ShowLatestProduct/>
            </div>
           </Container>
      
        </div>
    )
}