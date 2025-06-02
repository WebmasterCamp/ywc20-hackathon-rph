import NavigationBar from "@/components/NavigationBar";
import Image from "next/image";
import GhostNearMeSearchCard from "@/components/GhostNearMeSearchCard/GhostNearMeSearchCard";
export default function Home() {
  return (

    <div>
      <NavigationBar />
      <div className="text-center">
        <div className="text-[40px]">ใครบางคนอาจอยู่ใกล้ตัวคุณมากกว่าที่คุณคิด</div>
        <div className="text-red text-[36px]">คุณกล้าพอที่จะรู้ไหม..?</div>
      </div>
      <div className="w-[80%] mx-auto">
        <GhostNearMeSearchCard />
        <div>
          <div className="flex justify-between">
            <div>เรื่องเล่าจากทางบ้าน</div>
            <div>ดูทั้งหมด</div>
          </div>
        </div>
      </div>
    </div>
  );
}
