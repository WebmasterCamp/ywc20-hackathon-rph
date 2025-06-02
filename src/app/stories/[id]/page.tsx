'use client'

import { useParams } from "next/navigation"
import NavigationBar from "@/components/NavigationBar"
import Image from "next/image"
import { Gift, Share } from "lucide-react"

export default function StoryPage() {
    const { id } = useParams<{ id: string }>()

    return (
        <div className="relative flex flex-col min-h-screen">
            <Image src="/dark-fantasy-scene.jpg" alt="Background" className="absolute top-0 left-0 w-full h-full object-cover -z-10" width={100} height={100}  />
            <NavigationBar />
            <div className="flex flex-col items-center justify-center">
                <div className="bg-[#171717]/40 min-h-[1698px] max-w-[1283px] rounded-3xl flex flex-col items-center justify-start p-4 gap-[31px]">
                    {/* Title */}
                    <div className="text-4xl font-bold text-white">
                        เสียงลึกลับในบ้านร้าง
                    </div>
                    {/* Description */}
                    <div className="text-2xl font-bold">
                        TODO: AVATAR
                    </div>
                    {/* Content Image */}
                    <div className="h-[399px]">
                        <Image src="/haunted-house-story.png" alt="Story 1" width={1283} height={1310} />
                    </div>
                    {/* เรื่องย่อ */}
                    <div className="min-h-[253px] flex flex-col items-center justify-center gap-6 bg-black/60 rounded-3xl text-white p-4">
                        <div className="text-2xl font-bold">
                            เรื่องย่อ
                        </div>
                        <div className="text-xl">
                            <p>“เบน” เล่าเรื่องประสบการณ์สยองขวัญสมัยม.6 ที่เขาและเพื่อนเข้าไปถ่ายทำสารคดีใน “บ้านร้างขุนศรี”บ้านเก่ากลางป่าในเชียงใหม่ที่มีข่าวลือว่าเจ้าของบ้านหายตัวไปอย่างลึกลับ และยังมีเสียงร้องไห้ตอนกลางคืน พวกเขาเข้าไปตอนเย็นเพื่อเก็บภาพแต่กลับได้ยินเสียงกระซิบ เสียงหัวเราะ และรู้สึกถึงพลังงานบางอย่างในบ้าน ก่อนจะรีบหนีออกมา หลังจากนั้นชาวบ้านเล่าให้ฟังว่ามีคนเคยหายตัวไปในบ้านหลังนี้จริง… เบนจึงสรุปไว้ว่า “บางที่ ไม่ใช่ทุกคนที่ควรจะเข้าไป”</p>
                        </div>
                    </div>
                    {/* เรื่องหลัก */}
                    <div className="min-h-[253px] flex flex-col items-center justify-center gap-6 bg-black/60 rounded-3xl text-white p-4">
                        <div className="text-2xl font-bold">
                            เนื้อเรื่อง
                        </div>
                        <div className="text-xl">
                            <p>              ตอนนั้นเราไปหมู่บ้านเล็ก ๆ ในอำเภอแม่แตง ที่นั่นมีบ้านร้างหลังนึงที่ชาวบ้านเรียกกันว่า “บ้านขุนศรี” บ้านไม้นะ แต่อยู่ในสภาพเหมือนพร้อมจะพังได้ทุกเมื่อ หลังคาโหว่ ฝาผนังผุ แล้วก็อยู่ลึกเข้าไปในป่าเล็ก ๆ ไม่มีใครกล้าเข้าไปใกล้เลย โดยเฉพาะกลางคืน ชาวบ้านเล่าว่าบ้านหลังนี้เคยมีเจ้าของเป็นเศรษฐีที่อยู่กับเมียสองคน ไม่มีลูก แล้วอยู่ ๆ ก็หายตัวไปทั้งคู่ ไม่มีใครหาศพเจอ เหลือแค่บ้านกับเสียงร้องไห้ตอนกลางคืน แน่นอน พวกเราก็บ้าบิ่นไง อยากได้ฟุตเทจไปใส่สารคดี เลยตัดสินใจเข้าไปช่วงเย็น ๆ พกกล้องกับสมุดบันทึกไปด้วย ตอนเดินเข้าไปในบ้านนะ บรรยากาศมันเงียบแปลก ๆ เหมือนเสียงรอบตัวหายไปหมด เราถ่ายภาพไปเรื่อย ๆ ไม่ได้รู้สึกอะไรแปลก ๆ จนเพื่อนเราที่ไปด้วยกันชื่อ “หมิว” เริ่มทำหน้าไม่ดี เธอบอกว่าได้ยินเสียงเหมือนคนลากขาอยู่บนชั้นสอง เราก็คิดว่าอาจเป็นสัตว์หรือเสียงบ้านไม้เก่า ๆ ก็เลยยังไม่กลัวมาก
แต่พอเราขึ้นไปชั้นบนเท่านั้นแหละ ทุกอย่างเปลี่ยนไปเลย ข้างบนมีห้องนอนห้องเดียวที่ยังพอเป็นสภาพห้องอยู่ ประตูเปิดแง้ม ๆ เราค่อย ๆ ดันเข้าไป แล้วทันทีที่เข้าไปได้ไม่ถึงนาที เสียงผู้หญิงสะอื้นดังอยู่ข้าง ๆ หูเลย แบบชัดมาก เหมือนมายืนอยู่ข้างเรา แล้วเสียงนั้นก็ค่อย ๆ เปลี่ยนเป็นเสียงหัวเราะเบา ๆ เหมือนคนสติแตก แล้วก็เงียบกริบ เหมือนไม่เคยมีอะไรเกิดขึ้น เราหันไปหาเพื่อนแต่หมิวไม่อยู่ตรงนั้นแล้ว! พอวิ่งลงไปชั้นล่างก็เจอเธอยืนอยู่หน้าประตูบ้าน หน้าเธอซีดเหมือนกระดาษ แล้วเธอก็บอกว่า มีคนกระซิบที่หูเธอว่า “มันไม่ใช่ที่ของพวกแก…” จากนั้นเธอก็วิ่งออกมาเลยโดยไม่หันกลับ เราเองก็ไม่กล้าจะอยู่ต่อละ รีบตามออกมาเหมือนกัน คืนนั้นเราทั้งกลุ่มนอนไม่หลับเลย ทุกคนรู้สึกเหมือนยังได้ยินเสียงสะอื้นอยู่ในหัว แล้วพอเล่าให้ชาวบ้านฟังตอนเช้า เขาก็บอกว่า มีนักข่าวจากกรุงเทพเคยเข้าไปถ่ายบ้านนี้เมื่อห้าหกปีก่อน แล้วอยู่ ๆ ก็หายตัวไปเลย ไม่เจอทั้งคนทั้งกล้อง ถึงวันนี้ก็ยังเป็นคดีค้างอยู่
ตั้งแต่นั้นมา เราไม่เคยกลับไปแถวนั้นอีกเลย ไม่รู้ว่าที่เราเจอคือผีเจ้าของบ้าน หรือวิญญาณของคนที่เคยเข้าไปแล้วไม่เคยกลับออกมา…
แต่ที่แน่ ๆ คือ เราเชื่อ 100% ว่า “บางที่…ไม่ใช่ทุกคนที่ควรจะเข้าไป”</p>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex items-center gap-6">
                        <div className="flex flex-row items-center justify-center gap-6">
                            <button className="bg-white/30 text-black px-4 py-2 rounded-3xl flex flex-row items-center justify-center gap-2 w-[200px] cursor-pointer hover:bg-white/50 transition-all duration-300">
                                <Share className="w-6 h-6" />
                                <span className="text-md font-bold">ส่งต่อความหลอน</span>
                            </button>
                        </div>
                        <div className="flex flex-row items-center justify-center gap-6">
                            <button className="bg-[#276565] text-white px-4 py-2 rounded-3xl flex flex-row items-center justify-center gap-2 w-[200px] cursor-pointer hover:bg-[#276565]/80 transition-all duration-300">
                                <Gift className="w-6 h-6" />
                                <span className="text-md font-bold">สนับสนุนผู้เขียน</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}