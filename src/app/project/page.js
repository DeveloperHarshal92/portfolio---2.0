"use client"
import InfiniteCarousel from '@/components/InfiniteCarousel'
import TextReveal from '@/components/TextReveal'
import {projects}  from '@/data/projects'
const page = () => {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center overflow-hidden'>
        <TextReveal delay="0.1">
            <h1 className='mb-0 md:mb-5 text-[5vw] lg:text-[6.5vw] font-normal leading-[1.08] tracking-tight text-slate-950' style={{fontFamily:"var(--font-mono)"}}>
                Selected Work
            </h1>
        </TextReveal>
        <InfiniteCarousel projects={projects}/>
    </div>
  )
}

export default page