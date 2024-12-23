import { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { Axios } from "../../../Api/Axios";
import { CAT, PRp } from "../../../Api/Api";
import LoadingSubmit from "../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import TopBardash from "../../../components/Dashboard/TopBardash";
export default function AddProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
    stock: "",
  });
  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 222,
    discount: 0,
    About: "About",
    stock: 0,
  };
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sent, setSent] = useState(false);
  const [id, setId] = useState();
  const nav = useNavigate();

 

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

  console.log(ids);

  // Handle Edit
  async function HandleEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      // const data = new FormData();
      // data.append("category", form.category);
      // data.append("title", form.title);
      // data.append("description", form.description);
      // data.append("price", form.price);
      // data.append("discount", form.discount);
      // data.append("About", form.About);
      // for (let i = 0; i < images.length; i++) {
      //   data.append("images[]", images[i]);
      // }
      const res = await Axios.post(`${PRp}/edit/${id}`, form);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  // Handle Submit Form

  async function HandleSubmitForm() {
    try {
      const res = await Axios.post(`${PRp}/add`, dummyForm);
      setId(res.data.id);
    } catch (err) {
      console.log(err);
    }
  }

  // Handle Focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  // Handle Open Image
  function handleOpenImage() {
    openImage.current.click();
  }

  // Handle Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(1);
    if (sent !== 1) {
      HandleSubmitForm();
    }
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
            if(percent % 10 ===0){
              progress.current[ j.current].style.width =`${percent}%`
              progress.current[ j.current].setAttribute("percent", `${percent}%`)
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
    async function handleImageDelete(id, img) {
    const findId = ids.current[id];
    try{
      const res = await Axios.delete(`product-img/${findId}`)
      setImages(prev => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((i) => i!== findId);
      --j.current;
    }catch (err) {
      console.log(err)
    }
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
      <Button onClick={() => handleImageDelete(key, img)} variant="danger">Delete</Button>
      </div>
     
      <div className="custom-progress mt-3">
        <span
        ref={(e) => (progress.current[key] =e )}
          // percent={`${progress[key]}%`}
          // style={{ width: `${progress[key]}%` }}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));



  return (
    <>
      {loading && <LoadingSubmit />}
      <div className="w-100 px-4 py-2 rounded">
        <TopBardash/>
        <div className="content-container low-shadow">
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
            disabled={!sent}
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
            disabled={!sent}
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
            disabled={!sent}
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
            disabled={!sent}
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
            disabled={!sent}
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
            disabled={!sent}
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
            disabled={!sent}
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          className="d-flex align-items-center justify-content-center gap-2 py-3 rounded mb-3 w-100 flex-column"
          style={{
            border: !sent ? "2px dashed gray" : "2px dashed #0086fe",
            cursor: !sent ? "not-allowed" : "pointer",
          }}
        >
          <img
            src={require("../../../Assets/images/upload.png")}
            alt="Upload Here"
            width="100px"
            style={{ filter: !sent && "grayscale(1)" }}
          />
          <p
            className="fw-bold mb-0"
            style={{ color: !sent ? "gray" : "#0086fe" }}
          >
            Upload Images
          </p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {imageShow}
        </div>
        <button className="btn btn-primary">Save</button>
      </Form>
        </div>
      </div>
    
    </>
  );
}
