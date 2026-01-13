import React from 'react'
import image1 from "../assets/image1.webp"

const AboutSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#fff7ed] via-[#fdebd3] to-[#fff1e6]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">
            Building a smarter bridge between <span className="text-orange-500">Colleges & Recruiters</span>
          </h2>
          <p className="mt-4 text-slate-700">
            SkillLift is a modern campus hiring platform designed to simplify internships and training programs.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <span>✅ Bulk Student Applications</span>
            <span>✅ College-Specific Hiring</span>
            <span>✅ Internship & Training Focus</span>
            <span>✅ Secure Process</span>
          </div>
        </div>
        <img src={image1} alt="" className="w-full h-auto rounded-3xl shadow-xl" />
      </div>
    </section>
  )
}

export default AboutSection
