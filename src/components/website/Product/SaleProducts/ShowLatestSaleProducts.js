import { useEffect } from "react";
import { useState } from "react";
import { Axios } from "../../../../Api/Axios";
import { LatestSale } from "../../../../Api/Api";
import WebProduct from "./SaleProducts";
import { Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import SkeletonShow from "../../Skeleton/Skeleton";

export default function ShowLatestSaleProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${LatestSale}`).then((res) => setProducts(res.data)).finally(() => setLoading(false))
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
      col="3"
    />
  ));
  return (
    <Container className="mt-4">
      <h1>Latest Sale Products</h1>
      <div className="d-flex align-items-stretch justify-content-center flex-wrap row-gap-3 mb-5">
        {loading ? (
         <SkeletonShow length="4" height="300px" classes="col-lg-3 col-md-6 col-12" />
        ) : (
          productsShow
        )}
      </div>
    </Container>
  );
}
