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
import { addData, updateData } from "../../Components/context/ContextProvider";
import Alert from 'react-bootstrap/Alert';
import { getUserData } from "../../services/Apis";

export const Home = () => {
  const [showSpin, SetShowSpin] = useState(true);
  const [alluserdata, setAllUserData] = useState([])
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(addData);

  const { update, setUpdate } = useContext(updateData);

  // console.log("alluserdata", alluserdata)
  const addUser = () => {
    navigate("/register");
  };

  const allUserData = async () => {
    const response= await getUserData()
    if(response.status ===200) {
      setAllUserData(response.data)
    }else{
      console.log("error for get user data")
    }
   

  }

  useEffect(() => {
    allUserData()
    setTimeout(() => {
      SetShowSpin(false);
    }, 1500);
  }, []);

  return (
    <>
    {
      userData ?  <Alert variant="success" onClose={() => setUserData("")} dismissible>
      <>{`${userData.fname.toUpperCase()} ${ userData.lname.toUpperCase()}`} Successfully Add To DataBase</>
    
    </Alert>:""
    }

    {
      update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible>
      <>{`${update.fname.toUpperCase()} ${update.lname.toUpperCase()}`} Successfully Update</>
    
    </Alert>:""
    }
      <div className="container">
        <div className="main_div">
          {/* search_button */}
          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
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
              <Button className="export_btn">Export To Csv</Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Gender</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"ALL"}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
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
                  <Dropdown.Item>New</Dropdown.Item>
                  <Dropdown.Item>Old</Dropdown.Item>
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
                    value={"ALL"}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSpin ? <Spiner /> : <Tables alluserdata={alluserdata} />}
      </div>
    </>
  );
};
