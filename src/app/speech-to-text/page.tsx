'use client'

import React, { useRef, useCallback, useEffect } from 'react'
import { ChevronLeft, Mic, Pause, Play, Square, Volume2, Download, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// Mock Thai ghost story text for demonstration
const mockupText = `
สวัสดีครับ ผมคิดอยู่นานมากว่าควรโพสต์เล่าเรื่องนี้ดีไหม แต่จากการที่ผมเห็นหลายๆคนออกมาแชร์ประสบการ์ณกัน มันจึงทำให้ผมอยากจะเล่าเรื่องนี้โดยหวังว่าคนที่บริเวณอยู่ใกล้เคียงกับผมจะได้อ่านด้วย คือเรื่องมันมีอยู่ว่าผมได้มีโอกาสไปเข้าค่ายในที่แห่งนึง ซึ่งผมไม่สามารถบอกพิกัดตรงๆได้ แต่อยู่ในโซนที่ค่อนข้างคึกคักในกรุงเทพเลยทีเดียว ในคืนนึงระหว่างที่ผมกำลังพักผ่อนอยู่ในโรงแรมนั้น จู่ๆผมก็ได้ยินเสียงกรีดร้องที่ดังมากจนทำให้ผมต้องสะดุ้งตื่นขึ้นมากลางดึก แต่เมื่อผมตื่นขึ้นและมองไปรอบๆนั้น ผมกลับไม่พบอะไรที่ผิดปกติสักอย่างเดียว เว้นแต่เพื่อนของผมที่ไปยืนอยู่ตรงมุมห้องท่ามกลางความมืดอยู่คนเดียว ด้วยท่าทีแปลกๆ พอผมเรียกชื่อเพื่อนคนนั้น เขาก็กลับยืนนิ่งไม่ตอบอะไรผมสักอย่าง แต่ทันใดนั้นเองจู่ๆผมได้ยินเสียงทุบประตูที่ดังมากจนเหมือนกับมีคนกำลังพยายามพังประตูห้องพักของผม พร้อมกับเสียงกรีดร้องอ้อนวอนที่ขอให้ผมช่วยเขาโดยเปิดประตู เสียงตะโกนนั้นฟังดูเหนื่อยหอบ และมีน้ำเสียงแหบแห้ง เหมือนกำลังวิ่งหนีอะไรบางอย่างมาไม่มีผิด นั่นจึงทำให้ผมตกใจมากและอีกใจนึงก็รู้สึกคุ้นเคยกับเสียงกรีดร้องนี้อย่างบอกไม่ถูก แต่ผมก็คิดไม่ออกว่านั่นคือเสียงของใครอยู่ดี ผมจึงรีบตะโกนเรียกเพื่อนของผมคนเดิมที่ยังคงยืนอยู่ในมุมห้องมืดๆอีกครั้ง แต่เพื่อนผมก็ยังคงนิ่งสนิทไม่ตอบอะไรกับมาเช่นเดิม พร้อมกับเสียงทุบประตูและเสียงกรีดร้องที่ดังยิ่งขึ้นเรื่อยๆ ในตอนนั้นเองผมกำลังรู้สึกว่าตัวเองใกล้ที่จะสติแตกเต็มทีจากเสียงประหลาดหน้าประตู พร้อมกับพฤติกรรมแปลกๆของเพื่อนผม ดังนั้นผมจึงรีบเดินเข้าไปกระชากแขนของเพื่อนของผมด้วยความโมโห แต่เพื่อนของผมดันล้ม ตุบ! เหมือนกับตุ๊กตากระดาษ และทันใดนั้นเสียงทุบประตูและเสียงกรีดร้องก็ได้หายไปเหมือนกับไม่เคยเกิดขึ้นมาก่อน   

ผมรีบสะดุ้งตื่นขึ้นมาทันที และพบว่าท้องฟ้าข้างนอกสว่างแล้ว และคิดได้ว่าเรื่องทั้งหมดที่เกิดขึ้นนั้นเป็นแค่ความฝันเท่านั้น ไม่มีเสียงกรีดร้องหรือทุบประตูแล้ว ไม่มีบรรยากาศแปลกๆอีกแล้ว มีเพียงอย่างเดียวที่เหมือนเดิมคือ เพื่อนของผมนั้นยังคงยืนอยู่ที่เดิม มุมห้องเดิม มีความต่างจากเดิมคือ เพื่อนของผมที่ไม่หายใจ ห้อยอยู่บนมุมห้อง และสายตาของเขาที่จ้องเขม็งมาที่ผมเหมือนกับไม่ใช่เพื่อนของผมอีกต่อไป

ในขณะที่ผมตกใจกับภาพของเพื่อนผมอยู่นั้น ทันใดนั้นผมก็ได้ยินเสียงเบาๆที่เหมือนกำลังกระซิบบอกผมว่า 'ทำไมไม่เปิดประตูให้กู'
`.trim()

// Recording states
type RecordingState = 'idle' | 'recording' | 'paused' | 'completed'

// Audio visualization component
const AudioWaveform = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="flex items-center gap-1 justify-center h-16">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`w-1 bg-white/60 rounded-full transition-all duration-150 ${
            isActive 
              ? `animate-pulse h-10` 
              : 'h-4'
          }`}
          style={{ 
            animationDelay: `${i * 100}ms`,
            height: isActive ? `${Math.floor(Math.random() * 32) + 16}px` : '16px'
          }}
        />
      ))}
    </div>
  )
}

