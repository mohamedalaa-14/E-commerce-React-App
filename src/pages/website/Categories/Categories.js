import { useEffect, useState } from "react";
import { Axios } from "../../../Api/Axios";
import { CAT } from "../../../Api/Api";
import NavBar from "../../../components/website/NavBar/NavBar";
import { Container } from "react-bootstrap";
import StringSlice from "../../../helpers/StringSlice";
import Skeleton from "react-loading-skeleton";
import SkeletonShow from "../../../components/website/Skeleton/Skeleton";


export default function WebsiteCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get(`${CAT}`).then((res) => setCategories(res.data)).finally(()=> setLoading(false))
  }, []);

  const showCategories = categories.map((item) => (
    <div className="col-lg-2 col-md-6 col-12 bg-transparent border-0">
      <div className="m-1 bg-white border d-flex align-items-center justify-content-start gap-3 rounded py-2 h-100">
        <img className="ms-3" width="50px" src={item.image} alt="just an img" />
        <p className="m-0">
          {StringSlice(item.title, 12)}
        </p>
      </div>
    </div>
  ));
  return(
    <>
    {/* <NavBar/> */}
    <div className="bg-secondary py-5">
        <Container>
            <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-2">
                {loading ? (
              <SkeletonShow length="18" height="70px" baseColor="white" classes="col-lg-2 col-md-6 col-12"/>
            ) : (showCategories) }
            </div>
        </Container>
    </div>
    </>
  )
}
