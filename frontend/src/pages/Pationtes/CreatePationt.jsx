import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CreatePatient() {
    const [name, setName] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { name, national_id: nationalId, age, phone, address, gender };
        try {
            await axios.post('http://127.0.0.1:8000/api/patient/create/', payload);
            toast.success("Pationte Created Successfully ! 🎉");

            setTimeout(() => {
                navigate('/pationte');
            }, 4000);
        } catch (error) {
            if (error.response && error.response.data) {
                const errors = error.response.data;
                let errorText = "";
                if (typeof errors === 'object') {
                    for (let key in errors) {
                        errorText += `${key}: ${errors[key].join(", ")}`;
                    }
                } else {
                    errorText = "Failed to create patient. Please try again.";
                }
                setErrorMessage(errorText.trim());
            } else {
                setErrorMessage("Failed to create patient. Please try again.");
            }
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
                        {errorMessage && <div className="err">{errorMessage}</div>}
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Patient</h2>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required className="w-full p-2 border rounded-lg" />
                            <input type="text" value={nationalId} onChange={(e) => setNationalId(e.target.value)} placeholder="National ID" required className="w-full p-2 border rounded-lg" />
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required className="w-full p-2 border rounded-lg" />
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required className="w-full p-2 border rounded-lg" />
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required className="w-full p-2 border rounded-lg" />
                            <select value={gender} onChange={(e) => setGender(e.target.value)} required className="w-full p-2 border rounded-lg">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <button type="submit" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">
                                Create Patient
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
