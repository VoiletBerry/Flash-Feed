import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logo.png";
import jwt_decode from "jwt-decode";
import { client } from "./../client";

const Login = () => {
  const navigate = useNavigate();

  const handleCredentialResponse = (res) => {
    var userObject = jwt_decode(res.credential);
    const { name, picture, sub } = userObject;

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client
      .createIfNotExists(doc)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    /*  global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInButton"), {
      theme: "outline",
      size: "large",
    });

    // google.accounts.id.prompt();
  }, []);

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5 justify-center flex flex-col">
            <img src={logo} width="150px" className=" ml-2" alt="logo" />
            <div id="signInButton" className="p-2 mt-2"></div>
          </div>

          <div className="shadow-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
