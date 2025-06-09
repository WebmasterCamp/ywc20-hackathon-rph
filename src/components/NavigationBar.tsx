import Link from "next/link";
import React from "react";

const NavigationBar = () => {
  return (
    <div className="flex items-center p-4">
      <div className="flex items-center w-full">
        <div className="flex gap-8 items-center">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="logo" className="w-10 h-10" />
              <div className="text-white font-bold">หาผีใกล้ฉัน</div>
            </div>
          </Link>
          <div className="text-white">
            <Link href="/my">เรื่องเล่า</Link>
          </div>
        </div>
        <div className="flex-1" />
        <div className="text-white">
          <Link href="/login">เข้าสู่ระบบ</Link>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