// Main recording interface component
const RecordingInterface = ({ 
  state, 
  onStart, 
  onPause, 
  onResume, 
  onStop,
  duration 
}: {
  state: RecordingState
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
  duration: number
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (state === 'idle') {
    return (
      <div className="flex flex-col items-center gap-6">
        <button 
          onClick={onStart}
          className="cursor-pointer group relative bg-gradient-to-br from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 rounded-full p-6 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          <Mic className="w-16 h-16 text-white" />
          <div className="absolute inset-0 rounded-full bg-red-400/20" />
        </button>
        <p className="text-white/80 text-lg font-medium">แตะเพื่อเริ่มบันทึกเสียง</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Waveform visualization */}
      <div className="bg-black/30 rounded-2xl px-8 py-4 backdrop-blur-sm">
        <AudioWaveform isActive={state === 'recording'} />
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-4">
        {state === 'recording' ? (
          <button
            onClick={onPause}
            className="cursor-pointer bg-yellow-500 hover:bg-yellow-400 rounded-full p-4 transition-all duration-200 transform hover:scale-105"
          >
            <Pause className="w-6 h-6 text-white" />
          </button>
        ) : state === 'paused' ? (
          <button
            onClick={onResume}
            className="cursor-pointer bg-green-500 hover:bg-green-400 rounded-full p-4 transition-all duration-200 transform hover:scale-105"
          >
            <Play className="w-6 h-6 text-white" />
          </button>
        ) : null}

        <button
          onClick={onStop}
          className="cursor-pointer bg-red-500 hover:bg-red-400 rounded-full p-4 transition-all duration-200 transform hover:scale-105"
        >
          <Square className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Timer and status */}
      <div className="text-center">
        <div className="text-white text-2xl font-mono font-bold mb-2">
          {formatTime(duration)}
        </div>
        <div className="text-white/70 text-sm">
          {state === 'recording' && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>กำลังบันทึก...</span>
            </div>
          )}
          {state === 'paused' && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <span>หยุดชั่วคราว</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Text display component with better formatting
const TextDisplay = ({ 
  text, 
  isGenerating,
  onCopy,
  onDownload,
  copied
}: {
  text: string
  isGenerating: boolean
  onCopy: () => void
  onDownload: () => void
  copied: boolean
}) => {
  const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-6 w-full max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Volume2 className="w-6 h-6 text-white/80" />
          <h3 className="text-white text-xl font-semibold">
            {isGenerating ? 'กำลังแปลงเสียงเป็นข้อความ...' : 'ข้อความที่แปลงได้'}
          </h3>
        </div>
        
        {/* {text && (
          <div className="flex items-center gap-2">
            <button
              onClick={onCopy}
              className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-3 py-2 rounded-lg transition-all duration-200"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span className="text-sm">{copied ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
            </button>
            <button
              onClick={onDownload}
              className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 px-3 py-2 rounded-lg transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">ดาวน์โหลด</span>
            </button>
          </div>
        )} */}
      </div>

      {/* Text area */}
      <div className="bg-gray-900/60 rounded-2xl p-6 min-h-[400px] relative">
        {isGenerating && (
          <div className="absolute top-4 right-4">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        )}
        
        <textarea
          value={text}
          readOnly
          className="w-full h-80 bg-transparent border-none outline-none resize-none text-white text-lg leading-relaxed placeholder:text-white/40"
          placeholder={isGenerating ? '' : 'ข้อความที่แปลงจากเสียงจะปรากฏที่นี่...'}
        />
        
        {/* Word count */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <p className="text-white/60 text-sm">
            จำนวนคำ: <span className="text-white font-medium">{wordCount}</span> คำ
          </p>
          <p className="text-white/60 text-sm">
            ตัวอักษร: <span className="text-white font-medium">{text.length}</span> ตัว
          </p>
        </div>
      </div>
    </div>
  )
}

// Main page component
export default function SpeechToTextPage() {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle')
  const [text, setText] = useState('')
  const [duration, setDuration] = useState(0)
  const [copied, setCopied] = useState(false)
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const indexRef = useRef(0)
  const router = useRouter()

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startTextGeneration = useCallback(() => {
    // Don't reset text and index if we're resuming from pause
    if (recordingState !== 'paused') {
      indexRef.current = 0
      setText('')
    }
    
    intervalRef.current = setInterval(() => {
      indexRef.current += Math.floor(Math.random() * 3) + 1 // Variable speed
      setText(mockupText.slice(0, indexRef.current))
      
      if (indexRef.current >= mockupText.length) {
        clearInterval(intervalRef.current!)
        intervalRef.current = null
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
        setRecordingState('completed')
        router.push('/speech-to-text/result')
      }
    }, 80)
  }, [recordingState])

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setDuration(prev => prev + 1)
    }, 1000)
  }, [])

  const handleStart = useCallback(() => {
    if (recordingState === 'paused') {
      // Resume from pause - don't reset anything, just continue
      setRecordingState('recording')
      startTextGeneration()
      startTimer()
    } else {
      // Start new recording - reset everything
      setRecordingState('recording')
      setDuration(0)
      indexRef.current = 0
      setText('')
      startTextGeneration()
      startTimer()
    }
  }, [recordingState, startTextGeneration, startTimer])

  const handlePause = useCallback(() => {
    setRecordingState('paused')
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const handleResume = useCallback(() => {
    setRecordingState('recording')
    startTextGeneration()
    startTimer()
  }, [startTextGeneration, startTimer])

  const handleStop = useCallback(() => {
    setRecordingState('completed')
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const handleReset = useCallback(() => {
    setRecordingState('idle')
    setText('')
    setDuration(0)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }, [text])

  const handleDownload = useCallback(() => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ghost-story-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [text])

  const isGenerating = recordingState === 'recording' || recordingState === 'paused'

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
            แปลงเสียงเป็นข้อความ
          </h1>
          
          <div className="w-24" /> {/* Spacer for balance */}
        </div>

        {/* Main content */}
        <div className="flex flex-col items-center gap-12 w-full max-w-6xl">
          {/* Recording interface */}
          <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
            <RecordingInterface
              state={recordingState}
              onStart={handleStart}
              onPause={handlePause}
              onResume={handleResume}
              onStop={handleStop}
              duration={duration}
            />
          </div>

          {/* Reset button for completed state */}
          {recordingState === 'completed' && (
            <button
              onClick={handleReset}
              className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
            >
              บันทึกใหม่
            </button>
          )}

          {/* Text display */}
          <TextDisplay
            text={text}
            isGenerating={isGenerating}
            onCopy={handleCopy}
            onDownload={handleDownload}
            copied={copied}
          />
        </div>

        {/* Footer hint */}
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm">
            💡 คุณสามารถใช้ฟีเจอร์นี้เพื่อแปลงเรื่องเล่าผีของคุณเป็นข้อความได้
          </p>
        </div>
      </div>
    </div>
  )
}