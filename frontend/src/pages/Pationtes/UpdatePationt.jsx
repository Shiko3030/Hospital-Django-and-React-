import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdatePatient() {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [hospital, setHospital] = useState('');
    const [hospitals, setHospitals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        // جلب بيانات المريض
        axios.get(`http://127.0.0.1:8000/api/patient/${id}`)
            .then(response => {
                const data = response.data;
                setFirstName(data.first_name || '');
                setLastName(data.last_name || '');
                setGender(data.gender || '');
                setDateOfBirth(data.date_of_birth || '');
                setPhoneNumber(data.phone_number || '');
                setEmail(data.email || '');
                setHospital(data.hospital || '');
            })
            .catch(error => console.error('Error fetching patient data:', error));

        // جلب المستشفيات
        axios.get('http://127.0.0.1:8000/api/hospitals/')
            .then(response => setHospitals(response.data))
            .catch(error => console.error('Error fetching hospitals:', error))
            .finally(() => setIsLoading(false));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const payload = {
            first_name: firstName,
            last_name: lastName,
            gender,
            date_of_birth: dateOfBirth || null,
            phone_number: phoneNumber || null,
            email: email || null,
            hospital: parseInt(hospital) // تحويل إلى عدد لأنه ForeignKey
        };
        console.log('Payload being sent:', payload); // للتحقق
        try {
            await axios.put(`http://127.0.0.1:8000/api/patient/${id}/update/`, payload);
            toast.success("Patient Updated Successfully! 🎉", {
                autoClose: 2000, // الرسالة تظهر لمدة 2 ثانية
            });
            setTimeout(() => {
                navigate('/patient');
            }, 2000); // تأخير التنقل لمدة 2 ثانية
        } catch (error) {
            const errors = error.response?.data;
            let errorText = "Failed to update patient. Please try again.";
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
                    <img className="h-auto max-w-full" src="/photo_1.jpg" alt="Patient illustration" />
                </div>
                <div>
                    <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                        <ToastContainer />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Update Patient Information</h2>
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
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                    <select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                        className="w-full p-2 border rounded-lg"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                    <input
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="Phone Number"
                                        className="w-full p-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
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
                                    disabled={isLoading}
                                    className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:bg-gray-400"
                                >
                                    {isLoading ? 'Updating...' : 'Update Patient'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}