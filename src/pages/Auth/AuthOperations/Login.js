import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { baseURL, LOGIN } from "../../../Api/Api";
import LoadingSubmit from "../../../components/Loading/Loading";
import Cookie from "cookie-universal"
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

export default function Login() {
  // States
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Ref

  const focus = useRef("");

  // Loading

  const [loading, setLoading] = useState(false);

  // cookies
  const cookie = Cookie();

  const navigate = useNavigate();

  // err
  const [err, setErr] = useState("");

  // Handle Form Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }


  // Handle Focus
  useEffect(() => {
    focus.current.focus();
  },[])

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)
    try {
      const res=await axios.post(`${baseURL}/${LOGIN}`, form);
      setLoading(false)
      const token = res.data.token;
      const role = res.data.user.role;
      console.log(role);
      const go = role === "1995" ? "users" : "writer";
      cookie.set('e-commerce', token)
      window.location.pathname= `/dashboard/${go}`;
      // navigate("/dashboard/users", {replace: true});
     
    } catch (err) {
      setLoading(false)
      if(err.response.status === 401){
        setErr("Wrong Email Or Password")
      }
      else {
        setErr("Internal Server Error")
      }
    }
  }

  return (
    <>
    {loading && <LoadingSubmit/>}
     <div className="container" >
      <div className="row" style={{height: "100vh"}} >
        <Form className="form" onSubmit={handleSubmit}>
          <div className="custom-form">
            <h1>Login</h1>
        <Form.Group
        className="form-custom"
        controlId="exampleForm.ControlInput1">
        <Form.Control
         type="email"
          placeholder="Enter Your email.."
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          ref={focus}
          />
        <Form.Label>Email:</Form.Label>
      </Form.Group>
            <Form.Group 
            className="form-custom"
            controlId="exampleForm.ControlInput">
        <Form.Control
         type="password"
          placeholder="Enter Your password.."
           name="password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={"6"}
          />
        <Form.Label>Password:</Form.Label>
      </Form.Group>
            <button className="btn btn-primary">Login</button>
            <div className="google-btn">
              <a href={`http://127.0.0.1:8000/login-google`}>
              <div className="google-icon-wrapper">
              <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="sign in with google"
              />
              </div>
              <p className="btn-text">
                <b>Sign in with google</b>
              </p>
              </a>
            </div>
            {err !== "" && <span className="error">{err}</span>}
          </div>
        </Form>
      </div>
    </div>
    </>
   
  );
}
