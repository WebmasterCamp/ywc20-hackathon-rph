'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) return setError('อีเมลไม่ถูกต้อง');
    if (!password) return setError('กรุณากรอกรหัสผ่าน');
    setError('');
    setSuccess(true);

    // หลังจาก login สำเร็จ redirect ไปหน้า /home
    router.push('/login/success');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-red-900 p-4">
      <form onSubmit={handleSubmit} className="bg-black/80 p-10 rounded-2xl w-full max-w-md text-white">
        <h1 className="flex text-[20px] font-semibold mb-2 items-center justify-center">
          <img src="/Mask group.png" alt="" className='w-[37px] h-[37px]'/>
          หาผีใกล้ฉัน</h1>
          <div  className='text-center'>เข้าสู่ระบบ </div>

        <label className="block mb-4">
          <span>อีเมล</span>
          <input
            type="text"
            className="w-full mt-1 p-2 rounded-full text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block mb-4">
          <span>รหัสผ่าน</span>
          <input
            type="password"
            className="w-full mt-1 p-2 rounded-full text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <div className="text-red-400 mb-2">{error}</div>}
        {success && <div className="text-green-400 mb-2 ">เข้าสู่ระบบสำเร็จ!</div>}
        <button type="submit" className="mt-2 bg-red-800 w-full py-2 rounded hover:bg-red-700">
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
}