import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";

export default function Test() {
    const [click, setClick] = useState("");
    const count = useRef(0);
    
    useEffect(() => {
        count.current = count.current +1;
    })
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const focus = useRef(null);
//   useEffect(() => {
//     focus.current.focus();
//   },[])

  // Handle Form Change
//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

  return (
    // <div className="container">
    //   <div className="row">
    //     <Form>
    //       <div>
    //         <h1 className="mb-5">Register</h1>
    //         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
    //           <Form.Label>Name:</Form.Label>
    //           <Form.Control
    //             value={form.name}
    //             name="name"
    //             required
    //             onChange={handleChange}
    //             type="text"
    //             placeholder="Enter Your Name"
    //             ref={focus}
    //           />
    //         </Form.Group>
    //         <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
    //           <Form.Label>Email:</Form.Label>
    //           <Form.Control
    //             value={form.email}
    //             name="email"
    //             required
    //             onChange={handleChange}
    //             type="email"
    //             placeholder="Enter Your Email.."
    //           />
    //         </Form.Group>
    //         <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
    //           <Form.Label>Password:</Form.Label>
    //           <Form.Control
    //             value={form.password}
    //             name="password"
    //             required
    //             onChange={handleChange}
    //             type="password"
    //             placeholder="Enter Your password"
    //             minLength="6"
    //           />
    //         </Form.Group>
    //         <button className="btn btn-primary mt-4">Register</button>
    //       </div>
    //     </Form>
    //   </div>
    // </div>

    <div className="container">
        <input value={click}
        onChange={(e) => setClick(e.target.value)}
        placeholder="write"
        />
        <p>Count : {count.current}</p>
    </div>
  );
}
