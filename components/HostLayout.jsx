import React from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import Header from './Header'

export default function HostLayout() {
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
}

  return (
  <>
    <nav className='host-nav'>
      <NavLink 
        to="."
        style={ ({ isActive }) => isActive ? activeStyle : null }
        end
      >Dashboard</NavLink>
      <NavLink 
        to="income"
        style={ ({ isActive }) => isActive ? activeStyle : null }
        end
      >Income</NavLink>
      <NavLink 
        to="vans"
        style={ ({ isActive }) => isActive ? activeStyle : null }
        end
      >Vans</NavLink>
      <NavLink 
        to="reviews"
        style={ ({ isActive }) => isActive ? activeStyle : null }
        end
      >Reviews</NavLink>
    </nav>
    <Outlet />
  </>
  )
}