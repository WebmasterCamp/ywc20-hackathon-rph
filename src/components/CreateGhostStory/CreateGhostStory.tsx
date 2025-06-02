import React from 'react'
import MainCardBase from '../MainCardBase/MainCardBase'
import Link from 'next/link'

const CreateGhostStory = () => {
  return (
    <MainCardBase>
        <div className='flex justify-between text-white'>
            <Link href='/speech-to-text'><div className='text-[20px] border p-4 rounded-md'>สร้างโดยการอัดเสียง</div></Link>
            <div className='text-[20px] border p-4 rounded-md'>สร้างโดยการพิมพ์ข้อความ</div>
        </div>
    </MainCardBase>
  )
}

export default CreateGhostStory