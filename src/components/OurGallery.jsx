import React from 'react'
import Gallery from './Gallery'
const OurGallery = () => {
  return (
    <div className="relative w-full overflow-hidden bg-[#EDE8D0]">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-16 lg:px-20">
        {/* Heading */}
        <h2 className="text-5xl md:text-6xl font-bold font-[Inter] text-[#000000] text-center "
          style={{ fontSize: '80px' }}>
          Exhibition{' '}
          <span className="font-['Dancing_Script',cursive]">Highlights</span>
        </h2>
        <Gallery />
      </div>
    </div>
  )
}

export default OurGallery