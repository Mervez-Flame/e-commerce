/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import product_rt_1 from '../assets/product_rt_1.png';
import product_rt_2 from '../assets/product_rt_2.png';
import product_rt_3 from '../assets/product_rt_3.png';
import product_rt_4 from '../assets/product_rt_4.png';
import { MdStar } from 'react-icons/md';
import { MdStarHalf } from "react-icons/md";
import { ShopContext } from './../context/ShopContext';
import { NavLink } from 'react-router-dom';



const ProductDisplay = (props) => {
    const [selectedSize, setSelectedSize] = useState('M');

    const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

    const { product } = props;

    const {addToCart} = useContext(ShopContext);

    return (
        <section>
            <div className='flex flex-col gap-14 xl:flex-row'>
                {/* left side */}
                <div className='flex gap-x-2 xl:flex-1'>
                    <div className='flex flex-col gap-[7px] flex-wrap'>
                        <img src={product_rt_1} alt="PrdImg" className='max-h-[99px]' />
                        <img src={product_rt_2} alt="PrdImg" className='max-h-[99px]' />
                        <img src={product_rt_3} alt="PrdImg" className='max-h-[99px]' />
                        <img src={product_rt_4} alt="PrdImg" className='max-h-[99px]' />
                    </div>
                    <div>
                        <img src={product.image} alt="" />
                    </div>
                </div>
                {/* right side */}
                <div className='flex flex-col xl:flex-[1.6]'>
                    <h3 className='h3'>{product.name}</h3>
                    <div className='flex text-secondary medium-22'>
                        <MdStar />
                        <MdStar />
                        <MdStar />
                        <MdStar />
                        <MdStarHalf />
                        <p>(299)</p>
                    </div>
                    <div className='flex gap-x-6 medium-20 my-4'>
                        <div className='line-through'>
                            {product.old_price}
                        </div>
                        <div className='text-secondary'>
                            {product.new_price}
                        </div>
                    </div>
                    <div className='mb-4'>
                            <h4 className='bold-16'>Select Size:</h4>
                            <div className='flex gap-4 my-3'>
                                {sizes.map((size) => (
                                    <div
                                        key={size}
                                        onClick={() => setSelectedSize(size)} // Set the selected size on click
                                        className={`ring-2 ${selectedSize === size ? 'ring-slate-900' : 'ring-slate-900/10'
                                            } h-10 w-10 flexCenter rounded-md cursor-pointer`}
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col  mb-4 gap-y-3'>
                                <button onClick={() => {addToCart(product.id)}} className='btn_dark_outline uppercase !rounded-none regular-14 tracking-widest bold-16'>Add to cart</button>
                                <NavLink to={'/cart-page'} className='btn_dark_rounded uppercase !rounded-none regular-14 tracking-widest bold-16 text-center'>Buy it now</NavLink>
                            </div>
                            <p><span className='medium-16 text-tertiary'>Category :</span> <span className='capitalize'>{product.category}</span> | Jacket | Winter</p>
                            <p><span className='medium-16 text-tertiary'>Tags :</span> Modern | Latest</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductDisplay;
