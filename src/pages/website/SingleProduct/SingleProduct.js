import { useContext, useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import ImageGallery from "react-image-gallery";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/Axios";
import { CART, PRp } from "../../../Api/Api";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkeletonShow from "../../../components/website/Skeleton/Skeleton";
import { cart } from "../../../Context/CartChangerContext";
import PlusMinusBtn from "../../../components/website/Btns/PlusMinusBtn";
import { cache } from "react";

export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(5);
  const [productImages, setProductImages] = useState([]);
  const [error, setError] = useState("");
  const [loadingCart, setLoadingCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const {setIschange} = useContext(cart)
  const { id } = useParams();

  console.log(count)

  const roundStars = Math.round(product.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon color="gold" key={index} icon={solid} />
  ));

  const EmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));
  useEffect(() => {
    Axios.get(`${PRp}/${id}`).then((res) => {
      setProductImages(
        res.data[0].images.map((img) => {
          return { original: img.image, thumbnail: img.image };
        })
      );
      setProduct(res.data[0]);
    })
      .finally(() => setLoading(false));
  }, []);


  const checkStock = async () => {
    try{
      setLoadingCart(true)
      const getItems = JSON.parse(localStorage.getItem("product") ) || [];
      const productCount = getItems.filter(item => item.id == id)?.[0]?.count;
      await Axios.post(`${CART}/check`, {
        product_id: product.id,
        count: count + (productCount ? productCount : 0)
      });

      return true;
    }catch(err){
      console.log(err);
      return false;
    }finally{
      setLoadingCart(false)

    }
  }

  const handlesave = async () => {
    const check = await checkStock();
    if(check){
      const getItems = JSON.parse(localStorage.getItem("product") ) || [];

      const productExist = getItems.findIndex((pro) => pro.id == id);
  console.log(productExist)
      if (productExist !== -1) {
        if(getItems[productExist].count){
          getItems[productExist].count += count;
        }else{
          getItems[productExist].count = count;
        }
      } else {
        if(count > 1){
          product.count = count;
        }
        getItems.push(product);
      }
    
      localStorage.setItem("product", JSON.stringify(getItems));
      setIschange((prev) => !prev);
    }
  
  }

  return (
    <Container className="mt-5">
      <div className="d-flex align-items-start  flex-wrap">
        {loading ? (
          <>
            <div className="col-lg-5 col-md-6 col-12">
              <SkeletonShow height="250px" length="1" classes="col-12" />
              <div className="col-12 d-flex mt-1">
                <SkeletonShow height="100px" length="1" classes="col-4" />
                <SkeletonShow height="100px" length="1" classes="col-4" />
                <SkeletonShow height="100px" length="1" classes="col-4" />
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-12">
              <div className="ms-lg-5">
                <SkeletonShow height="20px" length="1" classes="col-12" />
                <SkeletonShow height="210px" length="1" classes=" col-12" />
                <hr className=" col-12 mt-2"/>
                <div className="d-flex align-items-center justify-content-between  col-12">
                <SkeletonShow height="20px" length="1" classes="col-6 mt-2" />
                <SkeletonShow height="20px" length="1" classes="col-6 mt-2" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-lg-5 col-md-6 col-12">
              <ImageGallery items={productImages} />
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <h3>{product.title}</h3>
              <p style={{ color: "gray" }}>{product.About}</p>
              <h4 className="fw-normal">{product.description}</h4>

              <div className="d-flex align-items-center justify-content-between pt-4 border-top flex-wrap ">
                <div>
                {product.stock === 1 && (
                    <p className="text-danger">There is only 1 left</p>
                  )}
                   {showGoldStars}
                   {EmptyStars}

                  <div className="d-flex align-items-center gap-3">
                    <h5 className="m-0 text-primary">{product.discount}EGP</h5>
                    <h6
                      className="m-0"
                      style={{ color: "gray", textDecoration: "line-through" }}
                    >
                      {product.price}EGP
                    </h6>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-4">
                  <PlusMinusBtn setCount={(data) => setCount(data)}/>
                  <div onClick={handlesave} className="border p-2 rounded"
                  
                  >
                    {loadingCart ? (
                      "Loading"
                    ) : (
                      <img
                      src={require("../../../Assets/images/cart.png")}
                      alt="cart"
                      width="20px"
                      style={{cursor:"pointer"}}
                    />
                    )}
              
                </div>
                </div>
             
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
