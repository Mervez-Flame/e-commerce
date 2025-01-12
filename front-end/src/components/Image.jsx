import { Link } from "react-router-dom";
import { BsArrowsFullscreen } from 'react-icons/bs'


const Image = ({ id, image, name, newPrice, oldPrice }) => {
    return (
        <div className='rounded-xl overflow-hidden shadow-lg'>
            <div className='relative flexCenter group overflow-hidden transition-all duration-100'>
                <Link to={`/product/${id}`} className='h-12 w-12 bg-white rounded-full flexCenter absolute top-1/2 bottom-1/2 !py-2 z-20 scale-0 group-hover:scale-100 transition-all duration-700'><BsArrowsFullscreen className='hover:rotate-180 hover:scale-125 transition-all duration-200' /></Link>
                <img onClick={window.scrollTo(0,0)} src={image} alt={name} className='w-full block object-cover group-hover:scale-110 transition-all duration-1000' />
            </div>
            <div className='p-4 overflow-hidden'>
                <p className='my-[6px] medium-16 line-clamp-2 capitalize'>{name}</p>
                <div className='flex gap-5'>
                    <p className='bold-16'>New Price: ₦{newPrice}</p>
                    <p className='text-secondary bold-16'>Old Price: <s>₦{oldPrice}</s></p>
                </div>
            </div>
        </div>
    )
}

export default Image



// const Item = ({ id, name, image, newPrice, oldPrice }) => {

//     return (
//         <div>
//             <div>
//                 <Link to={`product/${id}`}></Link>
//                 <img src={image} alt={name} />
//             </div>
//             <div>
//                 <h4>{name}</h4>
//                 <div>
//                     <div>{oldPrice}</div>
//                 </div>
//             </div>
//         </div>
//     )
// }