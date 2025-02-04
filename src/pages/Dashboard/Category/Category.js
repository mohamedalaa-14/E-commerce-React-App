import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/Axios";
import { CATADD, USER } from "../../../Api/Api";
import LoadingSubmit from "../../../components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
export default function Category() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // Id
//   const id = Number(window.location.pathname.replace("/dashboard/categories/", ""));

const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    Axios.get(`${CATADD}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        setLoading(false);

      })
      .then(() => setDisable(false)).catch(() => nav('/dashboard/categories/page/404', {replace: true}))
  }, []);
  // Handle Submit
  async function HandleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CATADD}/edit/${id}`, form);
      window.location.pathname = "/dashboard/categories";
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      {loading && <LoadingSubmit />}
      <Form className="bg-white w-100 mx-2 p-3 " onSubmit={HandleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title..."
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
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}
