'use client'
import React, { useRef } from 'react'
import { ChevronLeft, Mic, Pause } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const mockupText = `
สวัสดีครับ ผมคิดอยู่นานมากว่าควรโพสต์เล่าเรื่องนี้ดีไหม แต่จากการที่ผมเห็นหลายๆคนออกมาแชร์ประสบการ์ณกัน มันจึงทำให้ผมอยากจะเล่าเรื่องนี้โดยหวังว่าคนที่บริเวณอยู่ใกล้เคียงกับผมจะได้อ่านด้วย คือเรื่องมันมีอยู่ว่าผมได้มีโอกาสไปเข้าค่ายในที่แห่งนึง ซึ่งผมไม่สามารถบอกพิกัดตรงๆได้ แต่อยู่ในโซนที่ค่อนข้างคึกคักในกรุงเทพเลยทีเดียว ในคืนนึงระหว่างที่ผมกำลังพักผ่อนอยู่ในโรงแรมนั้น จู่ๆผมก็ได้ยินเสียงกรีดร้องที่ดังมากจนทำให้ผมต้องสะดุ้งตื่นขึ้นมากลางดึก แต่เมื่อผมตื่นขึ้นและมองไปรอบๆนั้น ผมกลับไม่พบอะไรที่ผิดปกติสักอย่างเดียว เว้นแต่เพื่อนของผมที่ไปยืนอยู่ตรงมุมห้องท่ามกลางความมืดอยู่คนเดียว ด้วยท่าทีแปลกๆ พอผมเรียกชื่อเพื่อนคนนั้น เขาก็กลับยืนนิ่งไม่ตอบอะไรผมสักอย่าง แต่ทันใดนั้นเองจู่ๆผมได้ยินเสียงทุบประตูที่ดังมากจนเหมือนกับมีคนกำลังพยายามพังประตูห้องพักของผม พร้อมกับเสียงกรีดร้องอ้อนวอนที่ขอให้ผมช่วยเขาโดยเปิดประตู เสียงตะโกนนั้นฟังดูเหนื่อยหอบ และมีน้ำเสียงแหบแห้ง เหมือนกำลังวิ่งหนีอะไรบางอย่างมาไม่มีผิด นั่นจึงทำให้ผมตกใจมากและอีกใจนึงก็รู้สึกคุ้นเคยกับเสียงกรีดร้องนี้อย่างบอกไม่ถูก แต่ผมก็คิดไม่ออกว่านั่นคือเสียงของใครอยู่ดี ผมจึงรีบตะโกนเรียกเพื่อนของผมคนเดิมที่ยังคงยืนอยู่ในมุมห้องมืดๆอีกครั้ง แต่เพื่อนผมก็ยังคงนิ่งสนิทไม่ตอบอะไรกับมาเช่นเดิม พร้อมกับเสียงทุบประตูและเสียงกรีดร้องที่ดังยิ่งขึ้นเรื่อยๆ ในตอนนั้นเองผมกำลังรู้สึกว่าตัวเองใกล้ที่จะสติแตกเต็มทีจากเสียงประหลาดหน้าประตู พร้อมกับพฤติกรรมแปลกๆของเพื่อนผม ดังนั้นผมจึงรีบเดินเข้าไปกระชากแขนของเพื่อนของผมด้วยความโมโห แต่เพื่อนของผมดันล้ม ตุบ! เหมือนกับตุ๊กตากระดาษ และทันใดนั้นเสียงทุบประตูและเสียงกรีดร้องก็ได้หายไปเหมือนกับไม่เคยเกิดขึ้นมาก่อน   
ผมรีบสะดุ้งตื่นขึ้นมาทันที และพบว่าท้องฟ้าข้างนอกสว่างแล้ว และคิดได้ว่าเรื่องทั้งหมดที่เกิดขึ้นนั้นเป็นแค่ความฝันเท่านั้น ไม่มีเสียงกรีดร้องหรือทุบประตูแล้ว ไม่มีบรรยากาศแปลกๆอีกแล้ว มีเพียงอย่างเดียวที่เหมือนเดิมคือ เพื่อนของผมนั้นยังคงยืนอยู่ที่เดิม มุมห้องเดิม มีความต่างจากเดิมคือ เพื่อนของผมที่ไม่หายใจ ห้อยอยู่บนมุมห้อง และสายตาของเขาที่จ้องเขม็งมาที่ผมเหมือนกับไม่ใช่เพื่อนของผมอีกต่อไป
ในขณะที่ผมตกใจกับภาพของเพื่อนผมอยู่นั้น ทันใดนั้นผมก็ได้ยินเสียงเบาๆที่เหมือนกำลังกระซิบบอกผมว่า
‘ทำไมไม่เปิดประตูให้กู‘
`

