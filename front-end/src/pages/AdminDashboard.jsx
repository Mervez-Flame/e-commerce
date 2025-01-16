import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="max_padd_container py-32 bg-gray-200">
            <nav className="bg-blue-500 text-white p-12 rounded-xl shadow-inner">
                <div className="container mx-auto flex justify-between">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <div className="space-x-4">
                        <Link to="/admin/overview" className="hover:underline">
                            <h1 className='font-bold text-xl'>Overview</h1>
                        </Link>
                        <Link to="/admin/upload" className="hover:underline">
                            <h1 className='font-bold text-xl'>Upload Product</h1>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default AdminDashboard;
