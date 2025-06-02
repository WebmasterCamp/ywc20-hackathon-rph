import GhostNearMeSearchCard from "@/components/GhostNearMeSearchCard/GhostNearMeSearchCard";
import NavigationBar from "@/components/NavigationBar";
import React from "react";
import './page.css';
import GradientCard from "@/components/GradientCard/GradientCard";
import CreateGhostStory from "@/components/CreateGhostStory/CreateGhostStory";
const My = () => {
  return (
    <div className="main-container">
      <div className="main-content">
        <NavigationBar />
        <div className="text-center mt-[100px]">
          <div className="text-[40px] text-white">
            แชร์เรื่องเล่า
          </div>
        </div>
        <div className="w-[80%] mx-auto">
          <div className="mt-[20px] mb-[80px]">
            <CreateGhostStory />
          </div>
          <div>
            <div className="flex justify-between items-end mb-[40px]">
              <div className="text-[32px] font-bold text-white">
                เรื่องเล่าจากทางบ้าน
              </div>
              <div className="text-[20px] text-white">ดูทั้งหมด</div>
            </div>

            <div className="grid grid-cols-2 gap-[32px]">
              <GradientCard
                title="เรื่องเล่าจากทางบ้าน"
                description="เรื่องเล่าจากทางบ้าน"
              />
              <GradientCard
                title="เรื่องเล่าจากทางบ้าน"
                description="เรื่องเล่าจากทางบ้าน"
              />
              <GradientCard
                title="เรื่องเล่าจากทางบ้าน"
                description="เรื่องเล่าจากทางบ้าน"
              />
              <GradientCard
                title="เรื่องเล่าจากทางบ้าน"
                description="เรื่องเล่าจากทางบ้าน"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default My;
