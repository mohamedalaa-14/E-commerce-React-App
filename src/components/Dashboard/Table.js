import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/Axios";
import PaginatedItems from "./Pagination/Pagination";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import TransformDate from "../../helpers/TransformDate";
export default function TableShow(props) {
  const currentUser = props.currentUser || {
    name: "",
  };

  // let paginateDate = [];

  // if(props.data.length !== 0){
  //   for (let i = (props.page - 1) * props.limit; i < props.page * props.limit; i++) {
  //     paginateDate.push(props.data[i]);

  //   }
  // }

  // To Count Pagination From Front Only**************
  // const start = (props.page - 1) * props.limit;
  // const end = Number (start) + Number (props.limit);
  // const final = props.data.slice(start, end);
  // console.log(final);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [filteredData, setFiltredData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const filterDataByDate =
    date.length !== 0
      ? props.data.filter((item) => TransformDate(item.created_at) === date)
      : props.data;

  const filterSearchByDate =
    date.length !== 0
      ? filteredData.filter((item) => TransformDate(item.created_at) === date)
      : filteredData;
  const showWhichData =
    search.length > 0 ? filterSearchByDate : filterDataByDate;

  // const filterData = props.data.filter((item) =>
  //   item[props.search].toLowerCase().includes(search.toLowerCase())
  // );

  // function handleSearch(e) {
  //   setSearch(e.target.value);
  // }

  async function getSearchedData() {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      setFiltredData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSearchLoading(false);
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);

  // Header Show
  const headerShow = props.header.map((item) => <th>{item.name}</th>);
  // Body Show
  const dataShow = showWhichData.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item2.key === "image" ? (
            <img width={"80px"} src={item[item2.key]} alt="" />
          ) : item2.key === "images" ? (
            <div className="d-flex align-items-center justify-content-start gap-3 flex-wrap">
              {item[item2.key].map((img) => (
                <img width={"100px"} src={img.image} alt="" />
              ))}
            </div>
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            TransformDate(item[item2.key])
          ) : item[item2.key] === "1995" ? (
            "admin"
          ) : item[item2.key] === "2001" ? (
            "user"
          ) : item[item2.key] === "1996" ? (
            "writer"
          ) : item[item2.key] === "1999" ? (
            "Product Manger"
          ) : (
            item[item2.key]
          )}
          {currentUser && item[item2.key] === currentUser.name && "( You )"}
        </td>
      ))}
      <td>
        <div className="d-flex align-items-center justify-content-center gap-4">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon
              fontSize={"19px"}
              cursor={"pointer"}
              icon={faPenToSquare}
            />{" "}
          </Link>
          {currentUser.name !== item.name && (
            <FontAwesomeIcon
              onClick={() => props.delete(item.id)}
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
  return (
    <>
      <div className="col-3">
        <Form.Control
          className="my-2"
          type="search"
          placeholder="Search"
          aria-label="input example"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
        />
      </div>
      <div className="col-5">
        <Form.Control
          className="my-2"
          type="date"
          placeholder="Search"
          aria-label="input example"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            {headerShow}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.loading ? (
            <tr className="text-center">
              <td colSpan={12}> Loading...</td>
            </tr>
          ) : searchLoading ? (
            <tr className="text-center">
              <td colSpan={12}> Searching...</td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>
      <div className="d-flex align-items-center justify-content-end flex-wrap">
        <div className="col-3">
          <Form.Select
            onChange={(e) => props.setLimit(e.target.value)}
            aria-label="Default select example"
          >
            <option disabled selected>
              Select page number show
            </option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <PaginatedItems
          setPage={props.setPage}
          itemsPerPage={props.limit}
          data={props.data}
          total={props.total}
        />
      </div>
    </>
  );
}
