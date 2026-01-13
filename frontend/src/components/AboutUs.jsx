import React from 'react'
import image1 from "../assets/image1.webp"
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';


const AboutUs = () => {
  return (
    
    <div className="bg-gradient-to-br from-[#fff7ed] via-[#fdebd3] to-[#fff1e6]">
    <Navbar/>

      
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="inline-block mb-4 px-6 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
          About Us
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          Elevating Skills. <br />
          <span className="text-orange-500">Empowering Careers.</span>
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-700 leading-relaxed">
          SkillLift is a smart campus hiring platform that bridges the gap between
          colleges and recruiters, making internships, training, and placements
          simpler and more efficient.
        </p>
      </section>

      
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Who We Are
          </h2>

          <p className="mt-6 text-slate-700 leading-relaxed">
            <span className="font-semibold text-slate-900">SkillLift</span> was built
            to modernize the campus hiring ecosystem. We understand the challenges
            colleges face in managing bulk student applications and the difficulty
            recruiters face in reaching the right talent.
          </p>

          <p className="mt-4 text-slate-600 leading-relaxed">
            Our platform enables recruiters to post opportunities for a single
            college or multiple campuses, while colleges can apply by submitting
            student details in bulk — saving time and ensuring transparency.
          </p>

          <p className="mt-4 font-medium text-slate-800">
            With SkillLift, hiring becomes faster, smarter, and more reliable.
          </p>
        </div>

        
        <div className="relative">
          <div className="absolute -inset-4 bg-orange-200/40 rounded-3xl blur-2xl"></div>
          <img
            src={image1}
            alt="Campus hiring and training"
            className="relative rounded-3xl shadow-2xl object-cover w-full h-[420px]"
          />
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
          <p className="text-slate-700 leading-relaxed">
            To simplify campus hiring by providing a transparent, efficient, and
            scalable platform that empowers colleges, recruiters, and students.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
          <p className="text-slate-700 leading-relaxed">
            To become the most trusted campus hiring ecosystem where skills are
            nurtured, opportunities are accessible, and careers are launched.
          </p>
        </div>

      </section>

      
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          Why Choose <span className="text-orange-500">SkillLift?</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Bulk Student Applications",
            "College-Specific Hiring",
            "Internship & Training Focus",
            "Secure & Transparent Process",
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-md text-slate-800 font-medium"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
      <Footer/>

    </div>
  );
};

export default AboutUs;
