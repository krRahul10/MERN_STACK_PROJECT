import React from "react";
import "./home.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { Tables } from "../../Components/Tables/Tables";
import { Spiner } from "../../Components/Spiner/Spiner";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import {
  addData,
  deleteData,
  updateData,
} from "../../Components/context/ContextProvider";
import Alert from "react-bootstrap/Alert";
import {
  deleteFunction,
  exportToCsvFunction,
  getUserData,
} from "../../services/Apis";
import { toast } from "react-toastify";

export const Home = () => {
  const [showSpin, SetShowSpin] = useState(true);
  const [alluserdata, setAllUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const navigate = useNavigate();

  const { userData, setUserData } = useContext(addData);
  const { update, setUpdate } = useContext(updateData);
  const { deletedata, setDeleteData } = useContext(deleteData);

  const addUser = () => {
    navigate("/register");
  };

  const allUserData = async () => {
    const response = await getUserData(search, gender, status, sort, page);
    // console.log(response.data.Pagination.pageCount)
    if (response.status === 200) {
      setAllUserData(response.data.userData);
      setPageCount(response.data.Pagination.pageCount);
    } else {
      console.log("error for get user data");
    }
  };

  const deleteUser = async (id) => {
    const response = await deleteFunction(id);
    if (response.status === 200) {
      allUserData();
      setDeleteData(response.data);
    } else {
      toast.error("Something Went Wrong On Delete");
    }
  };

  // export user

  const exportUser = async () => {
    const response = await exportToCsvFunction();
    // console.log(response);
    if (response.status === 200) {
      window.open(response.data.downloadUrl, "blank");
    } else {
      toast.error("Error for CSV file");
    }
  };

  // Pagination
  // Handle Previous Button

  const handlePrev = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    });
  };

  // Handle Increment Page

  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    });
  };
  useEffect(() => {
    allUserData();
    setTimeout(() => {
      SetShowSpin(false);
    }, 1500);
  }, [search, gender, status, sort, page]);

  return (
    <>
      {userData ? (
        <Alert variant="success" onClose={() => setUserData("")} dismissible>
          <>
            {`${userData.fname.toUpperCase()} ${userData.lname.toUpperCase()}`}{" "}
            Successfully Add To DataBase
          </>
        </Alert>
      ) : (
        ""
      )}

      {update ? (
        <Alert variant="primary" onClose={() => setUpdate("")} dismissible>
          <>
            {`${update.fname.toUpperCase()} ${update.lname.toUpperCase()}`}{" "}
            Successfully Update
          </>
        </Alert>
      ) : (
        ""
      )}

      {deletedata ? (
        <Alert variant="danger" onClose={() => setDeleteData("")} dismissible>
          <>
            {`${deletedata.fname.toUpperCase()} ${deletedata.lname.toUpperCase()}`}{" "}
            Delete Successfully Update
          </>
        </Alert>
      ) : (
        ""
      )}
      <div className="container">
        <div className="main_div">
          {/* search_button */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search By Name"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success" className="search_btn">
                  Search
                </Button>
              </Form>
            </div>
            <div className="add_btn">
              <Button variant="primary" onClick={addUser}>
                <i className="fa-solid fa-plus"></i>&nbsp;Add User
              </Button>
            </div>
          </div>
          {/* export,gender,status */}

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className="export_btn" onClick={exportUser}>
                Export To Csv
              </Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* short by value  */}
            <div className="filter_newold">
              <h3>Short By Value</h3>
              <Dropdown className="text-center">
                <Dropdown.Toggle className="dropdown_btn" id="dropdown-basic">
                  <i className="fa-solid fa-sort"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSort("new")}>
                    New
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSort("old")}>
                    Old
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* filter by status  */}

            <div className="filter_status">
              <div className="status">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-around flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    onChange={(e) => {
                      setStatus(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSpin ? (
          <Spiner />
        ) : (
          <Tables
            alluserdata={alluserdata}
            deleteUser={deleteUser}
            allUserData={allUserData}
            handleNext={handleNext}
            handlePrev={handlePrev}
            page={page}
            pageCount={pageCount}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
};
