import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CreateAppointment() {
    const [patients, setPatients] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patient, setPatient] = useState('');
    const [doctor, setDoctor] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const [hospital, setHospital] = useState('');
    const [department, setDepartment] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [status, setStatus] = useState('confirmed'); // Default to 'confirmed'
    const navigate = useNavigate();

    const STATUS_CHOICES = [
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'completed', label: 'Completed' }
    ];

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/patient/')
            .then(response => setPatients(response.data))
            .catch(error => console.error('Error fetching patients:', error));
            
            axios.get('http://127.0.0.1:8000/api/hospitals/')
            .then(response => setHospitals(response.data))
            .catch(error => console.error('Error fetching hospitals:', error));

        axios.get('http://127.0.0.1:8000/api/departments/')
            .then(response => setDepartments(response.data))
            .catch(error => console.error('Error fetching departments:', error));

        axios.get('http://127.0.0.1:8000/api/doctors/')
            .then(response => setDoctors(response.data))
            .catch(error => console.error('Error fetching doctors:', error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/appointment/create/', {
                patient,
                doctor,
                hospital,
                department,
                appointment_date: appointmentDate,
                status
            });

            toast.success("Appointment Created Successfully! 🎉");
            setPatient('');
            setDoctor('');
            setHospital('');
            setDepartment('');
            setAppointmentDate('');
            setStatus('confirmed');
            setTimeout(() => {
                navigate('/appointment'); // Fixed typo
            }, 4000);
        } catch (error) {
            console.error('Error creating appointment:', error);
            toast.error("Failed to create appointment. Please try again.")
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="flex flex-col justify-center">
                    <img className="h-auto max-w-full" src="/photo_1.jpg" alt="Appointment illustration" />
                </div>
                <div>
                    <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                              <ToastContainer />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Appointment</h2>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Patient</label>
                                <select
                                    value={patient}
                                    onChange={(e) => setPatient(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg"
                                >
                                    <option value="">Select a patient</option>
                                    {patients.map(p => (
                                        <option key={p.id} value={p.id}>{`${p.first_name} ${p.last_name}`}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Doctor</label>
                                <select
                                    value={doctor}
                                    onChange={(e) => setDoctor(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg"
                                >
                                    <option value="">Select a doctor</option>
                                    {doctors.map(d => (
                                        <option key={d.id} value={d.id}>{`${d.first_name} ${d.last_name}`}</option>
                                    ))}
                                </select>
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
                                        <option key={d.id} value={d.id}>{d.department_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Appointment Date</label>
                                <input
                                    type="datetime-local"
                                    value={appointmentDate}
                                    onChange={(e) => setAppointmentDate(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg"
                                >
                                    <option value="">Select a status</option>
                                    {STATUS_CHOICES.map(status => (
                                        <option key={status.value} value={status.value}>{status.label}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                            >
                                Create Appointment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}