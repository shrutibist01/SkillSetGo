import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); 
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10 px-4'>
            <div className="bg-white p-6 rounded-lg shadow-xl">
                <div className='flex flex-col md:flex-row items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-2xl md:text-3xl text-gray-900'>{singleJob?.title}</h1>
                        <div className='flex flex-wrap gap-2 mt-4'>
                            <Badge className='text-blue-700 font-bold' variant="ghost">{singleJob?.postion} Positions</Badge>
                            <Badge className='text-[#F83002] font-bold' variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className='text-[#7209b7] font-bold' variant="ghost">{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`mt-4 md:mt-0 rounded-lg py-3 px-6 transition-colors ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'} w-full md:w-auto`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
                
                <h1 className='border-b-2 border-b-gray-300 font-medium py-4 mt-6 text-xl text-gray-800'>Job Description</h1>
                <div className='my-4 space-y-5'>
                    <div className="space-y-2">
                        <h2 className='font-bold text-lg text-gray-700'>Role: <span className='pl-4 font-normal text-gray-600'>{singleJob?.title}</span></h2>
                        <h2 className='font-bold text-lg text-gray-700'>Location: <span className='pl-4 font-normal text-gray-600'>{singleJob?.location}</span></h2>
                        <h2 className='font-bold text-lg text-gray-700'>Description: <span className='pl-4 font-normal text-gray-600'>{singleJob?.description}</span></h2>
                        <h2 className='font-bold text-lg text-gray-700'>Experience: <span className='pl-4 font-normal text-gray-600'>{singleJob?.experience} yrs</span></h2>
                        <h2 className='font-bold text-lg text-gray-700'>Salary: <span className='pl-4 font-normal text-gray-600'>{singleJob?.salary} LPA</span></h2>
                        <h2 className='font-bold text-lg text-gray-700'>Total Applicants: <span className='pl-4 font-normal text-gray-600'>{singleJob?.applications?.length}</span></h2>
                        <h2 className='font-bold text-lg text-gray-700'>Posted Date: <span className='pl-4 font-normal text-gray-600'>{singleJob?.createdAt.split("T")[0]}</span></h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription;
