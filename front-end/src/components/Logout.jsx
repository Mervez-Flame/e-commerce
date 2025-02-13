import { NavLink } from "react-router-dom";

const Logout = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
            <div className="bg-[#fc823f] text-black p-6 rounded-lg shadow-md w-full max-w-lg text-center">
                <h1 className="text-2xl text-black font-bold">You are logged out</h1>
                <p className="mt-2 text-black text-lg font-semibold">Logout successful</p>
                <p className="mt-2 text-black">
                    You have successfully logged out of the <strong>Style Haven Central Authentication Service</strong>.
                    You may <NavLink to={'/login'} className='underline text-[#0000FF]' >log in</NavLink> again.
                </p>
                <p className="mt-2 text-black">For security reasons, exit your web browser.</p>
            </div>
        </div>
    );
};

export default Logout;
