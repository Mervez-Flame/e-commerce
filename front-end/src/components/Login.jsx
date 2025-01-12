import login from '../assets/Login.png'


const Login = ({ onBack }) => {
    return (
        <section className="flex justify-between w-screen h-screen  bg-[#fc823f] ">
            <div className='w-full h-[100%] max-sm:hidden'>
                <img src={login} alt="" />
            </div>
            <form className='w-full px-8 h-full font-bold text-[#000000]  justify-center items-center flex flex-col gap-2  max-sm:h-[100%]'>
                <div className='w-full flex flex-col px-12 py-16 max-sm:pb-10 max-sm:pt-5 gap-4 rounded-xl shadow-lg shadow-black' >
                    <h3 className='h3 text-[40px]'>Login</h3>
                    <div className="w-full items-center lg:text-[25px]">
                        <label htmlFor="">Username:</label>
                        <input className="w-full px-4 rounded-full" type="text" required name="username" placeholder='Enter your Username' />
                    </div>
                    <div className="w-full items-center lg:text-[25px]">
                        <label htmlFor="">Password:</label>
                        <input className="w-full px-4 rounded-full" type="text" required name="password" placeholder='Enter your Password' />
                    </div>
                    <div className='flex max-sm:flex-col max-sm:gap-2 justify-between items-center'>
                        <button className="btn_personal_orange group">
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
