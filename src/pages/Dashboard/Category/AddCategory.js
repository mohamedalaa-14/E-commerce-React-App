import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/Axios";
import { CATADD } from "../../../Api/Api";
import LoadingSubmit from "../../../components/Loading/Loading";
import TopBardash from "../../../components/Dashboard/TopBardash";
export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  // Ref

  const focus = useRef("");

  // Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CATADD}/add`, form);
      window.location.pathname = "/dashboard/categories";
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
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."
            ref={focus}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
        <Form.Label>Image</Form.Label>
          <Form.Control
            required
            onChange={(e) => setImage(e.target.files.item(0))}
            type="file"
          />
        </Form.Group>
        <button disabled={title.length > 1 ? false : true  } className="btn btn-primary">
          Save
        </button>
      </Form>
        </div>
      </div>
    
    </>
  );
}
