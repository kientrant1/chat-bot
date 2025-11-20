import { useEffect, useRef } from 'react'
import { useTimerStore } from '@/store/timerStore'

const useTimeCounter = () => {
  const { isRunning, incrementTimer, resetTimer, setIsRunning } =
    useTimerStore()
  const timer = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (!isRunning) {
      clearInterval(timer.current)
      return
    }

    timer.current = setInterval(() => {
      incrementTimer()
    }, 1000)

    // This cleanup function runs when isRunning changes or component unmounts
    return () => {
      clearInterval(timer.current)
    }
  }, [isRunning, incrementTimer])

  return {
    resetTimer,
    setIsRunning,
  }
}

export default useTimeCounter
