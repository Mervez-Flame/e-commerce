import { useEffect, useState } from 'react';
import all_products from '../assets/all_products';
import { Link } from 'react-router-dom';


const AdminOverview = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="px-8 py-32 bg-gray-100 min-h-screen ">
            <h1 className="text-3xl font-bold mb-6 text-center">Product Overview</h1>
            <div className="flexCenter flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                    {all_products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white p-4 rounded shadow-md hover:shadow-lg"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full  object-cover rounded mb-4"
                            />
                            <h2 className="text-xl font-bold">{product.name}</h2>
                            <p className="text-sm text-gray-500">{product.category}</p>
                            <p className="text-green-500 font-semibold">
                                ₦{product.new_price}{' '}
                                <span className="line-through text-gray-500">
                                    ₦{product.old_price}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
                <div className='w-[60%] mt-10'>
                    <Link to={'/admin/upload'}>
                        <button className="bg-green-700 hover:bg-green-50 w-full px-10 py-6 rounded-full">
                            <h1 className='font-bold text-xl'>Upload</h1>
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default AdminOverview;
