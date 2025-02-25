import React from 'react'


function DotBackground() {

    return (
        <div className="absolute z-[0] top-0 left-0 h-screen w-full inset-0 [mask-size:40px] [mask-repeat:no-repeat] bg-[#f4f4f5] bg-dot-black/[0.2] flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[#f4f4f5] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
        </div>
    )
}

export default DotBackground