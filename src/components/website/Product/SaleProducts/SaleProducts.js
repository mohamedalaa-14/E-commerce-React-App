// import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StringSlice from "../../../../helpers/StringSlice";
import { NavLink } from "react-router-dom";

export default function WebProduct(props) {
  const roundStars = Math.round(props.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon color="gold" key={index} icon={solid} />
  ));

  const EmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));
  return (
    <NavLink to={`/product/${props.id}`} className={`col-lg-${props.col} col-md-6 col-12`}>
      <div className="m-1 border rounded p-3 h-100">
        <div className="border-bottom pb-3">
          <p className="text-truncate" style={{ color: "gray" }}>
            {props.title}
          </p>
          <p className="text-truncate">{props.description}</p>
          <div className="px-5 py-5 position-relative">
            {props.sale && (
              <p
                className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
                style={{ width: "50px", height: "50px", lineHeight: "50px" }}
              >
                Sale
              </p>
            )}
            <img src={props.img} alt="" className="img-fluid" />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-2">
          <div>
            {showGoldStars}
            {EmptyStars}

            <div className="d-flex align-items-center gap-3">
              <h5 className="m-0 text-primary">{props.discount}EGP</h5>
              <h6
                className="m-0"
                style={{ color: "gray", textDecoration: "line-through" }}
              >
                {props.price}EGP
              </h6>
            </div>
          </div>
          <div className="border p-2 rounded">
            <img
              src={require("../../../../Assets/images/cart.png")}
              alt="cart"
              width="20px"
            />
          </div>
        </div>
      </div>
    </NavLink>
  );
}
