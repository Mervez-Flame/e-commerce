/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import login from '../assets/Login.png';
import { BsFillEyeFill } from 'react-icons/bs';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

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

const ErrorPopup = ({ message, onClose }) => {
    if (!message) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-80 text-center">
                <p className="text-red-500 font-bold text-lg">{message}</p>
                <button onClick={onClose} className="text-black mt-2">Close</button>
            </div>
        </div>
    );
};

const Login = ({ onBack, setIsLogin }) => {
    const [see, setSee] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

        // ✅ Check if user is already logged in
        useEffect(() => {
            const token = localStorage.getItem('token');
        
            if (token) {
                const checkToken = async () => {
                    try {
                        const res = await axios.post('https://e-commerce-1-ttx6.onrender.com/verify-token', { token });
                        if (!res.data.valid) {
                            localStorage.removeItem('token');
                            setIsLogin(false);
                        }
                    } catch (error) {
                        localStorage.removeItem('token');
                        setIsLogin(false);
                    }
                };
        
                checkToken();
        
                const interval = setInterval(checkToken, 1000 * 60 * 55); // Check every 55 minutes
                return () => clearInterval(interval);
            }
        }, []);
        

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess('');
    
        if (!email || !password) {
            setError('Please fill in the required fields');
            setLoading(false);
            return;
        }
    
        try {
            const res = await axios.post('https://e-commerce-1-ttx6.onrender.com/login', { email: email, password: password }, { withCredentials: true });
    
            setSuccess(res.data.message);
            setIsLogin(true);
    
            // ✅ Store token in localStorage
            localStorage.setItem('token', res.data.token);
    
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <section className="flex justify-center items-center w-screen h-screen bg-[#222020]">
            {success && <SuccessPopup message={success} />}
            {error && <ErrorPopup message={error} onClose={() => setError('')} />}

            <div className='w-full h-[80%] hidden lg:flex justify-center'>
                <img src={login} alt="" />
            </div>

            <form onSubmit={handleLogin} className='w-full px-8 h-full font-bold text-[#ffffff] flex flex-col gap-2 justify-center items-center max-sm:h-[100%]'>
                {loading && <h4>Loading...</h4>}

                <div className='w-full flex flex-col px-12 py-16 max-sm:pb-10 max-sm:pt-5 gap-4 rounded-xl shadow-md shadow-[#fc823f]'>
                    <h3 className='h3 text-[40px]'>Login</h3>

                    <div className="w-full items-center lg:text-[25px]">
                        <label>E-mail:</label>
                        <input 
                            className="w-full px-4 rounded-full text-black lg:text-[20px]" 
                            type="email" 
                            required 
                            name="email" 
                            value={email} 
                            onChange={(event) => setEmail(event.target.value)} 
                            placeholder='Enter your E-mail' 
                        />
                    </div>

                    <div className="w-full items-center text-black lg:text-[25px] relative">
                        <label className='!text-white'>Password:</label>
                        <button 
                            type="button" 
                            className='absolute right-4 lg:top-12 md:top-[25px] text-xl'
                            onClick={() => setSee(!see)}
                        >
                            {see ? <AiFillEyeInvisible /> : <BsFillEyeFill />}
                        </button>
                        <input 
                            type={see ? "password" : "text"} 
                            value={password} 
                            onChange={(event) => setPassword(event.target.value)} 
                            className='w-full px-4 rounded-full lg:text-[20px]' 
                            required 
                            name="password" 
                            placeholder='Enter your Password' 
                        />
                    </div>

                    <div className='flex max-sm:flex-col max-sm:gap-2 justify-between items-center'>
                        <button type="submit" className="btn_personal_orange group !py-2 !text-white !bg-[#222020]">
                            <span className="">Login</span>
                        </button>
                        <span className='font-bold lg:text-[20px]'>Forgot Password?</span>
                    </div>
                </div>

                <span className='font-bold lg:text-[30px] hover:text-black transition duration-700 cursor-pointer text-white pt-4' onClick={onBack}>
                    Back to Sign Up
                </span>
            </form>
        </section>
    );
}

export default Login;