function Page() {
    const [isRecording, setIsRecording] = useState(false);
    const [text, setText] = useState('');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const indexRef = useRef(0);
    const router = useRouter();
    const handleStartRecording = () => {
        if (!isRecording) {
            // Start streaming
            setIsRecording(true);
            setText('');
            indexRef.current = 0;
            intervalRef.current = setInterval(() => {
                indexRef.current += 1;
                setText(mockupText.slice(0, indexRef.current));
                if (indexRef.current > mockupText.length) {
                    clearInterval(intervalRef.current!);
                    intervalRef.current = null;
                    setIsRecording(false);
                }
            }, 100);
        } else {
            // If already recording, treat as reset: stop and clear text
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setIsRecording(false);
            setText('');
        }
    };

    const handleStopRecording = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRecording(false);
    };


  return (  
    <div className='flex flex-col items-center justify-center min-h-screen overflow-hidden p-[75px] bg-[#6D0004]'>
        <div className='relative bg-[#4A090B] rounded-3xl w-[1283px] h-[1153px] flex flex-col items-center justify-center'>
            {/* Back button on the top left */}
            <button className='min-w-24 bg-[#340608] rounded-full absolute top-4 left-4 flex items-center justify-center gap-2 text-white text-sm font-bold p-2 hover:bg-[#44080A] cursor-pointer'>  
                <ChevronLeft className='w-6 h-6 text-white' />
                <p onClick={() => router.back()} className='text-white text-sm font-bold'>กลับ</p>
            </button>
            {/* Title */}
            <div className='text-[#fff] text-[40px] font-bold mb-4'>
                Speech to Text
            </div>
            {/* Mic Button */}
            <div className='h-[10rem] flex flex-col items-center justify-center mb-2'>
                {isRecording ? (
                    <div className='flex flex-col items-center justify-center gap-4'>
                        <div className='flex gap-6 items-center justify-around bg-[#2C0507] rounded-3xl p-2 h-[100px]'>
                            <div className='rounded-full bg-white w-[32px] h-[32px] flex items-center justify-center'>
                                <Pause className='w-6 h-6 text-black' />
                            </div>
                            <Image src='/assets/recording.png' alt='mic' width={100} height={100} />
                            <p className='text-white text-sm font-bold'>00:00:00</p>
                        </div>
                        <button onClick={handleStopRecording} className='text-white bg-red-500 rounded-full px-4 py-2 cursor-pointer hover:bg-red-600 mt-4'>
                            Stop Recording
                        </button>
                    </div>
                ) : (
                    <button onClick={handleStartRecording} className='bg-[#2C0507] rounded-full p-[10px] cursor-pointer hover:bg-[#3C0608]'>
                        <Mic className='w-32 h-32 text-white p-2 cursor-pointer' />
                    </button>
                )}
            </div>
            {/* Description */}
            <div className='text-[#fff] text-sm font-bold mb-16'>
                {isRecording ? '' : 'การแปลงเสียงเป็นข้อความ'}
            </div>
            {/* Textarea */}
            <div className='bg-[#050505] h-[583px] rounded-3xl flex flex-col items-center justify-center p-4 gap-2 w-[1000px]'>
                <p className='text-white font-bold text-lg mb-7'>{isRecording ? 'กำลังแปลงเสียงเป็นข้อความ...' : 'การแปลงเสียงเป็นข้อความ'}</p>
                <textarea value={text} onChange={(e) => setText(e.target.value)} name="" id="" className='w-[958px] h-[397px] rounded-2xl bg-[#181818] border-none outline-none resize-none text-white p-2 text-xl'></textarea>
                <p className='w-[958px] text-white text-sm self-end'>{text.length} words</p>
            </div>
        </div>
    </div>
  )
}

export default Page