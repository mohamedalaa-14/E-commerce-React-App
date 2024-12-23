import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/Axios";
import { CAT, PRp } from "../../../Api/Api";
import LoadingSubmit from "../../../components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
export default function Updateproduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock:""
  });
  const [images, setImages] = useState([]);
  const [imagesFromServer, setImagesFromServer] = useState([]);
  const [idsFromServer, setIdsFromServer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
const {id} = useParams();
  const nav = useNavigate();

  console.log(idsFromServer)
  // Get All Categories
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  // Ref

  const focus = useRef("");
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);

  // Handle Edit
  async function HandleEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
        for (let i = 0; i < idsFromServer.length; i++) {
            await Axios.delete(`/product-img/${idsFromServer[i]}`).then((data) => console.log(data));
            
        }
       
      const res = await Axios.post(`${PRp}/edit/${id}`, form);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  // Handle Focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  // Get Data
  useEffect(() => {
    Axios.get(`/${PRp}/${id}`)
    .then((data) =>{
        setForm(data.data[0]);
        setImagesFromServer(data.data[0].images)
    }) 
    .catch((err) => console.log(err));
  }, []);

  // Handle Open Image
  function handleOpenImage() {
    openImage.current.click();
  }

  // Handle Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Image Changes

  const j = useRef(-1);
  async function HandleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imagesAsFilies = e.target.files;
    const data = new FormData();
    for (let i = 0; i < imagesAsFilies.length; i++) {
      j.current++;
      data.append("image", imagesAsFilies[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        console.log(res);
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }
  // Handle Delete Image
  async function handleImageDelete(id, file) {
    const findId = ids.current[id];
    try {
      await Axios.delete(`/product-img/${findId}`).then((data) => console.log(data));
      setImages((prev) => prev.filter((img) => img !== file));
      ids.current = ids.current.filter((i) => i !== findId);
      j.current--;
    } catch (err) {
      console.log(err);
    }
  }

  // Handle Delete ImageFromServer
  async function handleDeleteImageFromServer(id) {
    setImagesFromServer((prev) => prev.filter((img) => img.id !== id));
    setIdsFromServer((prev) => {
        return[...prev, id];
    })
  }

  // Map on Categories and show in option select
  const categoriesShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));

  const imageShow = images.map((img, key) => (
    <div className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify content-start mb-3 gap-2 ">
          <img src={URL.createObjectURL(img)} width="80px"></img>
          <div>
            <p className="mb-1">{img.name}</p>
            <p>
              {img.size / 1024 < 900
                ? (img.size / 1024).toFixed(2) + "KB"
                : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <Button onClick={() => handleImageDelete(key, img)} variant="danger">
          Delete
        </Button>
      </div>

      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progress.current[key] = e)}
          // percent={`${progress[key]}%`}
          // style={{ width: `${progress[key]}%` }}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));

  const imageFromServerShow = imagesFromServer.map((img, key) => (
    <div key={key} className="border p-2 col-2 position-relative d-flex">
        <div className="d-flex align-items-center justify content-start gap-2 flex-column ">
          <img alt="" src={img.image} className="w-100"></img>
        </div>
        <div style={{cursor:"pointer"}}
        className="position-absolute top-0 end-0 bg-danger rounded text-white"
        >
            <p className="py-1 px-2 m-0" onClick={() => handleDeleteImageFromServer(img.id)}>X</p>

        </div>
        {/* <Button onClick={() => handleImageDelete(key, img)} variant="danger">
          Delete
        </Button> */}
   
    </div>
  ));

  return (
    <>
      {loading && <LoadingSubmit />}
      <Form className="bg-white w-100 mx-2 p-3 " onSubmit={HandleEdit}>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={form.category}
            onChange={handleChange}
            name="category"
            ref={focus}
          >
            <option disabled>Select Category</option>
            {categoriesShow}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={form.title}
            required
            onChange={handleChange}
            name="title"
            type="text"
            placeholder="Title..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={form.description}
            required
            onChange={handleChange}
            name="description"
            type="text"
            placeholder="Description..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={form.price}
            required
            onChange={handleChange}
            name="price"
            type="text"
            placeholder="Price..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            value={form.discount}
            required
            onChange={handleChange}
            name="discount"
            type="text"
            placeholder="Discount..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="About">
          <Form.Label>About</Form.Label>
          <Form.Control
            value={form.About}
            required
            onChange={handleChange}
            name="About"
            type="text"
            placeholder="About..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="About">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            value={form.stock}
            required
            onChange={handleChange}
            name="stock"
            type="number"
            placeholder="stock..."
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control
            ref={openImage}
            hidden
            multiple
            onChange={HandleImagesChange}
            type="file"
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-3 w-100 flex-column"
          style={{
            border: "2px dashed #0086fe",
            cursor: "pointer",
          }}
        >
          <img
            src={require("../../../Assets/images/upload.png")}
            alt="Upload Here"
            width="100px"
          />
          <p className="fw-bold mb-0" style={{ color: "#0086fe" }}>
            Upload Images
          </p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {imageFromServerShow}
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {imageShow}
        </div>
        <button className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}
