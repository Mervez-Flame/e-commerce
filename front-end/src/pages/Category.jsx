/* eslint-disable react/prop-types */
import all_products from './../assets/all_products';
import Image from "../components/Image";
import Dropdown from "../components/Dropdown.jsx";

const Category = ({ category, banner }) => {
    console.log("Current category:", category);  // Add this
    console.log("All products:", all_products);
    return (
        <section className="max_padd_container py-12 xl:py-28 bg-gray-10">
            <div className="">
                <div>
                    <img src={banner} alt="" className="block my-7 mx-auto" />
                </div>
                <div className="flexBetween my-8 mx-2"> 
                    <h5><span className="font-bold">Showing 12</span> out of 36 products</h5>
                    {/* <div className="flex items-center justify-between max-sm:px-4 gap-x-4 px-8 py-2 ring-1 rounded-lg ring-neutral-900">Sort by <FaChevronDown /></div> */}
                    <Dropdown/>
                </div>
                {/* Container  */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-4">
                    {all_products.map((product) => {
                        if (category === product.category) {
                            return (
                                <Image 
                                    key={product.id}
                                    id={product.id} 
                                    image={product.image} 
                                    name={product.name} 
                                    newPrice={product.new_price} 
                                    oldPrice={product.old_price} 
                                />
                            )
                        } 
                    })}
                </div>
                <div className="mt-16 text-center">
                <button className="btn_personal_black group">
                    <span className="btn_personal_span"></span>
                    <span className="btn_personal_span1">
                        Load More
                    </span>
                </button>
                </div>
            </div>
        </section>
    )
}

export default Category