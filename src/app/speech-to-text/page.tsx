import React from 'react'

function Page() {
  return (  
    <div className='flex flex-col items-center justify-center min-h-screen overflow-hidden p-[75px]'>
        <div className='bg-[#171717] rounded-[20px] w-[1283px] h-[1310px] flex flex-col items-center justify-center'>
            {/* Title */}
            <div className='text-[#fff] text-[40px] font-bold'>
                Speech to Text
            </div>
            {/* Mic Button */}
            <div>
                <button className='bg-[#171717] rounded-full'>

                </button>
            </div>
            {/* Description */}
            <div className='text-[#fff] text-[20px] font-bold'>
                Convert your speech to text
            </div>
        </div>
    </div>
  )
}

export default Page