import { useState } from 'react';
import axios from 'axios';
import login from '../assets/Login.png'
import { BsFillEyeFill } from 'react-icons/bs';
import { AiFillEyeInvisible } from 'react-icons/ai';
import {  useNavigate } from 'react-router-dom';

const Login = ({ onBack, setIsLogin }) => {
    const [see, setSee] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (email && password) {
            setLoading(true);
            axios.get('https//localhost:4000/login', {
                password: password,
                email: email,
            })
                .then(res => {
                    console.log(res.data.message);
                    setSuccess(res.data.message);
                    setIsLogin(true);
                    navigate('/');

                })
                .catch(error => {
                    console.log(error.response);
                    setError(error.response);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
        else {
            setError('Please fill in the required field')
        }
    }

    const handleLogin = (event) => {
        event.preventDefault()
        handleSubmit()
    }


    const passwordShow = (e) => {
        e.preventDefault()
        setSee(!see)
    }

    return (
        <section className="flex justify-between w-screen h-screen  bg-[#fc823f] ">

            <div className='w-full h-[100%] max-sm:hidden'>
                <img src={login} alt="" />
            </div>
            <form className='w-full px-8 h-full font-bold text-[#000000]  justify-center items-center flex flex-col gap-2  max-sm:h-[100%]'>
                {loading && <h4>Loading...</h4>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <div className='w-full flex flex-col px-12 py-16 max-sm:pb-10 max-sm:pt-5 gap-4 rounded-xl shadow-lg shadow-black' >
                    <h3 className='h3 text-[40px]'>Login</h3>
                    <div className="w-full items-center lg:text-[25px]">
                        <label htmlFor="">E-mail:</label>
                        <input className="w-full px-4 rounded-full" type="email" required name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder='Enter your E-mail' />
                    </div>
                    <div className="w-full items-center lg:text-[25px]">
                        <label htmlFor="">Password:</label>
                        <button className='right-20 flex items-center text-center pt-1 pr-2 absolute z-10' onClick={passwordShow}>
                            {
                                !see ?
                                    <BsFillEyeFill />
                                    :
                                    <AiFillEyeInvisible />
                            }
                        </button>
                        <input type={see ? "password" : "text"} value={password} onChange={(event) => setPassword(event.target.value)} className='relative w-full px-4 rounded-full' required name="password" placeholder='Enter your Password' />
                    </div>
                    <div className='flex max-sm:flex-col max-sm:gap-2 justify-between items-center'>
                        <button className="btn_personal_orange group" onClick={handleLogin}>
                            <span className="btn_personal_login"></span>
                            <span className="btn_personal_span2">Login</span>
                        </button>
                        <span className='font-bold lg:text-[20px]'>Forgot Password?</span>
                    </div>
                </div>
                <span className='font-bold lg:text-[30px] cursor-pointer text-white pt-4' onClick={onBack}>Back to Sign Up</span>
            </form>

        </section>
    );
}

export default Login;
