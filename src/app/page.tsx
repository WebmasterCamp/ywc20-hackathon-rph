'use client'
import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import GhostNearMeSearchCard from "@/components/GhostNearMeSearchCard/GhostNearMeSearchCard";
import GradientCard from "@/components/GradientCard/GradientCard";
import './page.css'
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setTimeout(() => {
      setSearchQuery(query)
    }, 1000);
  }

  const mockData = [
    {
      title: "เสียงลึกลับในบ้านร้าง",
      description: "แค่เล่นหยอกกับเพื่อนว่าจะไปล่าท้าผีทว่ากลับเจอเรื่องสุดสยองในบ้านร้าง..."
    },
    {
      title: "เงาปริศนาใต้สะพาน",
      description: "ทุกคืนวันพระจะมีเสียงร้องไห้ดังมาจากใต้สะพานเก่า ไม่มีใครกล้าเข้าใกล้จนกระทั่งวันหนึ่งมีเด็กกลุ่มหนึ่งหายตัวไป..."
    },
    {
      title: "เสียงกระซิบในห้องเรียนร้าง",
      description: "นักเรียนที่อยู่เวรดึกมักได้ยินเสียงกระซิบชื่อของตัวเองจากห้องเรียนที่ปิดตายมานานหลายปี..."
    },
    {
      title: "ตุ๊กตาผีในบ้านเช่า",
      description: "หลังจากย้ายเข้าบ้านเช่าใหม่ เด็กหญิงคนหนึ่งเริ่มพูดคุยกับตุ๊กตาตัวเก่าที่พบในห้องเก็บของ ก่อนจะเกิดเหตุการณ์ประหลาดขึ้นทุกคืน..."
    },
    {
      title: "เงาลึกลับริมถนนพหลโยธิน",
      description: "คืนหนึ่งขณะขับรถกลับบ้านบนถนนพหลโยธิน ฉันเห็นเงาดำสูงใหญ่ยืนอยู่ข้างทาง แม้จะขับผ่านไปแล้วแต่กระจกหลังก็ยังสะท้อนภาพเงานั้นที่เหมือนจะขยับเข้ามาใกล้ขึ้นเรื่อย ๆ... จนต้องเร่งเครื่องหนีโดยไม่กล้าหันกลับไปมองอีกเลย"
    },
  ]
  return (
    <div className="main-container">
      <div className="main-content">
        <NavigationBar />
        <div className="text-center mt-[100px]">
          <div className="text-[40px] text-white">ใครบางคนอาจอยู่ใกล้ตัวคุณมากกว่าที่คุณคิด</div>
          <div className="text-red text-[36px]">คุณกล้าพอที่จะรู้ไหม..?</div>
        </div>
        <div className="w-[80%] mx-auto">
          <div className="my-[80px]">
            <GhostNearMeSearchCard onSearch={handleSearch} />
          </div>
          <div>
            <div className="flex justify-between items-end mb-[40px]">
              <div className={`text-[32px] font-bold ${searchQuery ? "text-red-500" : "text-white"}`}>
                
                {searchQuery ? `${searchQuery}` : "เรื่องเล่าจากทางบ้าน"} 
                {searchQuery && (<span className="text-white">ใกล้ฉัน</span>)}</div>
              <div className="text-[20px] text-white">ดูทั้งหมด</div>
            </div>

            <div className="grid grid-cols-2 gap-[32px]">
              {mockData.filter((item) => {
                if (searchQuery === "บางเขน") {
                  return item.title.toLowerCase().includes("พหลโยธิน")
                }
                return item.title.toLowerCase().includes(searchQuery.toLowerCase())
              }).map((item) => (
                <GradientCard title={item.title} description={item.description} key={item.title} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
