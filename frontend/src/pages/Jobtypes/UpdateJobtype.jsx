import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateJobType() {
    const [jobName, setJobName] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Assuming the job type ID is passed in the URL

    // Fetch job type data when component mounts
    useEffect(() => {
        const fetchJobType = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/jobtypes/${id}/`);
                const jobType = response.data;
                setJobName(jobType.job_name);
            } catch (error) {
                console.error('Error fetching job type:', error);
                alert('Failed to load job type data. Please try again.');
            }
        };
        fetchJobType();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/jobtypes/${id}/update/`, { 
                job_name: jobName,
            });
            toast.success("Job Type Updated Successfully! 🎉");

            setTimeout(() => {
                navigate('/jobtypes');
            }, 4000);
        } catch (error) {
            console.error('Error updating job type:', error);
            alert('Failed to update job type. Please try again.');
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="flex flex-col justify-center">
                    <img className="h-auto max-w-full" src="/photo_1.jpg" alt="Job Type illustration" />
                </div>
                <div>
                    <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                        <ToastContainer />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Update Job Type</h2>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Name</label>
                                <input
                                    type="text"
                                    value={jobName}
                                    onChange={(e) => setJobName(e.target.value)}
                                    required
                                    maxLength={50}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                            >
                                Update Job Type
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}