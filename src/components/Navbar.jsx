import React from 'react'
import TextReveal from './TextReveal';

const Navbar = () => {
  return (
    <div className="fixed px-[3rem] top-0 left-0 h-[6vh] w-full z-30 flex items-center justify-between">
        <div className="leftNameSide">
            <TextReveal className="">
                <h3 className="text-[1.2rem] uppercase" >Harshal Varade</h3>
            </TextReveal>
        </div>
        <div className="rightLinkSide flex gap-[1.6rem]">
            <TextReveal>
                <h3 className="text-[1.15rem]">Home</h3>
            </TextReveal>
            <TextReveal>
                <h3 className="text-[1.1rem]">About</h3>
            </TextReveal>
            <TextReveal>
                <h3 className="text-[1.1rem]">Contact</h3>
            </TextReveal>
        </div>
    </div>
  )
}

export default Navbar