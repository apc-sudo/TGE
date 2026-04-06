import React from 'react'
import HowToPlace from './HowToPlace'
import HorizontalScrollSection from './HorizontalScrollSection.jsx'
const HowToPlaceOrder = () => {
  return (
     <div
             className="bg-cover bg-center py-16 bg-[#d6c2aa]">
   <div className="text-center mb-12">
           <h2 className="text-6xl font-bold font-[Inter] text-[#000000]"
           style={{fontSize: '80px'}}>
        How to Place an <span className="font-['Dancing_Script',cursive] text-[#000000]">Order ?</span>
        </h2>
        <p className="font-['Dancing_Script',cursive] text-[#000000] text-3xl mt-5">Your custom creation starts here – just follow the journey</p>
        </div>
        <HorizontalScrollSection/>
           </div>
  )
}

export default HowToPlaceOrder