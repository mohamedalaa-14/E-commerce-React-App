import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/Axios";
import { USER } from "../../../Api/Api";
import LoadingSubmit from "../../../components/Loading/Loading";
import TopBardash from "../../../components/Dashboard/TopBardash";
export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Ref

  const focus = useRef("");

  // Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      window.location.pathname = "/dashboard/users";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

       // Handle Focus
       useEffect(() => {
        focus.current.focus();
      },[])

  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="w-100 px-4 py-2 rounded">
        <TopBardash/>
      <div className="content-container low-shadow">
      <Form className="bg-white w-100 mx-2 p-3 " onSubmit={HandleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name..."
            ref={focus}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option disabled value="">Select Role</option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
            <option value="1999">Product Manger</option>
          </Form.Select>
        </Form.Group>
        <button disabled={name.length >1 && email.length > 1 && password.length > 6 && role !== "" ? false : true  } className="btn btn-primary">
          Save
        </button>
      </Form>
      </div>
      </div>
      
     
    </>
  );
}
