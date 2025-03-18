import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function UpdatePatient() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        national_id: '',
        age: '',
        gender: '',
        phone: '',
        address: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/patient/${id}`)
            .then(response => setFormData(response.data))
            .catch(error => console.error('Error fetching patient data:', error));
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/patient/${id}/update/`, formData);
            toast.success("Pationte Updated Successfully ! 🎉");

            setTimeout(() => {
                navigate('/pationte');
            }, 4000);
        } catch (error) {
            console.error('Error updating patient:', error);
            alert('Failed to update patient. Please try again.');
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="flex flex-col justify-center">
                    <img className="h-auto max-w-full" src="/photo_1.jpg" alt="Patient illustration" />
                </div>
                <div>
                    <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <ToastContainer />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Update Patient Information</h2>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            {['name', 'national_id', 'age', 'phone', 'address'].map((field) => (
                                <div key={field}>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">{field.replace('_', ' ')}</label>
                                    <input 
                                        type={field === 'age' ? 'number' : 'text'}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded-lg"
                                        required
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <button 
                                type="submit"
                                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                            >
                                Update Patient
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
