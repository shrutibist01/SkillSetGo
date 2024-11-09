import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }

  return (
    <div className="bg-gradient-to-b from-teal-50 to-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          Develop, Showcase & <br /> Land Your <span className="text-teal-600">Dream Career</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Unlock your potential, showcase your skills, and connect with top employers worldwide.
        </p>
        <div className="flex w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search for jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-6 py-4 text-lg rounded-l-full border-2 border-teal-200 focus:outline-none focus:border-teal-400"
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-teal-600 hover:bg-teal-700 px-8">
            <Search className="h-6 w-6" />
          </Button>
        </div>
        </div>
      </div>
  )
}

export default HeroSection