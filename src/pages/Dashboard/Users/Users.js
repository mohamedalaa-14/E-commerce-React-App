import { useEffect, useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import Table from "react-bootstrap/Table";
import { Axios } from "../../../Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LoadingSubmit from "../../../components/Loading/Loading";
import TableShow from "../../../components/Dashboard/Table";
import TopBardash from "../../../components/Dashboard/TopBardash";

export default function Users() {
  // states
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  // const [noUsers, setNoUsers] = useState(false);
  // const [deleteUser, setDeleteUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);



  // Fet Current User
  useEffect(() => {
    Axios.get(`${USER}`).then((res) => setCurrentUser(res.data));
  }, []);

  // Get All Users
  useEffect(() => {
    setLoading(true)
    Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
      .then((data) =>{
        setUsers(data.data.data);
        setTotal(data.data.total);
      } )
      .catch((err) => console.log(err)).finally(()=> setLoading(false))
  }, [limit, page]);

  const header = [
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
    {
      key: "created_at",
      name: "Created",
    },
    {
      key: "updated_at",
      name: "Last Login",
    },
  ];

  // Filter Current User
  // const userFilter = users.filter((user) => user.id !== currentUser.id);
  // Mapping on Users
  const usersShow = users.map((user, key) => (
    <tr key={key}>
      <td>{key + 1}</td>
      <td>
        {user.name === currentUser.name ? user.name + " (You) " : user.name}
      </td>
      <td>{user.email}</td>
      <td>
        {user.role === "1995"
          ? "admin"
          : user.role === "2001"
          ? "user"
          : "Writer"}
      </td>
      <td>
        <div className="d-flex align-items-center justify-content-center gap-4">
          <Link to={`${user.id}`}>
            <FontAwesomeIcon
              fontSize={"19px"}
              cursor={"pointer"}
              icon={faPenToSquare}
            />{" "}
          </Link>
          {currentUser.name !== user.name && (
            <FontAwesomeIcon
              onClick={() => handleDelete(user.id)}
              fontSize={"19px"}
              color="red"
              cursor={"pointer"}
              icon={faTrash}
            />
          )}
        </div>
      </td>
    </tr>
  ));

  // Handle Delete
  // async function handleDelete(id) {
  //   if (currentUser.id !== id) {
  //     setLoading(true);
  //     try {
  //       const res = await Axios.delete(`${USER}/${id}`);
  //       setDeleteUser((prev) => !prev);
  //       console.log(res);
  //       setLoading(false);
  //     } catch (err) {
  //       setLoading(false);
  //       console.log(err);
  //     }
  //   }
  // }

    async function handleDelete(id) {
    try {
      const res = await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {/* {loading && <LoadingSubmit />} */}
      <div className=" w-100 px-4 py-2 rounded ">
      <TopBardash/>
        <div className="content-container low-shadow">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Users Page</h1>
          <Link className="btn btn-primary" to="/dashboard/user/add">
            Add User
          </Link>
        </div>
        <TableShow
          header={header}
          data={users}
          delete={handleDelete}
          currentUser={currentUser}
          limit={limit}
          page={page}
          setPage={setPage}
          setLimit={setLimit}
          loading={loading}
          total={total}
          search="name"
          searchLink={USER}

          
        />
        </div>
      
      </div>
    </>
  );
}
