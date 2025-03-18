import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function EditAppointment() {
    const { id } = useParams();
    const [patients, setPatients] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patient, setPatient] = useState('');
    const [doctor, setDoctor] = useState('');
    const [department, setDepartment] = useState('');
    const [appointmentType, setAppointmentType] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(""); // Make sure this is declared

    const APPOINTMENT_TYPES = [
        { value: 'general', label: 'General Checkup' },
        { value: 'cardiology', label: 'Cardiology' },
        { value: 'orthopedics', label: 'Orthopedics' },
        { value: 'neurology', label: 'Neurology' }
    ];

    const STATUS_CHOICES = [
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'cancelled', label: 'Cancelled' },
        { value: 'completed', label: 'Completed' }
    ];

    const formatDateForInput = (isoDate) => {
        if (!isoDate) return '';
        return isoDate.split('T')[0]; // تحويل التاريخ إلى yyyy-MM-dd
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/patient/')
            .then(response => setPatients(response.data))
            .catch(error => console.error('Error fetching patients:', error));

        axios.get('http://127.0.0.1:8000/api/departments/')
            .then(response => setDepartments(response.data))
            .catch(error => console.error('Error fetching departments:', error));

        axios.get('http://127.0.0.1:8000/api/doctors/')
            .then(response => setDoctors(response.data))
            .catch(error => console.error('Error fetching doctors:', error));

        axios.get(`http://127.0.0.1:8000/api/appointment/${id}`)
            .then(response => {
                const data = response.data;
                console.log('Fetched appointment data:', data);
                setPatient(data.patient || '');
                setDoctor(data.doctor || '');
                setDepartment(data.department || '');
                setAppointmentType(data.appointment_type || '');
                setAppointmentDate(formatDateForInput(data.appointment_date));
                setStatus(data.status || '');
            })
            .catch(error => console.error('Error fetching appointment details:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            patient: parseInt(patient),
            doctor: parseInt(doctor),
            department: parseInt(department),
            appointment_type: appointmentType,
            appointment_date: appointmentDate ? `${appointmentDate}T00:00:00Z` : appointmentDate, // تحويل التاريخ إلى ISO 8601
            status
        };
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/appointment/${id}/update/`, payload);
            console.log('Response from server:', response.data);{
                toast.success("Appointment Updated Successfully ! 🎉");

            setTimeout(() => {
                navigate('/appointment');s
            }, 4000);
            }
            
        } catch (error) {
            console.log("Full error response:", error.response?.data);
    
            if (error.response && error.response.data) {
                const errors = error.response.data;
                let errorText = "";
    
                // Handle case where error is a dictionary with multiple fields
                if (typeof errors === "object") {
                    for (let key in errors) {
                        if (Array.isArray(errors[key])) {
                            errorText += `${key}: ${errors[key].join(", ")}\n`;
                        } else {
                            errorText += `${errors[key]}\n`;  // Handle string errors like "detail"
                        }
                    }
                } else {
                    errorText = "Update failed! Please try again.";
                    toast.error("Failed to create appointment. Please try again.")
                }
    
                setErrorMessage(errorText.trim()); // Show error messages
            } else {
                setErrorMessage("Update failed! Please try again.");
                toast.error("Failed to create appointment. Please try again.")
            }
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="flex flex-col justify-center">
                    <img className="h-auto max-w-full" src="/photo_1.jpg" alt="Appointment illustration" />
                    <ToastContainer />
                </div>
                <div>
                    <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                          
                            {errorMessage && (
                                        <div className='err'>
                                            {errorMessage}
                                        </div>
                                    )}
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Appointment</h2>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                                        <option key={p.id} value={p.id}>{p.name}</option>
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
                                        <option key={d.id} value={d.id}>{d.name}</option>
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
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Appointment Type</label>
                                <select
                                    value={appointmentType}
                                    onChange={(e) => setAppointmentType(e.target.value)}
                                    required
                                    className="w-full p-2 border rounded-lg"
                                >
                                    <option value="">Select an appointment type</option>
                                    {APPOINTMENT_TYPES.map(type => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Appointment Date</label>
                                <input
                                    type="date"
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
                                Update Appointment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}      