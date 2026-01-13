import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center '>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-white/60 backdrop-blur-md shadow-sm text-orange-600 font-medium'>Elevating Skills. Empowering Careers.</span>
                <h1 className='text-5xl font-bold'>Trusted by Campuses  <br /> & <span className='text-orange-500'>Companies</span></h1>
                <p className='ext-lg md:text-xl font-medium text-slate-800 leading-relaxed'>SkillLift is a smart hiring platform connecting colleges and recruiters.</p>
                <p className='text-violet-500 font-medium'>Recruiters post internships and training opportunities for one or multiple colleges.</p>
                <p className='text-base md:text-lg font-semibold text-slate-900'> Smart hiring starts with SkillLift.</p>
                <div className='flex w-[40%] shadow-lg border bg-white border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full  bg-orange-500 hover:bg-orange-600 text-white transition">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
