import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateHospital() {
    const [hospitalName, setHospitalName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Assuming the hospital ID is passed in the URL

    // Fetch hospital data when component mounts
    useEffect(() => {
        const fetchHospital = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/hospitals/${id}/`);
                const hospital = response.data;
                setHospitalName(hospital.hospital_name);
                setAddress(hospital.address || '');
                setPhoneNumber(hospital.phone_number || '');
                setEmail(hospital.email || '');
            } catch (error) {
                console.error('Error fetching hospital:', error);
                alert('Failed to load hospital data. Please try again.');
            }
        };
        fetchHospital();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/hospitals/${id}/update/`, { 
                hospital_name: hospitalName,
                address,
                phone_number: phoneNumber,
                email 
            });
            toast.success("Hospital Updated Successfully! 🎉");

            setTimeout(() => {
                navigate('/hospitals');
            }, 4000);
        } catch (error) {
            console.error('Error updating hospital:', error);
            alert('Failed to update hospital. Please try again.');
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="flex flex-col justify-center">
                    <img className="h-auto max-w-full" src="/photo_1.jpg" alt="Hospital illustration" />
                </div>
                <div>
                    <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                        <ToastContainer />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Update Hospital</h2>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hospital Name</label>
                                <input
                                    type="text"
                                    value={hospitalName}
                                    onChange={(e) => setHospitalName(e.target.value)}
                                    required
                                    maxLength={100}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    maxLength={255}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    maxLength={15}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    maxLength={100}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                            >
                                Update Hospital
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}