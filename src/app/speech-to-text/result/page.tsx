'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { ChevronLeft, Play, Pause, RotateCcw, Download, Copy, Check, Volume2, Share } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Mock result text (same as from the main page)
const resultText = `คืนหนึ่งที่ค่ายกลางกรุงเทพ ผมสะดุ้งตื่นเพราะเสียงกรีดร้องและเสียงทุบประตูห้อง พร้อมเสียงที่ตะโกนบอกว่าช่วยด้วย ผมเรียกเพื่อนแต่เพื่อนยังคงยืนนิ่งอยู่ที่มุมห้อง ด้วยความโมโห ผมคว้าแขนเพื่อน แต่เขากลับล้มลงเหมือนตุ๊กตากระดาษ และเสียงทุกอย่างก็เงียบไป ผมตื่นมาอีกครั้งคิดว่าเป็นแค่ฝัน แต่แล้วก็พบว่าเพื่อนผมยังยืนอยู่ที่เดิม... ไม่หายใจ และ ตัวห้อยอยู่`

// Mock audio duration (in seconds)
const AUDIO_DURATION = 180 // 3 minutes

// Audio player component
const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  
  const audioRef = useRef<HTMLAudioElement>(null)

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Initialize audio and set up event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
    }

    const handleError = () => {
      setIsLoading(false)
      console.error('Error loading audio file')
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
    }
  }, [])

  const handlePlayPause = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Error playing audio:', error)
      setIsPlaying(false)
    }
  }

  const handleRestart = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = 0
    setCurrentTime(0)
    setIsPlaying(false)
    audio.pause()
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 w-full max-w-2xl">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        preload="metadata"
        src="/demoPhee.MP3"
      />

      <div className="flex items-center gap-3 mb-4">
        <Volume2 className="w-5 h-5 text-white/80" />
        <h3 className="text-white text-lg font-semibold">เสียงที่บันทึกได้</h3>
        {isLoading && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
            <span className="text-white/60 text-sm">กำลังโหลด...</span>
          </div>
        )}
      </div>

      {/* Waveform visualization */}
      <div className="bg-gray-900/60 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-center h-16 gap-1">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-300 ${
                i <= (24 * progressPercentage / 100) 
                  ? 'bg-red-400' 
                  : 'bg-white/30'
              } ${isPlaying ? 'animate-pulse' : ''}`}
              style={{ 
                height: `${Math.sin(i * 0.5) * 20 + 30}px`
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handlePlayPause}
          disabled={isLoading}
          className="bg-red-500 hover:bg-red-400 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-full p-3 transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
        >
          {isLoading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </button>

        <button
          onClick={handleRestart}
          disabled={isLoading}
          className="bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-full p-3 transition-all duration-200"
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </button>

        <div className="flex-1 flex items-center gap-3">
          <span className="text-white/70 text-sm font-mono min-w-[3rem]">
            {formatTime(currentTime)}
          </span>
          
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              disabled={isLoading || duration === 0}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider disabled:cursor-not-allowed"
            />
            <div 
              className="absolute top-0 left-0 h-2 bg-red-500 rounded-lg pointer-events-none transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <span className="text-white/70 text-sm font-mono min-w-[3rem]">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Audio info */}
      <div className="text-white/60 text-sm text-center">
        <span>
          {isLoading 
            ? 'กำลังโหลดไฟล์เสียง...' 
            : `คุณภาพเสียง: MP3 • ระยะเวลา: ${formatTime(duration)}`
          }
        </span>
      </div>
    </div>
  )
}

// Result text display component
const ResultTextDisplay = ({ 
  text,
  onCopy,
  onDownload,
  onShare,
  copied
}: {
  text: string
  onCopy: () => void
  onDownload: () => void
  onShare: () => void
  copied: boolean
}) => {
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-6 w-full max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <h3 className="text-white text-xl font-semibold">
            ผลลัพธ์การแปลงเสียงเป็นข้อความ
          </h3>
        </div>
        
        {/* <div className="flex items-center gap-2">
          <button
            onClick={onCopy}
            className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-4 py-2 rounded-lg transition-all duration-200"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span className="text-sm">{copied ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
          </button>
          
          <button
            onClick={onShare}
            className="flex items-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-4 py-2 rounded-lg transition-all duration-200"
          >
            <Share className="w-4 h-4" />
            <span className="text-sm">แชร์</span>
          </button>
          
          <button
            onClick={onDownload}
            className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 px-4 py-2 rounded-lg transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm">ดาวน์โหลด</span>
          </button>
        </div> */}
      </div>

      {/* Text area */}
      <div className="bg-gray-900/60 rounded-2xl p-6 min-h-[400px]">
        <textarea
          value={text}
          readOnly
          className="w-full h-80 bg-transparent border-none outline-none resize-none text-white text-lg leading-relaxed cursor-default"
          placeholder="ข้อความที่แปลงจากเสียง..."
        />
        
        {/* Stats */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <div className="flex gap-6">
            <p className="text-white/60 text-sm">
              จำนวนคำ: <span className="text-white font-medium">{wordCount}</span> คำ
            </p>
            <p className="text-white/60 text-sm">
              ตัวอักษร: <span className="text-white font-medium">{text.length}</span> ตัว
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-green-400 text-sm font-medium">แปลงเสร็จสิ้น</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main result page component
export default function SpeechToTextResultPage() {
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(resultText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }, [])

  const handleDownload = useCallback(() => {
    const blob = new Blob([resultText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ghost-story-transcript-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [])

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: 'เรื่องเล่าผี - บันทึกเสียง',
        text: resultText,
        url: window.location.href,
      })
    } else {
      // Fallback to copy link
      navigator.clipboard.writeText(window.location.href)
      alert('ลิงก์ถูกคัดลอกไปยังคลิปบอร์ดแล้ว!')
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/assets/ghost-pattern.png')] opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      
      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen p-6 pt-20">
        {/* Header */}
        <div className="w-full max-w-6xl flex items-center justify-between mb-12">
          <button 
            onClick={() => router.back()}
            className="cursor-pointer flex items-center gap-3 bg-black/30 hover:bg-black/40 backdrop-blur-sm rounded-full px-6 py-3 text-white transition-all duration-200 hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">กลับ</span>
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            ผลลัพธ์การบันทึก
          </h1>
          
          <div className="w-24" /> {/* Spacer for balance */}
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center gap-12 w-full max-w-6xl">
          {/* Audio Player */}
          <AudioPlayer />

          {/* Result Text Display */}
          <ResultTextDisplay
            text={resultText}
            onCopy={handleCopy}
            onDownload={handleDownload}
            onShare={handleShare}
            copied={copied}
          />

          {/* Action buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/speech-to-text')}
              className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
            >
              บันทึกใหม่
            </button>
            
            <button
              onClick={() => router.push('/stories/new')}
              className="cursor-pointer bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-400 hover:to-teal-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
            >
              สร้างเรื่องเล่า
            </button>
          </div>
        </div>

        {/* Footer hint */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            ✅ การแปลงเสียงเป็นข้อความเสร็จสิ้นแล้ว • คุณสามารถนำข้อความนี้ไปสร้างเรื่องเล่าผีได้
          </p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  )
}