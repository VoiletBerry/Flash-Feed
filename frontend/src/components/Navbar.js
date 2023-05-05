import React, { useContext } from "react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import SearchContext from "../Context/SearchContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="search"
          onFocus={() => navigate("/search")}
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <Link to={`user-profile/${user?._id}`} className="hidden md:block">
          <img src={user?.image} alt="user" className="w-14 h-12 rounded-2xl" />
        </Link>
        <Link
          to="create-card"
          className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
