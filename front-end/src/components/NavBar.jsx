/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from "react-router-dom";
import { MdCategory, MdContacts, MdHomeFilled, MdShop2 } from "react-icons/md";
// import logout from "../assets/logout.svg";
import user from "../assets/user.svg";
import { FaUser } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const NavBar = ({containerStyles, isLogin, setIsLogin}) => {
    return (
        <nav className={`${containerStyles}`}>
            <NavLink to={'/'} className={({isActive}) => isActive ? "active_link" : ""}>
                <div className='flexCenter gap-x-1'>
                    <MdHomeFilled/>Home
                </div>
            </NavLink>
            <NavLink to={'/mens'} className={({isActive}) => isActive ? "active_link" : ""}>
                <div className='flexCenter gap-x-1'>
                    <MdCategory/>Men&apos;s
                </div>
            </NavLink>
            <NavLink to={'/womens'} className={({isActive}) => isActive ? "active_link" : ""}>
                <div className='flexCenter gap-x-1'>
                    <MdShop2/>Women&apos;s
                </div>
            </NavLink>
            <NavLink to={'/kids'} className={({isActive}) => isActive ? "active_link" : ""}>
                <div className='flexCenter gap-x-1'>
                    <MdContacts/>Kid&apos;s
                </div>
            </NavLink>
            {isLogin && (
                <NavLink to={'/profile'} className={({ isActive }) => isActive ? "active_link" : ""}>
                    <div className='flexCenter gap-x-1'>
                        <FaUser />Profile
                    </div>
                </NavLink>
            )}
            <NavLink to={'login'} className={'btn_secondary_rounded flexCenter max-sm:flex md:hidden'} ><img src={user} alt="User Icon" height={19} width={19} />Login</NavLink>
        </nav>
    )
}

export default NavBar