import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function UpdateEmployee() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [jobType, setJobType] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [phone, setPhone] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();

    const JOB_TYPES = [
        { value: 'doctor', label: 'Doctor' },
        { value: 'nurse', label: 'Nurse' },
        { value: 'staff', label: 'Staff' }
    ];

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/departments/')
            .then(response => setDepartments(response.data))
            .catch(error => console.error('Error fetching departments:', error));

        axios.get(`http://127.0.0.1:8000/api/employees/${id}`)
            .then(response => {
                const data = response.data;
                setName(data.name);
                setNationalId(data.national_id);
                setJobType(data.job_type);
                setSpecialization(data.specialization);
                setPhone(data.phone);
                setHireDate(data.hire_date);
                setDepartment(data.department);
            })
            .catch(error => console.error('Error fetching employee details:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/employees/${id}/update/`, {
                name,
                national_id: nationalId,
                job_type: jobType,
                specialization,
                phone,
                hire_date: hireDate,
                department
            });
            toast.success("Employee Updated Successfully ! 🎉");

            setTimeout(() => {
                navigate('/employee');
            }, 4000);
        } catch (error) {
            console.error('Error updating employee:', error);
            alert('Failed to update employee. Please try again.');
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="flex flex-col justify-center">
                    <img className="h-auto max-w-full" src="/photo_1.jpg" alt="Employee illustration" />
                </div>
                <div>
                    <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                    <ToastContainer />
        
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Employee</h2>
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
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">National ID</label>
                                <input
                                    type="text"
                                    value={nationalId}
                                    onChange={(e) => setNationalId(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Type</label>
                                <select
                                    value={jobType}
                                    onChange={(e) => setJobType(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg"
                                >
                                    <option value="">Select a job type</option>
                                    {JOB_TYPES.map(job => (
                                        <option key={job.value} value={job.value}>{job.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Specialization</label>
                                <input
                                    type="text"
                                    value={specialization}
                                    onChange={(e) => setSpecialization(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hire Date</label>
                                <input
                                    type="date"
                                    value={hireDate}
                                    onChange={(e) => setHireDate(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                <select
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg"
                                >
                                    <option value="">Select a department</option>
                                    {departments.map(d => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}