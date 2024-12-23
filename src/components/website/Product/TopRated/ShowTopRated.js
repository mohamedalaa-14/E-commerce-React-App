import { useEffect } from "react";
import { useState } from "react";
import { Axios } from "../../../../Api/Axios";
import { TOPRATED } from "../../../../Api/Api";
import TopRated from "./TopRated";
import SkeletonShow from "../../Skeleton/Skeleton";

export default function ShowTopRated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${TOPRATED}`).then((res) => setProducts(res.data)).finally(() => setLoading(false))
  }, []);
  console.log(products);

  const productsShow = products.map((product) => (
    <TopRated
      title={product.title}
      description={product.description}
      img={product.images[0].image}
      sale={product.discount}
      price={product.price}
      discount={product.discount}
      rating={product.rating}
      id={product.id}
    />
  ));
  return (
   
  <div className="col-md-6 col-12" style={{border: "2px solid #0d6efd"}}>
    <h1 className="text-center m-0 p-3 bg-primary text-white">Top Rated</h1>
    <div className="p-5">
      { loading ? (
           <SkeletonShow length="1" height="800px" classes=" col-12" />
          ) : ( 
            productsShow
          )}
      </div>
   </div>
  );
}
