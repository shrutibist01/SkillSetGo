import React from 'react'
import { Facebook, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-teal-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">
              Skill<span className="text-teal-200">Set</span>Go
            </h2>
            <p className="text-sm mt-2">© 2024 SkillSetGo. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://facebook.com" className="hover:text-teal-200 transition-colors" aria-label="Facebook">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" className="hover:text-teal-200 transition-colors" aria-label="Twitter">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" className="hover:text-teal-200 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-teal-500 flex flex-wrap justify-center md:justify-between">
          <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-sm text-teal-100">
              SkillSetGo is the leading platform for landing your dream jobs. 
              We connect talented individuals with top employers worldwide.
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/about" className="hover:text-teal-200 transition-colors">About Us</a></li>
              <li><a href="/courses" className="hover:text-teal-200 transition-colors">Courses</a></li>
              <li><a href="/jobs" className="hover:text-teal-200 transition-colors">Job Listings</a></li>
              <li><a href="/contact" className="hover:text-teal-200 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <address className="text-sm not-italic">
              <p>1234 Skill Street</p>
              <p>Pune, MH</p>
              <p>Email: info@skillsetgo.com</p>
              <p>Phone: 1234567890</p>
            </address>
          </div>
        </div>
      </div>
    </footer>
  )
}