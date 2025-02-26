/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useNavigate } from 'react-router-dom';
import logout from "../assets/logout.svg";
import user from "../assets/user.svg";
import NavBar from './NavBar';
import { MdClose, MdMenu } from 'react-icons/md';
import { FaOpencart } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';

const Header = ({ isLogin, setIsLogin, setIsLoading }) => {
    const [menuOpened, setmenuOpened] = useState(false);
    const toggleMenu = () => setmenuOpened(!menuOpened);
    const {getTotalCartItems} = useContext(ShopContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // ✅ Clear token if stored
        setIsLogin(false);
    };

    return (
        <header className='fixed top-0 left-0 m-auto max_padd_container w-screen bg-white ring-1 ring-slate-900/5 z-10'>
            <div className='px-4 flexBetween py-3 max-xs:px-2'>

                {/* logo */}
                <div>
                    <Link to='/'><img src={logo} alt="" className='w-[250px] ' /></Link>
                </div>

                {/* NavBar Desktop */}
                <NavBar containerStyles={"hidden lg:flex sm:justify-start gap-x-5  xl:gap-x-10 medium-15  "} isLogin={isLogin} setIsLogin={setIsLogin} />

                {/* Navbar Mobile  */}
                <NavBar containerStyles={`${menuOpened ?
                    "lg:hidden flex flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300"
                    :
                    "lg:hidden flex flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 -right-[100%]"}`} />

                {/* Buttons */}
                <div className='flexBetween gap-x-1 sm:gap-x-3 bold-16'>
                    {!menuOpened ? (<MdMenu className='lg:hidden cursor-pointer hover:text-secondary mr-2 p-1 ring-1 ring-slate-900/30 h-10 w-10 rounded-full hover:ring-secondary' onClick={toggleMenu}/>
                    ) : (
                        <MdClose className='lg:hidden cursor-pointer hover:text-secondary mr-2 p-1 ring-1 ring-slate-900/30 h-10 w-10 rounded-full hover:ring-secondary' onClick={toggleMenu}/>
                        )}
                        
                        <div className='flexBetween sm:gap-x-6 '>
                            <NavLink to={"cart-page"} className={"flex"}><FaOpencart className='p-1 h-8 w-8 ring-slate-900/30 ring-1 rounded-full'/><span className='relative flexCenter w-5 h-5 rounded-full bg-secondary text-white medium-14 -top-2'>{getTotalCartItems()}</span></NavLink>
                            {isLogin
                            ?
                            <NavLink to={'/logout'} onClick={handleLogout} className={'btn_secondary_rounded flexCenter max-sm:hidden'} ><img src={logout} alt="Logout Icon" height={19} width={19} />Logout</NavLink>
                            
                            :
                            <NavLink to={'/login'} className={'btn_secondary_rounded flexCenter max-sm:hidden'} ><img src={user} alt="User Icon" height={19} width={19}  />Login</NavLink>
}
                        </div>
                </div>
            </div>
        </header>
    )
}

export default Header