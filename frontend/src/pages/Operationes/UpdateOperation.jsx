import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function UpdateOperation() {
    const { id } = useParams();
    const [patients, setPatients] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patient, setPatient] = useState('');
    const [doctor, setDoctor] = useState('');
    const [department, setDepartment] = useState('');
    const [operationType, setOperationType] = useState('');
    const [operationDate, setOperationDate] = useState('');
    const [status, setStatus] = useState('');
    const [cost, setCost] = useState('');
    const navigate = useNavigate();

    const OPERATION_STATUS = [
        { value: 'successful', label: 'Successful' },
        { value: 'failed', label: 'Failed' },
        { value: 'ongoing', label: 'Ongoing' }
    ];

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/operation/${id}`)
            .then(response => {
                const data = response.data;
                setPatient(data.patient);
                setDoctor(data.doctor);
                setDepartment(data.department);
                setOperationType(data.operation_type);
                setOperationDate(data.operation_date);
                setStatus(data.status);
                setCost(data.cost);
            })
            .catch(error => console.error('Error fetching operation:', error));

        axios.get('http://127.0.0.1:8000/api/patient/')
            .then(response => setPatients(response.data))
            .catch(error => console.error('Error fetching patients:', error));

        axios.get('http://127.0.0.1:8000/api/departments/')
            .then(response => setDepartments(response.data))
            .catch(error => console.error('Error fetching departments:', error));

        axios.get('http://127.0.0.1:8000/api/doctors/')
            .then(response => setDoctors(response.data))
            .catch(error => console.error('Error fetching doctors:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/operation/${id}/update/`, {
                patient,
                doctor,
                department,
                operation_type: operationType,
                operation_date: operationDate,
                status,
                cost
            });
            toast.success("Operation Updated Successfully ! 🎉");

            setTimeout(() => {
                navigate('/operation');
            }, 4000);
        }        

        catch (error) {
            console.error('Error updating operation:', error);
            alert('Failed to update operation. Please try again.');
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="flex flex-col justify-center">
                    <img className="h-auto max-w-full" src="/photo_1.jpg" alt="Operation illustration" />
                </div>
                <div>
                    <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                            <ToastContainer />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Update Operation</h2>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient</label>
                                <select value={patient} onChange={(e) => setPatient(e.target.value)} required className="w-full p-2 border rounded-lg">
                                    <option value="">Select a patient</option>
                                    {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Doctor</label>
                                <select value={doctor} onChange={(e) => setDoctor(e.target.value)} required className="w-full p-2 border rounded-lg">
                                    <option value="">Select Doctor</option>
                                    {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                                <select value={department} onChange={(e) => setDepartment(e.target.value)} required className="w-full p-2 border rounded-lg">
                                    <option value="">Select a department</option>
                                    {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Operation Type</label>
                                <input type="text" value={operationType} onChange={(e) => setOperationType(e.target.value)} required className="w-full p-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Operation Date</label>
                                <input type="datetime-local" value={operationDate} onChange={(e) => setOperationDate(e.target.value)} required className="w-full p-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cost</label>
                                <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} required className="w-full p-2 border rounded-lg" />
                            </div>
                            <button type="submit" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">Update Operation</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
