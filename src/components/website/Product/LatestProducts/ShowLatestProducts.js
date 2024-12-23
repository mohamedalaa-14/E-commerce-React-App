import { useEffect } from "react";
import { useState } from "react";
import { Axios } from "../../../../Api/Axios";
import { Latest } from "../../../../Api/Api";
import SkeletonShow from "../../Skeleton/Skeleton";
import WebProduct from "../SaleProducts/SaleProducts";

export default function ShowLatestProduct(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      Axios.get(`${Latest}`).then((res) => setProducts(res.data)).finally(() => setLoading(false))
    }, []);
    console.log(products);
  
    const productsShow = products.map((product) => (
      <WebProduct
        title={product.title}
        description={product.description}
        img={product.images[0].image}
        sale={product.discount}
        price={product.price}
        discount={product.discount}
        rating={product.rating}
        id={product.id}
        col="6"
      />
    ));
    return (
      <div className=" col-md-6 col-12">
        <div className="ms-md-3">
        <h1>Latest Products</h1>
        <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-3 mb-5">
          {loading ? (
           <SkeletonShow length="4" height="300px" classes="col-md-6 col-12" />
          ) : (
            productsShow
          )}
        </div>
        </div>
      
      </div>
    );
}