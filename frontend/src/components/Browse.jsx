import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="font-bold text-3xl text-gray-800 mb-6">
          Search Results ({allJobs.length})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allJobs.length === 0 ? (
            <div className="col-span-3 text-center text-xl font-semibold text-gray-600">
              No jobs found.
            </div>
          ) : (
            allJobs.map((job) => (
              <div
                key={job._id}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <Job job={job} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
