import './Before.css';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function BeforeTopRated() {
    return (
        <div className="hold mb-4 d-flex align-items-center justify-content-center">
           
            <Container>
            <div className="d-flex align-items-center justify-content-end">
                <div>
                <h1 className="display-2 fw-bold">Shampoo</h1>
                <h5 style={{color:"gray"}} className="fw-normal">
                    Another Nice Thing Which is Used by Someone i don`t know (just random text)
                </h5>

                <Link to="/shop"
                className="btn btn-primary mt-3 py-3 px-4 fw-bold text-light">
                    Shop Now
                </Link>
                </div>
         
            </div>
        </Container>
           
        </div>
    )
}