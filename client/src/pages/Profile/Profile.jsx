import React, { useEffect, useState } from "react";
import "./profile.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import { Spiner } from "../../Components/Spiner/Spiner";
import { useParams } from "react-router-dom";
import { getSingleUserData } from "../../services/Apis";
import { BACKEND_URL } from "../../services/helper";

export const Profile = () => {
  const [showSpin, SetShowSpin] = useState(true);
  const [ userProfile, setUserProfile] = useState({})

  const { id } = useParams();

  const singleUser = async () => {
    try {
      const res = await getSingleUserData(id);
      console.log("res from signle", res.data);
      setUserProfile(res.data)
    } catch (error) {
      console.log("Error Users Single page");
    }
  };

  useEffect(() => {
    singleUser();
    setTimeout(() => {
      SetShowSpin(false);
    }, 1500);
  }, []);

  return (
    <>
     <h1>Profile Page</h1>
      {showSpin ? (
        <Spiner />
      ) : (
        <div className="container">
         
          <Card className="card-profile shadow col-lg-6 mx-auto mt-5">
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <img src={`${BACKEND_URL}/uploads/${userProfile.profile}`} alt="" />
                  </div>
                </div>
              </Row>
              <div className="text-center">
                <h3>{userProfile.fname}</h3>
                <h4>
                  <i className="fa-solid fa-envelope email"></i>&nbsp;:-{" "}
                  <span>{userProfile.email}</span>{" "}
                </h4>
                <h5>
                  <i className="fa-solid fa-mobile"></i>&nbsp;:-{" "}
                  <span>{userProfile.mobile}</span>{" "}
                </h5>
                <h4>
                  <i className="fa-solid fa-person"></i>&nbsp;:-{" "}
                  <span>{userProfile.gender}</span>{" "}
                </h4>
                <h4>
                  <i className="fa-solid fa-location-pin location"></i>&nbsp;:-{" "}
                  <span>{userProfile.location}</span>{" "}
                </h4>
                <h4>
                  Status&nbsp;:- <span>{userProfile.status}</span>{" "}
                </h4>
                <h5>
                  <i className="fa-solid fa-calendar-days calendar"></i>
                  &nbsp;Date Created&nbsp;:- <span>{userProfile.dateCreated}</span>{" "}
                </h5>
                <h5>
                  {" "}
                  <i className="fa-solid fa-calendar-days calendar"></i>
                  &nbsp;Date Updated&nbsp;:- <span>{userProfile.dateUpdated}</span>{" "}
                </h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};
