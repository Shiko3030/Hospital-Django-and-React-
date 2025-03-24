import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function Appointmentes() {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {           
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/appointment/', {
                    params: { search: searchTerm }
                });
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
        fetchAppointments();
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = e.target.elements['default-search'].value;
        setSearchTerm(searchValue);
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <form className="max-w-md mx-auto" onSubmit={handleSearch}>   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input 
                        type="search" 
                        id="default-search" 
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Search Appointment... "
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </form>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <Link to="/appointment/create" className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Create New Appointment
                </Link>
            </button>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4"></th>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Patient</th>
                        <th scope="col" className="px-6 py-3">Doctor</th>
                        <th scope="col" className="px-6 py-3">Department</th>
                        <th scope="col" className="px-6 py-3">Hospital</th>
                        <th scope="col" className="px-6 py-3">Appointment date</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length > 0 ? (
                        appointments.map(appointment => (
                            <tr key={appointment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4"></td>
                                <td className="px-6 py-4">{appointment.id}</td>
                                <td className="px-6 py-4">{appointment.patient_name}</td>
                                <td className="px-6 py-4">{`${appointment.first_name} ${appointment.last_name}`}</td>
                                <td className="px-6 py-4">{appointment.department_name}</td>
                                <td className="px-6 py-4">{appointment.hospital_name}</td>
                                <td className="px-6 py-4">{format(new Date(appointment.appointment_date), 'dd/MM/yyyy HH:mm')}</td>
                                <td className="px-6 py-4">{appointment.status}</td>
                                <td className="flex items-center px-6 py-4">
                                    <Link to={`/appointments/${appointment.id}/update`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                    <Link to={`/appointments/${appointment.id}/delete`} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" id="NotFound" className="px-6 py-4 text-center">No appointments found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}