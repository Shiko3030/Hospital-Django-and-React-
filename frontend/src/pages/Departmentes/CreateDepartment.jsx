import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CreateDepartment() {
    const [name, setName] = useState('');
    const [bedCount, setBedCount] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/departments/create/', { name, bed_count: bedCount });
            toast.success("Appointment Created Successfully ! 🎉");

            setTimeout(() => {
                navigate('/departments');
            }, 4000);
        }        
        
        
        catch (error) {
            console.error('Error creating department:', error);
            alert('Failed to create department. Please try again.');
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="flex flex-col justify-center">
                    <img className="h-auto max-w-full" src="/photo_1.jpg" alt="Department illustration" />
                </div>
                <div>
                    <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                        <ToastContainer />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Department</h2>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bed Count</label>
                                <input
                                    type="number"
                                    value={bedCount}
                                    onChange={(e) => setBedCount(Number(e.target.value))}
                                    min="0"
                                    required
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                            >
                                Create Department
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}