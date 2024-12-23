import { Link } from "react-router-dom"
import "./404.css"
export default function Err404(){
return(
    <section className="page_404">
        <div className="container">
            <div className="row">
                <div className="col-sm-12">
                    <div className="col-sm-12 text-center">
                        <div className="four_Zero_four_bg">
                            <h1 className="text-center">404</h1>
                        </div>

                        <div className="content_box_404">
                            <h3 className="h2">Look Like you are lost</h3>

                            <p>The page you are Looking for not availble!</p>

                            <Link to={'/'} className="link_404">
                            Go To Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
)
}