import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

function NavBar() {
  const [tab,setTab] = useState(window.location.pathname)
  return (
    <nav className=" w-screen py-2 flex h-12  justify-center items-center gap-x-5 shadow font-medium ">
      <NavLink
        className={`${
          tab == "/" ? "bg-blue-600 py-1 px-2 rounded-lg text-white" : ""
        } transition-all duration-300`}
        onClick={() => setTab("/")}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={`${
          tab == "/dashboard"
            ? "bg-blue-600 py-1 px-2 rounded-lg text-white"
            : ""
        } transition-all duration-300`}
        onClick={() => setTab("/dashboard")}
        to="/dashboard"
      >
        Dashboard
      </NavLink>
    </nav>
  );
}

export default NavBar