import { useState } from 'react';

const NewsLetter = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add any additional logic for form submission, such as an API call
        console.log('Email:', email);
        console.log('Name:', name);
        alert("You've subscribed successfully!");
    };

    return (
        <section className="max_padd_container py-12 xl:py-28 bg-white">
            <form
                onSubmit={handleSubmit}
                className="mx-auto xl:w-[80%] flexCenter flex-col gap-y-8 w-full max-w-[666px]">
                <h3 className="h3 capitalize">Get Exclusive Offers on your email</h3>
                <h4 className="uppercase bold-18">Subscribe to our newsletter, and get the latest news and offers!</h4>
                <div className="flex flex-col w-full gap-4 rounded-full">
                    <input
                        className="py-3 bg-gray rounded-full px-3 border-2 hover:border-[#000000] hover:bg-gray-10 hover:text-gray-10"
                        required
                        type="email"
                        placeholder="Enter your email!"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="py-3 bg-gray rounded-full px-3 border-2 hover:border-[#000000] hover:bg-gray-10 hover:text-gray-10"
                        required
                        type="text"
                        placeholder="Enter your name!"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button className="btn_personal_black group">
                        <span className="btn_personal_span_angle"></span>
                        <span className="btn_personal_span_angles">Subscribe</span>
                    </button>
                </div>
            </form>
        </section>
    );
};

export default NewsLetter;
