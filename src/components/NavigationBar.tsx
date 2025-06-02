import React from "react";

const NavigationBar = () => {
  return (
    <div className="flex items-center p-4">
      <div className="flex gap-8 items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-10 h-10" />
          <div className="text-white font-bold">หาผีใกล้ฉัน</div>
        </div>
        <div className="text-white">เรื่องเล่า</div>
      </div>
    </div>
  );
};

export default NavigationBar;
