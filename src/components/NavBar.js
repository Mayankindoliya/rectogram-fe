import React from 'react'
import './NavBar.css'
import logo from '../images/logo.PNG';
// import link react router dom
import { NavLink, useNavigate } from 'react-router-dom'
// import useDispatch from react-Redux
import { useDispatch, useSelector } from 'react-redux'

const NavBar = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const user = useSelector(state => state.userReducer.user )
   //console.log(user)
   const logout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      dispatch({ type: "LOGIN_ERROR" });
      navigate("/login");

   }

   return (
      <div>
         <nav className="navbar bg-light shadow-sm">
            <div className="container-fluid">
               <NavLink className="navbar-brand ms-5" to='/'>
                  <img src={logo} alt='logo' height="45px" />
               </NavLink>

               <form className="d-flex me-md-5" role="search">
                  <input className="searchbox form-control me-2 text-muted" type="search" placeholder="Search" />
                  <a className="nav nav-link text-dark fs-5 searchIcon" href="/"><i className="fa-solid fa-magnifying-glass"></i></a>
                  <NavLink className="nav nav-link text-dark fs-5" to="/posts"><i className="fa-solid fa-house"></i></NavLink>
                  {user.fullName ? <a className="nav nav-link text-dark fs-5" href="/"><i className="fa-regular fa-heart"></i></a> : ''}
                  {/**Dropdown menu for profile logo: */}
                  <div className="dropdown">
                     {user.fullName ? <>   <NavLink className="btn" href="/" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown">
                        <img className='navbar-profile-pic' alt='profile-pic' src='https://plus.unsplash.com/premium_photo-1670596899123-c4c67735d77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' />
                     </NavLink>
                        <ul className="dropdown-menu">
                           <li> <NavLink className="dropdown-item mt-0" to="/myprofile">My Profile</NavLink></li>
                           <li><a className="dropdown-item" href="/" onClick={() => logout()}>
                              Logout
                           </a></li>
                        </ul> </> : ''}
                  </div>

               </form>
            </div>
         </nav>
      </div>
   )
}

export default NavBar