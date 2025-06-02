import GhostNearMeSearchCard from "@/components/GhostNearMeSearchCard/GhostNearMeSearchCard";
import GradientCard from "@/components/GradientCard/GradientCard";
import NavigationBar from "@/components/NavigationBar";
import './page.css';

export default function Home() {
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
            <GhostNearMeSearchCard />
          </div>
          <div>
            <div className="flex justify-between items-end mb-[40px]">
              <div className="text-[32px] font-bold text-white">เรื่องเล่าจากทางบ้าน</div>
              <div className="text-[20px] text-white">ดูทั้งหมด</div>
            </div>

            <div className="grid grid-cols-2 gap-[32px]">
              <GradientCard title="เรื่องเล่าจากทางบ้าน" description="เรื่องเล่าจากทางบ้าน" />
              <GradientCard title="เรื่องเล่าจากทางบ้าน" description="เรื่องเล่าจากทางบ้าน" />
              <GradientCard title="เรื่องเล่าจากทางบ้าน" description="เรื่องเล่าจากทางบ้าน" />
              <GradientCard title="เรื่องเล่าจากทางบ้าน" description="เรื่องเล่าจากทางบ้าน" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
