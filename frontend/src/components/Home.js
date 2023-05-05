import React, { useState, useEffect, useRef, useContext } from "react";
import { HiMenu, hiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { client } from "../client";
import { userQuery } from "../utils/data";
import logo from "../assets/logoBlack.png";
import Sidebar from "./Sidebar";
import { UserContext } from "../Context/UserContext";

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const scrollRef = useRef(null);

  const { user, setUser } = useContext(UserContext);

  const userInfo =
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(`${userInfo?.sub}`);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSideBar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="profilePic" className="w-28" />
          </Link>
        </div>
        {toggleSideBar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSideBar(false)}
              />
            </div>
            <Sidebar user={user && user} closetoggle={setToggleSideBar} />
          </div>
        )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Outlet user={user} />
      </div>
    </div>
  );
};

export default Home;
