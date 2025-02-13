// import { useContext } from "react";
// import { CredentialsContext } from "../pages/Credentials";
import { useState } from 'react';
import axios from 'axios';
// import { Link } from "react-router-dom";
import login from '../assets/Login.png'
// import { AiFillEyeInvisible } from 'react-icons/ai';
// import { BsFillEyeFill } from 'react-icons/bs';

const SuccessPopup = ({ message }) => {
    if (!message) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-80 text-center">
                <p className="text-green-600 font-bold text-lg">{message}</p>
            </div>
        </div>
    );
};

const SignUp = ({ onLogin, setShowLogin }) => {
    // const [see, setSee] = useState(true);
    const [name, setName] = useState('');
    const [username, setuserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess('');

        try {
            const res = await axios.post("http://localhost:4000/signup", {
                name: name,
                username: username, // Match this with the database field
                email: email,
                password: password,
            });

            setSuccess(res.data.message);
            setName('');
            setuserName('');
            setEmail('');
            setPassword('');
            setTimeout(() => {
                setShowLogin(true);
            }, 3000);
        } catch (error) {
            setError(error.response);
        } finally {
            setLoading(false);
        }
    };

    const hasNumber = /\d/.test(password);
    const isValidLength = password.length >= 8 && password.length <= 256;

    return (
        <section className="flex justify-center items-center w-screen h-screen bg-[#222020]">
            {success && <SuccessPopup message={success} onClose={() => setSuccess('')} />}
            {success && <SuccessPopup message={error} onClose={() => setSuccess('')} />}
            <form className='w-full px-8 h-full font-bold text-[#000000]  justify-center items-center flex gap-2  max-sm:h-[100%] ' onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-4 px-12 py-16 max-sm:pb-10 max-sm:pt-5 rounded-xl shadow-[#fc823f] shadow-md text-[#ffffff]">
                    {loading && <h4 className='bold text-[20px] font-[20px]'>Loading...</h4>}
                    <h3 className='h3 text-[40px]'>Sign Up</h3>
                    <div className="w-full items-center lg:text-[20px]">
                        <label>Name:</label>
                        <input className="w-full px-4 rounded-full text-black " type="text" required value={name} onChange={(event) => setName(event.target.value)} name="name" placeholder='Enter your Name' />
                    </div>
                    <div className="w-full items-center lg:text-[20px]">
                        <label>Username:</label>
                        <input className="w-full px-4 rounded-full text-black" type="text" required value={username} onChange={(event) => setuserName(event.target.value)} name="username" placeholder='Enter your Username' />
                    </div>
                    <div className="w-full items-center lg:text-[20px]">
                        <label>E-mail:</label>
                        <input className="w-full px-4 rounded-full text-black" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} name="email" placeholder='Enter your Email' />
                    </div>
                    <div className="w-full items-center lg:text-[20px] ">
                        <label>Password:</label>
                        <div className="flex flex-col gap-1">
                            <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full px-4 rounded-full text-black" required name="password" placeholder='Enter your Password'
                            />
                            <p className='text-white flex items-center'>{isValidLength ? <span className="text-green-500">✅</span> : <span className="text-red-500">❌</span>} *Password can be between 8-256 letters</p>
                            <p className='text-white flex items-center'>{hasNumber ? <span className="text-green-500">✅</span> : <span className="text-red-500">❌</span>} *Must contain a number</p>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <input type="checkbox" required name="" id="" />
                        <p className='text-[#ffffff] lg:text-[20px]'>By continuing I agree to the terms of use and privacy policy.</p>
                    </div>
                    <div className="flex lg:flex-row flex-col max-sm:gap-2 justify-between items-center">
                        <button className="btn_personal_orange group !py-2 !text-white !bg-[#222020]">
                            <span className="">Sign Up</span>
                        </button>
                        <p className='text-[#ffffff] font-bold lg:text-[20px]'>Already have an account? <span className="text-white hover:text-black transition duration-700 cursor-pointer" onClick={onLogin}>Login</span></p>
                    </div>

                </div>
            </form>
            <div className='w-full h-[80%] hidden md:flex justify-center'>
                <img src={login} alt="" />
            </div>


        </section >

    )
}

export default SignUp