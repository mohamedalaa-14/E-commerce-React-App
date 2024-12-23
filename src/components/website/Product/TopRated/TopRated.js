// import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default function TopRated(props) {
  const roundStars = Math.round(props.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon color="gold" key={index} icon={solid} />
  ));

  const EmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));
  return (
    <NavLink to={`/product/${props.id}`} className="col-12 border-bottom d-flex align-items-start flex-wrap mb-2">
      <div
      alt=""
      className="col-md-4 col-12"
      style={{
        backgroundImage:`url('${props.img}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "170px",
      }}
      ></div>
        <div className="m-1 col-md-7 col-12  p-3 h-100 d-flex flex-column justify-content-between">
          <div>
            <p className="text-truncate" style={{ color: "gray" }}>
              {props.title}
            </p>
            <p className="text-truncate">{props.description}</p>
             </div>
            {/* <div className="px-5 py-5 position-relative">
              {props.sale && (
                <p
                  className="m-0 position-absolute top-0 start-0 bg-primary rounded-circle text-white text-uppercase d-inline-block text-center"
                  style={{ width: "50px", height: "50px", lineHeight: "50px" }}
                >
                  Sale
                </p>
              )}
              <img src={props.img} alt="" className="img-fluid" />
            </div> */}
         
          <div className="d-flex align-items-center justify-content-between pt-4">
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
