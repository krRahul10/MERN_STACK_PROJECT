import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import "./table.css";
import { addData } from "../context/ContextProvider";
import { BACKEND_URL } from "../../services/helper";
import { NavLink } from "react-router-dom";

export const Tables = ({ alluserdata }) => {
  
  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className="shadow">
              <Table className="align-align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>Id</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    alluserdata.length > 0 ? alluserdata.map((element,index) => {
                      return (
                        <tr key={index+2}>
                        <td>{index+1}</td>
                        <td>{element.fname}  {element.lname}</td>
                        <td>{element.email}</td>
                        <td>{element.gender === "Male" ? "M":"F"}</td>
                        <td className="d-flex align-items-center">
                          <Dropdown className="text-center">
                            <Dropdown.Toggle
                              className="dropdown_btn"
                              id="dropdown-basic"
                            >
                              <Badge bg={element.status==="Active" ? "primary":"danger"}>
                                {element.status}<i className="fa-solid fa-angle-down"></i>
                              </Badge>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item>Active</Dropdown.Item>
                              <Dropdown.Item>InActive</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                        <td className="img_parent">
                          <img src={`${BACKEND_URL}/uploads/${element.profile}`} alt="img" />
                        </td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="light"
                              className="action"
                              id="dropdown-basic"
                            >
                              <i className="fa-solid fa-ellipsis-vertical dots"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <NavLink to ={`/userprofile/${element._id}`} className='text-decoration-none' style={{color:"black"}} >
                                <i
                                  className="fa-solid fa-eye"
                                  style={{ color: "green" }}
                                ></i>{" "}
                                <span>View</span>
                                </NavLink>
                               
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <NavLink to ={`/edit/${element._id}`} className='text-decoration-none' style={{color:"black"}}>
                                <i
                                  className="fa-solid fa-pen-to-square"
                                  style={{ color: "blue" }}
                                ></i>{" "}
                                <span>Edit</span>
                                </NavLink>
                               
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <i
                                  className="fa-solid fa-trash"
                                  style={{ color: "red" }}
                                ></i>{" "}
                                <span>Delete</span>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                      )
                    }):<div className="no_data ">No data</div>
                  }
                
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </div>
    </>
  );
};
