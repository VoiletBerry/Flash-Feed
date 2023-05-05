import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import { useContext } from "react";
import SearchContext from "./../Context/SearchContext";

const Body = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
          <Navbar />
        </SearchContext.Provider>
      </div>
      <div className="h-full">
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
          <Outlet />
        </SearchContext.Provider>
      </div>
    </div>
  );
};

export default Body;
