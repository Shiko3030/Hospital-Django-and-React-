import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function JobTypes() {
    const [jobTypes, setJobTypes] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // حالة لتتبع قيمة البحث

    useEffect(() => {
        const fetchJobTypes = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/jobtypes/', {
                    params: { search: searchTerm } // إرسال كلمة البحث كمعلمة
                });
                setJobTypes(response.data);
            } catch (error) {
                console.error('Error fetching job types:', error);
            }
        };
        fetchJobTypes();
    }, [searchTerm]); // يتم إعادة الجلب عند تغيير searchTerm

    const handleSearch = (e) => {
        e.preventDefault(); // منع إعادة تحميل الصفحة
        const searchValue = e.target.elements['default-search'].value;
        setSearchTerm(searchValue); // تحديث حالة البحث
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
                        placeholder="Search job types..." 
                        value={searchTerm} // ربط القيمة بحالة البحث
                        onChange={(e) => setSearchTerm(e.target.value)} // تحديث فوري اختياري
                    />
                </div>
            </form>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <Link to="/jobtypes/create" className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Create New Job Type
                </Link>
            </button>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Job Name</th>
                        <th className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {jobTypes.length > 0 ? (
                        jobTypes.map(jobType => (
                            <tr key={jobType.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{jobType.job_name}</td>
                                <td className="flex items-center px-6 py-4">
                                    <Link 
                                        to={`/jobtypes/${jobType.id}/update`} 
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                    <Link 
                                        to={`/jobtypes/${jobType.id}/delete`} 
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                                    >
                                        Remove
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" id="NotFound" className="px-6 py-4 text-center">No job types found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}