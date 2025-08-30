import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
    <div className="h-11 w-full bg-[#FF775C] flex flex-row gap-20 justify-center items-center text-blue-500 p-4 rounded-2xl text-lg font-semibold">
        <NavLink to={"/"}>
              Home
        </NavLink>
        <NavLink to={"/paste"}>
              Paste
        </NavLink>
    </div>
 
    </div>
  )
}

export default Navbar