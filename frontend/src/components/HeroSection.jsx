import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Search,
  Briefcase,
  CheckCircle,
  Users,
  MessageSquare,
  Building2,
  ArrowRight,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Link, useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="bg-gradient-to-b from-teal-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Find Your Dream Job or <br />{" "}
            <span className="text-teal-600">Perfect Candidate</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Connect talented applicants with top recruiters. One platform for
            all your job search and hiring needs.
          </p>
          <div className="flex w-full max-w-2xl mx-auto h-12">
            <input
              type="text"
              placeholder="Search for jobs"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-6 h-full text-lg rounded-l-full border-2 border-r-0 border-teal-200 focus:outline-none focus:border-teal-400"
            />
            <Button
              onClick={searchJobHandler}
              className="h-full rounded-r-full bg-teal-600 hover:bg-teal-700 px-8"
            >
              <Search className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-grow py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose SkillSetGo?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Streamlined job applications for candidates and efficient hiring
              for recruiters
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Briefcase className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">One-Click Apply</h3>
              <p className="text-gray-600">
                Applicants can easily apply to jobs with just one click
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <CheckCircle className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Efficient Hiring</h3>
              <p className="text-gray-600">
                Recruiters can post jobs and manage applications seamlessly
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <MessageSquare className="h-12 w-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI Chatbot</h3>
              <p className="text-gray-600">
                Applicants can get instant answers to their questions
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Features for Applicants
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-teal-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">One-Click Apply</h3>
                    <p className="text-gray-600">
                      Apply to multiple jobs quickly and easily
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MessageSquare className="h-6 w-6 text-teal-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">AI-Powered Chatbot</h3>
                    <p className="text-gray-600">
                      Get instant answers to your job-related questions
                    </p>
                  </div>
                </div>
              </div>

              <Link to="/login">
                <Button className="mt-6 bg-teal-600 hover:bg-teal-700">
                  Find Jobs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Features for Recruiters
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Building2 className="h-6 w-6 text-teal-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Post Multiple Jobs</h3>
                    <p className="text-gray-600">
                      Easily create and manage job listings
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-teal-600 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Manage Applications</h3>
                    <p className="text-gray-600">
                      Efficiently review, approve, or reject applications
                    </p>
                  </div>
                </div>
              </div>

              <Link to="/login">
                <Button className="mt-6 bg-teal-600 hover:bg-teal-700">
                  Post a Job <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center bg-teal-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're looking for your next career move or searching for
              top talent, SkillSetGo has you covered.
            </p>

            <Link to="/login">
              <Button className="bg-teal-600 hover:bg-teal-700">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
