'use client';

import { useRouter } from 'next/navigation';

export default function LoginSuccess() {
  const router = useRouter();

  const handleLogout = () => {
    // ในอนาคตจะใส่ logic logout ที่นี่
    router.push('/login'); // กลับไปหน้า login
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black to-red-900 p-4 text-white">
      <h1 className="text-4xl font-bold mb-6">ยินดีต้อนรับสู่หน้า Home 👻</h1>
      <p className="mb-10 text-center max-w-md">
        คุณเข้าสู่ระบบสำเร็จแล้ว! ตอนนี้คุณสามารถใช้งานเว็บไซต์หาผีใกล้ฉันได้ตามต้องการ
      </p>
      <button
        onClick={handleLogout}
        className="bg-red-800 px-6 py-3 rounded hover:bg-red-700 transition"
      >
        ออกจากระบบ
      </button>
    </div>
  );
}