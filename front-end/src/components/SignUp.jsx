// import { useContext } from "react";
// import { CredentialsContext } from "../pages/Credentials";
import login from '../assets/Login.png'



const SignUp = ({ onLogin }) => {


    return (
        <section className="flex justify-center items-center w-screen h-screen bg-[#fc823f] ">
            <form className='w-full px-8 h-full font-bold text-[#000000]  justify-center items-center flex gap-2  max-sm:h-[100%] '>
                <div className="w-full flex flex-col gap-4 px-12 py-16 max-sm:pb-10 max-sm:pt-5 rounded-xl shadow-black shadow-lg">
                    <h3 className='h3 text-[40px]'>Sign Up</h3>
                        <div className="w-full items-center lg:text-[20px]">
                            <label>Name:</label>
                            <input className="w-full px-4 rounded-full" type="text" required name="name" placeholder='Enter your Name' />
                        </div>
                        <div className="w-full items-center lg:text-[20px]">
                            <label>Username:</label>
                            <input className="w-full px-4 rounded-full" type="text" required name="username" placeholder='Enter your Username' />
                        </div>
                        <div className="w-full items-center lg:text-[20px]">
                            <label>E-mail:</label>
                            <input className="w-full px-4 rounded-full" type="email" required name="email" placeholder='Enter your Email' />
                        </div>
                        <div className="w-full items-center lg:text-[20px]">
                            <label>Password:</label>
                            <input className="w-full px-4 rounded-full" type="text" required name="password" placeholder='Enter your Password' />
                        </div>
                        <div className="w-full items-center lg:text-[20px]">
                            <label>Confirm Password:</label>
                            <input className="w-full px-4 rounded-full" type="text" required placeholder='Repeat your Password' />
                        </div>
                    <div className='flex gap-4'>
                        <input type="checkbox" required name="" id="" />
                        <p className='text-[#000000] lg:text-[20px]'>By continuing I agree to the terms of use and privacy policy.</p>
                    </div>
                    <div className="flex lg:flex-row flex-col max-sm:gap-2 justify-between items-center">
                        <button className="btn_personal_orange group">
                            <span className="btn_personal_login"></span>
                            <span className="btn_personal_span2">Sign Up</span>
                        </button>
                        <p className='text-[#000000] font-bold lg:text-[20px]'>Already have an account? <span className="text-white hover:text-black transition duration-700 cursor-pointer" onClick={onLogin}>Login</span></p>
                    </div>

                </div>
            </form>
            <div className='w-full h-[100%] max-sm:hidden'>
                <img src={login} alt="" />
            </div>
        </section >

    )
}

export default SignUp