import { Axios } from "../../../Api/Axios";
import { useContext, useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CAT } from "../../../Api/Api";
import "./navbar.css";
import StringSlice from "../../../helpers/StringSlice";
import Skeleton from "react-loading-skeleton";
import SkeletonShow from "../Skeleton/Skeleton";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { cart } from "../../../Context/CartChangerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import PlusMinusBtn from "../../../components/website/Btns/PlusMinusBtn";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(5);
  const [products, setProducts] = useState([]);
  const [getDataAgain, setGetDataAgain] = useState(false);
  const [show, setShow] = useState(false);
  const { isChange } = useContext(cart);
  console.log(isChange);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Axios.get(`${CAT}`)
      .then((res) => setCategories(res.data.slice(-8)))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProducts);
  }, [isChange]);

  const handleDelete = (id) => {
    const deleteProduct = products.filter((product) => product.id !== id);
    setProducts(deleteProduct);
    localStorage.setItem("product", JSON.stringify(deleteProduct));
  };

  const changeCount = (id, btnCount) => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    const findProduct = getProducts.find((product) => product.id === id);
    findProduct.count=btnCount;
    localStorage.setItem("product", JSON.stringify(getProducts));
  }

  const productsShow = products?.map((product, key) => (
    <div className="mb-4 position-relative" key={key}>
      <div
        onClick={() => handleDelete(product.id)}
        className="position-absolute top-0 end-0 rounded-circle d-flex
      align-items-center justify-content-center bg-danger text-white
      "
        style={{ width: "20px", height: "20px", cursor: "pointer" }}
      >
        <FontAwesomeIcon width="10px" icon={faXmark} />
      </div>
      <div className="d-flex align-items-start gap-2 flex-wrap">
        <img
          src={product.images[0].image}
          height="80px"
          style={{ objectFit: "cover" }}
          className="rounded col-sm-3 col-12"
          alt="img"
        />
        <div className="col-sm-6 col-12">
          <h6>{[product.title]}</h6>
          <p className="m-0 text-truncate">{product.description}</p>
          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-primary">{product.discount}$</h5>
            <h6
              className="m-0"
              style={{
                color: "gray",
                textDecoration: "line-through",
              }}
            >
              {product.price}$
            </h6>
          </div>
        </div>

        <PlusMinusBtn
          id={product.id}
          count={product.count || 1}
          setCount={setCount}
          changeCount={changeCount}
        />
      </div>
    </div>
  ));

  const categoriesShow = categories.map((category) => (
    <Link
      to={`/category/${category.id}`}
      className="m-0 category-title text-black "
    >
      {StringSlice(category.title, 15)}
    </Link>
  ));
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>{productsShow}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Checkout</Button>
        </Modal.Footer>
      </Modal>
      <nav className="py-3">
        <Container>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <Link className="col-3" to="/">
              <img
                width="200px"
                src={require("../../../Assets/images/logo-removebg-preview.png")}
                alt="logo"
              />
            </Link>
            <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
              <Form.Control
                type="search"
                className="form-control custom-search py-3 rounded-0"
                placeholder="Search Product"
              />
              <h3 className="btn btn-primary position-absolute top-0 end-0 h-100 line-height m-0 px-4 rounded-0 d-flex align-items-center justify-content-center">
                Search
              </h3>
            </div>
            <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1 ">
              <div onClick={handleShow}>
                <img
                  width="30px"
                  src={require("../../../Assets/images/cart.png")}
                  alt="cart"
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Link to="/profile">
                <img
                  width="35px"
                  src={require("../../../Assets/images/profile.png")}
                  alt="profile"
                />
              </Link>
            </div>
          </div>
          <div className="mt-3">
            <div className="d-flex align-items-center justify-content-center gap-5 flex-wrap">
              {loading ? (
                <SkeletonShow
                  length="8"
                  height="20px"
                  width="80px"
                  classes="col-lg-1 col-md-6 col-12"
                />
              ) : (
                categoriesShow
              )}
              <Link className="text-black category-title" to="/categories">
                Show All
              </Link>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}
