import React from 'react'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate=useNavigate()
  return (
    <div><footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300">
  <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-20">

    
    <div>
      <h3 className="text-2xl font-extrabold text-white">
        Skill<span className="text-orange-500">Lift</span>
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-slate-400">
        SkillLift is a smart campus hiring platform connecting colleges,
        recruiters, and students to create better career opportunities.
      </p>
    </div>

    
    <div>
      <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
      <ul className="space-y-2 text-sm">
        <li className="hover:text-orange-400 transition cursor-pointer" onClick={()=>navigate("/")}>Home</li>
        <li className="hover:text-orange-400 transition cursor-pointer" onClick={()=>navigate("/aboutus")}>About Us</li>
        <li className="hover:text-orange-400 transition cursor-pointer" onClick={()=>navigate("/jobs")}>Jobs</li>
        <li className="hover:text-orange-400 transition cursor-pointer">Contact</li>
      </ul>
    </div>

   

    
    <div>
      <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
      <ul className="space-y-2 text-sm text-slate-400">
        <li>Email: support@skilllift.com</li>
        <li>Phone: +91 123456789</li>
        <li>Address: Sector-32, Jalandhar </li>
        <li>India</li>
      </ul>
    </div>

  </div>

  
  <div className="border-t border-slate-700">
    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-400">
      <p>© {new Date().getFullYear()} SkillLift. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <span className="hover:text-orange-400 cursor-pointer transition">Privacy Policy</span>
        <span className="hover:text-orange-400 cursor-pointer transition">Terms of Service</span>
      </div>
    </div>
  </div>
</footer>
</div>
  )
}

export default Footer;