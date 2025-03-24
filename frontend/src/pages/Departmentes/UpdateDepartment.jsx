import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateDepartment() {
    const [departmentName, setDepartmentName] = useState('');
    const [hospital, setHospital] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // جلب بيانات القسم المحدد
        axios.get(`http://127.0.0.1:8000/api/departments/${id}`)
            .then(response => {
                setDepartmentName(response.data.department_name);
                setHospital(response.data.hospital);
                console.log(response.data);
            })
            .catch(error => console.error('Error fetching department data:', error));

        // جلب قائمة المستشفيات
        axios.get('http://127.0.0.1:8000/api/hospitals/')
            .then(response => setHospitals(response.data))
            .catch(error => console.error('Error fetching hospitals:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/departments/${id}/update/`, {
                department_name: departmentName,
                hospital
            });
            toast.success("Department Updated Successfully! 🎉");
            setTimeout(() => {
                navigate('/departments');
            }, 4000);
        } catch (error) {
            console.error('Error updating department:', error.response?.data || error.message);
            toast.error(`Failed to update department: ${error.response?.status || 'Unknown error'}`);
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
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Update Department</h2>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department Name</label>
                                <input
                                    type="text"
                                    value={departmentName}
                                    onChange={(e) => setDepartmentName(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hospital</label>
                                <select
                                    value={hospital}
                                    onChange={(e) => setHospital(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg"
                                >
                                    <option value="">Select a hospital</option>
                                    {hospitals.map(h => (
                                        <option key={h.id} value={h.id}>{h.hospital_name}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                            >
                                Update Department
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}