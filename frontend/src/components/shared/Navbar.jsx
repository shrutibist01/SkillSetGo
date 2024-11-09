import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="bg-teal-600">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-20 px-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Skill<span className="text-teal-200">Set</span>Go
                    </h1>
                </div>
                <div className="flex items-center gap-8">
                    <ul className="flex font-medium items-center gap-6 text-white">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>
                            </>
                        )}
                    </ul>
                    {!user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="outline" className="text-teal-600 bg-white hover:bg-teal-600">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-teal-700 text-white hover:bg-teal-800">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer border-2 border-white">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-4">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{user?.fullname}</h4>
                                            <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 text-gray-600">
                                        {user && user.role === 'student' && (
                                            <Button variant="ghost" className="justify-start" onClick={() => navigate('/profile')}>
                                                <User2 className="mr-2 h-4 w-4" />
                                                View Profile
                                            </Button>
                                        )}
                                        <Button variant="ghost" className="justify-start" onClick={logoutHandler}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar