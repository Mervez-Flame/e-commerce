/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { POPULAR } from '../assets/data';
import { BsArrowsFullscreen } from "react-icons/bs";
import Image from './Image';


const Popular = () => {
    return (
        <section className='bg-primary pb-24'>
            <div className='max_padd_container py-12 xl:w-[100%]'>
                <h3 className='h3 text-center'>Popular Products</h3>
                <hr className='h-[3px] md:w-1/2 mx-auto bg-gradient-to-l from-transparent via-black to-transparent mb-10 '/>
                {/* My Container */}
                <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {POPULAR.map((product) => (
                        <Image key={product.id}  id={product.id} image={product.image} name={product.name} newPrice={product.new_price} oldPrice={product.old_price} />
                    ))}
                </div>
            </div>
        </section>
    )
}




export default Popular