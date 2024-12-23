import { useEffect, useState } from "react";
import { CAT, CATADD } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import LoadingSubmit from "../../../components/Loading/Loading";
import { Link } from "react-router-dom";
import TableShow from "../../../components/Dashboard/Table";
import TopBardash from "../../../components/Dashboard/TopBardash";
import { Form } from "react-bootstrap";

export default function Categories() {
  // states
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [search, setSearch] = useState("");
  // const [debounceData, setDebounceData] = useState(false)

  // Get All Categories
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CAT}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
        console.log(data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "image",
      name: "Image",
    },
    {
      key: "created_at",
      name: "Created",
    },
    {
      key: "updated_at",
      name: "Updated",
    },
  ];

  // Handle Delete
  //  async function handleDelete(id) {
  //    if(currentUser.id !== id){
  //      setLoading(true);
  //      try {
  //        const res = await Axios.delete(`${CAT}/${id}`);
  //        setDeleteUser((prev) => !prev);
  //        console.log(res);
  //        setLoading(false);
  //      } catch (err) {
  //        setLoading(false);
  //        console.log(err);
  //      }
  //    }

  //  }

  async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${CATADD}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }



  // getSearchedData



  return (
    <>
      {/* {loading && <LoadingSubmit />} */}
      <div className="w-100 px-4 py-2 rounded">
        <TopBardash />
        <div className="content-container low-shadow">
          <div className="d-flex align-items-center justify-content-between">
            <h1>Categories Page</h1>
            <Link className="btn btn-primary" to="/dashboard/category/add">
              Add Category
            </Link>
          </div>

          {/* <Form.Control
            className="my-2"
            type="search"
            placeholder="Search"
            aria-label="input example"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          /> */}

          {/* <button onClick={getSearchedData}>Get Data</button> */}

          <TableShow
            limit={limit}
            page={page}
            header={header}
            data={categories}
            delete={handleDelete}
            setPage={setPage}
            setLimit={setLimit}
            loading={loading}
            total={total}
            search="title"
            searchLink={CATADD}
          />
        </div>
      </div>
    </>
  );
}
