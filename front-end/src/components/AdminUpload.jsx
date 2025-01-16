import { useState } from 'react';

const AdminUpload = () => {
    const [product, setProduct] = useState({
        id: '',
        name: '',
        category: '',
        new_price: '',
        old_price: '',
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Upload image
        const formData = new FormData();
        formData.append('product', product.image);

        try {
            const imageUploadRes = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });
            const imageUploadData = await imageUploadRes.json();

            // Send product data
            const productData = {
                ...product,
                image: imageUploadData.image_url,
            };

            const productRes = await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            const responseData = await productRes.json();
            console.log(responseData);
            alert('Product added successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong!');
        }
    };

    return (
        <div className="px-8 py-32  bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">Upload New Product</h1>
            <form
                className="  w-full h-full  bg-[#fc823f] p-6 rounded shadow-md max-w-md mx-auto"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Product ID</label>
                    <input
                        type="number"
                        name="id"
                        value={product.id}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-full "
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-full "
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-full "
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">New Price</label>
                    <input
                        type="number"
                        name="new_price"
                        value={product.new_price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-full "
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Old Price</label>
                    <input
                        type="number"
                        name="old_price"
                        value={product.old_price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-full "
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border rounded-full "
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Upload Product
                </button>
            </form>
        </div>
    );
};

export default AdminUpload;
