import React from "react";
import "./edit.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spiner } from "../../Components/Spiner/Spiner";
import { useParams } from "react-router-dom";
import { getSingleUserData } from "../../services/Apis";

export const Edit = () => {
  const [showSpin, SetShowSpin] = useState(true);
  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  // console.log(inputdata);

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  //Status Option

  const options = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  // status set aise hota h

  const setStatusValue = (e) => {
    setStatus(e.value);
  };

  // profile set aise hoti hai
  const setProfileValue = (e) => {
    setImage(e.target.files[0]);
  };
  const { id } = useParams();


  const singleUser = async () => {
    try {
      const res = await getSingleUserData(id);
      setInputData(res.data);
      // setImage(res.data.profile)
    } catch (error) {
      console.log("Error Users Single page");
    }
  };


  useEffect(() => {
    singleUser();
    if (image) {
      setPreview(URL.createObjectURL(image));
    }
  }, [image]);

  useEffect(() => {
    setTimeout(() => {
      SetShowSpin(false);
    }, 1500);
  }, []);


  const submitUserDate = (e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, location } = inputdata;

    if (fname === "") {
      toast.error("fill your first name");
    } else if (lname === "") {
      toast.error("Last name is Required");
    } else if (email === "") {
      toast.error("Email is Required");
    } else if (!email.includes("@")) {
      toast.error(" please fill your valid email");
    } else if (mobile === "") {
      toast.error("mobile number is Required");
    } else if (mobile.length > 10) {
      toast.error(" Please enter valid number");
    } else if (gender === "") {
      toast.error("gender is Required");
    } else if (status === "") {
      toast.error("Status is Required");
    } else if (image === "") {
      toast.error("Please Select Your Profile is Required");
    } else if (location === "") {
      toast.error("Location is Required");
    } else {
      toast.success("Registration done");
    }
  };
  return (
    <div>
      {
        showSpin ? <Spiner/> : <div className="container">
        <h2 className="text-center mt-1">Update Your Details</h2>
        <Card className="shadow mt-3 p-3">
          <div className="profile_div text-center">
            <img src={preview ? preview : "/man.png"} alt="img" />
          </div>
          <Form>
            <Row>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fname"
                  value={inputdata.fname}
                  onChange={setInputValue}
                  placeholder="Enter Your First Name"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={inputdata.lname}
                  onChange={setInputValue}
                  placeholder="Enter Your Last Name"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={inputdata.email}
                  onChange={setInputValue}
                  placeholder="Enter Your Email"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Your Mobile Number"
                  name="mobile"
                  value={inputdata.mobile}
                  onChange={setInputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Gander</Form.Label>
                <Form.Check
                  type={"radio"}
                  label={`male`}
                  name="gender"
                  value={"Male"}
                  onChange={setInputValue}
                />
                <Form.Check
                  type={"radio"}
                  label={`female`}
                  name="gender"
                  value={"Female"}
                  onChange={setInputValue}
                />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Status</Form.Label>
                <Select
                  options={options}
                  value={status}
                  onChange={setStatusValue}
                />
              </Form.Group>

              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Select Your Profile</Form.Label>
                <Form.Control
                  type="file"
                  name="user_profile"
                  onChange={setProfileValue}
                  placeholder="Select Your Profile"
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Label>Enter Your Location</Form.Label>
                <Form.Control
                  type="text"
                  onChange={setInputValue}
                  name="location"
                  value={inputdata.location}
                  placeholder="Enter Your Location"
                />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={submitUserDate}>
                Submit
              </Button>
            </Row>
          </Form>
        </Card>
        <ToastContainer position="top-center" />
      </div> 
      }
      
    </div>
  );
};
