import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateEmployee() {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [hospital, setHospital] = useState('');
    const [job, setJob] = useState('');
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [jobTypes, setJobTypes] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        // جلب البيانات
        Promise.all([
            axios.get('http://127.0.0.1:8000/api/departments/'),
            axios.get('http://127.0.0.1:8000/api/hospitals/'),
            axios.get('http://127.0.0.1:8000/api/jobtypes/'),
            axios.get(`http://127.0.0.1:8000/api/employees/${id}`)
        ])
            .then(([departmentsRes, hospitalsRes, jobTypesRes, employeeRes]) => {
                setDepartments(departmentsRes.data);
                setHospitals(hospitalsRes.data);
                setJobTypes(jobTypesRes.data);
                const data = employeeRes.data;
                setFirstName(data.first_name || '');
                setLastName(data.last_name || '');
                setSpecialty(data.specialty || '');
                setLicenseNumber(data.license_number || '');
                setHospital(data.hospital || '');
                setJob(data.job || '');
                setDepartment(data.department || '');
            })
            .catch(error => console.error('Error fetching data:', error))
            .finally(() => setIsLoading(false));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const payload = {
            first_name: firstName,
            last_name: lastName,
            hospital: parseInt(hospital), // تحويل إلى عدد لأنه ForeignKey
            specialty: specialty || null,
            license_number: licenseNumber || null,
            job: parseInt(job),
            department: parseInt(department)
        };
        console.log('Payload being sent:', payload); // للتحقق
        try {
            await axios.put(`http://127.0.0.1:8000/api/employees/${id}/update/`, payload);
            toast.success("Employee Updated Successfully! 🎉", {
                autoClose: 4000, // الرسالة تظهر لمدة 2 ثانية
            });
            setTimeout(() => {
                navigate('/employee');
            }, 2000); // تأخير التنقل لمدة 2 ثانية
        } catch (error) {
            const errors = error.response?.data;
            let errorText = "Failed to update employee. Please try again.";
            if (errors && typeof errors === 'object') {
                errorText = Object.entries(errors)
                    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
                    .join(" | ");
            }
            toast.error(errorText);
        } finally {
            setIsLoading(false);
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
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Update Employee</h2>
                        {isLoading ? (
                            <p className="text-center">Loading...</p>
                        ) : (
                            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                        required
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last Name"
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
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Specialty</label>
                                    <input
                                        type="text"
                                        value={specialty}
                                        onChange={(e) => setSpecialty(e.target.value)}
                                        placeholder="Specialty"
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">License Number</label>
                                    <input
                                        type="text"
                                        value={licenseNumber}
                                        onChange={(e) => setLicenseNumber(e.target.value)}
                                        placeholder="License Number"
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job</label>
                                    <select
                                        value={job}
                                        onChange={(e) => setJob(e.target.value)}
                                        required
                                        className="w-full p-2 border rounded-lg"
                                    >
                                        <option value="">Select a job</option>
                                        {jobTypes.map(j => (
                                            <option key={j.id} value={j.id}>{j.job_name}</option>
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
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400"
                                >
                                    {isLoading ? 'Updating...' : 'Update Employee'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}