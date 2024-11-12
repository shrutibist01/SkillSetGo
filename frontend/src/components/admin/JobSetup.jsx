import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';

const JobSetup = () => {
    //const { singleJob } = useSelector(store => store.job);
    const { companies } = useSelector(store => store.company);
    const dispatch = useDispatch();
    const params = useParams();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: 0,
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [password, setPassword] = useState(""); // To store recruiter’s password for confirmation

    // Fetch job data on mount
    useEffect(() => {
        const fetchJobById = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${params.id}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setInput({
                        title: res.data.job.title || "",
                        description: res.data.job.description || "",
                        requirements: (res.data.job.requirements || []).join(', '),
                        salary: res.data.job.salary || "",
                        location: res.data.job.location || "",
                        jobType: res.data.job.jobType || "",
                        experienceLevel: res.data.job.experienceLevel || 0,  // Corrected here
                        position: res.data.job.position || 0,
                        companyId: res.data.job.company?._id || ""
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchJobById();
    }, [params.id, dispatch]);
    

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(company => company._id === value);
        setInput({ ...input, companyId: selectedCompany?._id });
    };

    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     try {
    //         setLoading(true);
    //         const updatedJobData = { ...input, requirements: input.requirements.split(/[,]\s*/) };
    //         const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, updatedJobData, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             withCredentials: true
    //         });
    //         if (res.data.success) {
    //             toast.success(res.data.message);
    //             navigate("/admin/jobs");
    //         }
    //     } catch (error) {
    //         toast.error(error.response?.data?.message || "Failed to update job");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("Submit handler triggered");
    
        try {
            setLoading(true);
            console.log("Loading set to true");
    
            const updatedJobData = { ...input, requirements: input.requirements.split(/[,]\s*/) };
            console.log("Updated job data prepared:", updatedJobData);
    
            const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, updatedJobData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log("Response received from API:", res);
    
            if (res.data.success) {
                console.log("Job updated successfully:", res.data.message);
                toast.success(res.data.message);
                navigate("/admin/jobs");
            } else {
                console.log("Job update was not successful:", res.data);
            }
        } catch (error) {
            console.error("Error updating job:", error.response?.data?.message || error);
            toast.error(error.response?.data?.message || "Failed to update job");
        } finally {
            console.log("Setting loading to false");
            setLoading(false);
        }
    };
    

    const deleteHandler = async () => {
        try {
            setLoading(true);
            const res = await axios.delete(`${JOB_API_END_POINT}/delete/${params.id}`, {
                data: { password },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete job");
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
            setPassword(""); // Clear password input
        }
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate("/admin/jobs")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Edit Job</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Title</Label>
                            <Input type="text" name="title" value={input.title} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Salary (LPA)</Label>
                            <Input type="number" name="salary" value={input.salary} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input type="number" name="experience" value={input.experience} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Positions</Label>
                            <Input type="number" name="position" value={input.position} onChange={changeEventHandler} />
                        </div>
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler} value={input.companyId}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.map(company => (
                                                <SelectItem key={company._id} value={company._id}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Updating...</Button> : <Button type="submit" className="w-full my-4">Update Job</Button>
                    }
                    <Button type="button" onClick={() => setShowDeleteModal(true)} variant="destructive" className="w-full my-4">Delete Job</Button>
                </form>

                {showDeleteModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                            <h2>Confirm Job Deletion</h2>
                            <p>Type your password to confirm deletion.</p>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="mb-4 w-full" // Add this class
                            />
                           
                            <div className="flex justify-end gap-4">
                                <Button onClick={deleteHandler} disabled={!password} variant="destructive" className="px-4 py-2">
                                    Delete
                                </Button>
                                <Button onClick={() => setShowDeleteModal(false)} variant="outline" className="px-4 py-2">
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default JobSetup;
