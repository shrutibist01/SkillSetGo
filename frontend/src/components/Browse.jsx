import { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Chatbot from '../components/chatbot/Chatbot';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(setSearchedQuery(searchTerm));
    }, [searchTerm, dispatch]);

    const filteredJobs = allJobs.filter(job =>
        job.title.toLowerCase().includes(searchedQuery.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <input
                    type="text"
                    placeholder="Search for jobs..."
                    className="border p-2 mb-4 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <h1 className='font-bold text-xl my-10'>
                    Search Results ({filteredJobs.length})
                </h1>
                <div className='grid grid-cols-3 gap-4'>
                    {filteredJobs.map((job) => (
                        <Job key={job._id} job={job} />
                    ))}
                </div>
            </div>
            <Chatbot />
        </div>
    );
};

export default Browse;
