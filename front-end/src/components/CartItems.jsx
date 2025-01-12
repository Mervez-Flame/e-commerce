import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { TbTrash } from 'react-icons/tb'


const CartItems = () => {

    const { getTotalCartAmount, all_products, cartItems, removeFromCart } = useContext(ShopContext);


    return (
        <section className='max_padd_container pt-28'>
            <table className='w-full mx-auto'>
                <thead>
                    <tr className='bg-slate-900/10 regular-18 sm:regular-22 text-start py-12'>
                        <th className='px-1 py-2'>Products</th>
                        <th className='px-1 py-2'>Title</th>
                        <th className='px-1 py-2'>Price</th>
                        <th className='px-1 py-2'>Quantity</th>
                        <th className='px-1 py-2'>Total</th>
                        <th className='px-1 py-2'>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {all_products.map((e) => {
                        if (cartItems[e.id] > 0) {
                            return <tr key={e.id} className='border-b border-slate-900/10 p-6 medium 14 text-center'>
                                <td className='p-3 py-6 flexCenter'><img src={e.image} alt="Product Image" className='rounded-lg ring-1 ring-slate-900/5 ' width={50} height={50} /></td>
                                <td className='p-3 py-6'><div className='line-clamp-3'>{e.name}</div></td>
                                <td className='p-3 py-6'>₦{e.new_price}</td>
                                <td className='p-3 py-6 bold-22'>{cartItems[e.id]}</td>
                                <td className='p-3 py-6'>₦{e.new_price * cartItems[e.id]}</td>
                                <td className=''>
                                    <div className='pl-16'><TbTrash size={22} onClick={() => removeFromCart(e.id)} /></div>
                                </td>
                            </tr>
                        }
                        else {
                            <h1 className='h1 flexCenter'>Your cart is empty!</h1>
                        }
                    })}
                </tbody>
            </table>
            {/* Cart Details */}
            <div className='flex flex-col my-16 p-8 md:flex-row rounded-md bg-slate-900/5 w-full max-w-[666px]'>
                <div className='flex flex-col gap-10 w-full'>
                    <h4 className="bold-22">Order Summary</h4>
                    <div>
                        <div className='flexBetween py-4'>
                            <h4 className="medium-16">Subtotal:</h4>
                            <h4 className="medium-12 text-gray-30">₦{getTotalCartAmount()}</h4>
                        </div>
                        <hr color='#ffffff' />
                        <div className='flexBetween py-4'>
                            <h4 className="medium-16">Shipping Fee:</h4>
                            <h4 className="medium-12 text-gray-30">Free</h4>
                        </div>
                        <hr color='#ffffff' />
                        <div className='flexBetween py-4'>
                            <h4 className="bold-18">Total:</h4>
                            <h4 className="bold-18">₦{getTotalCartAmount()}</h4>
                        </div>
                    </div>
                    <button className="btn_personal_black group w-44">
                        <span className="btn_personal_span"></span>
                        <span className="btn_personal_span1">Checkout</span>
                    </button>
                    <div className='flex flex-col gap-10'>
                        <h4 className='bold-20 capitalize'>Your coupon code enter here:</h4>
                        <div className='flexBetween pl-5 h-12 bg-slate-900/10 rounded-full ring-1 ring-slate-900/15'>
                            <input type="text" className='bg-transparent border-none outline-none ' placeholder='Coupon Code' />
                            <button className="btn_personal_black group">
                                <span className="btn_personal_span"></span>
                                <span className="btn_personal_span1">Submit</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CartItems