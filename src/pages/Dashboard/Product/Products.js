import { useEffect, useState } from "react";
import { PRO, PRp } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import LoadingSubmit from "../../../components/Loading/Loading";
import { Link } from "react-router-dom";
import TableShow from "../../../components/Dashboard/Table";
import TopBardash from "../../../components/Dashboard/TopBardash";

export default function Products() {
  // states
  const [Products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);


  // Get All Products
  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRO}?limit=${limit}&page=${page}`)
      .then((data) =>{
        setProducts(data.data.data);
        setTotal(data.data.total);
      } )
      .catch((err) => console.log(err)).finally(()=> setLoading(false));
  }, [limit, page]);

  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "description",
      name: "description",
    },
    {
      key: "price",
      name: "price",
    },
    {
      key: "rating",
      name: "rating",
    },
    {
      key: "images",
      name: "images",
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
      const res = await Axios.delete(`${PRp}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {/* {loading && <LoadingSubmit />} */}
      <div className="w-100 px-4 py-2 rounded">
        <TopBardash />
        <div className="content-container low-shadow">
          <div className="d-flex align-items-center justify-content-between">
            <h1>Products Page</h1>
            <Link className="btn btn-primary" to="/dashboard/category/add">
              Add Product
            </Link>
          </div>
          <TableShow
            header={header}
            data={Products}
            delete={handleDelete}
            limit={limit}
            page={page}
            setPage={setPage}
            setLimit={setLimit}
            loading={loading}
            total={total}
            search="title"
            searchLink={PRp}

          />
        </div>
      </div>
    </>
  );
}
