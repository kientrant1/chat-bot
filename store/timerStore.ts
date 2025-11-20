import { create } from 'zustand'
import { withDevtools } from './middleware/withDevtools'

interface TimerState {
  timer: number
  isRunning: boolean
}

interface TimerStore extends TimerState {
  setTimer: (timer: number) => void
  setIsRunning: (isRunning: boolean) => void
  incrementTimer: () => void
  resetTimer: () => void
}

const initialState: TimerState = {
  timer: 0,
  isRunning: true,
}

export const useTimerStore = create<TimerStore>()(
  withDevtools(
    set => ({
      ...initialState,

      setTimer: (timer: number) => set({ timer }, false, 'setTimer'),

      setIsRunning: (isRunning: boolean) =>
        set({ isRunning }, false, 'setIsRunning'),

      incrementTimer: () =>
        set(state => ({ timer: state.timer + 1 }), false, 'incrementTimer'),

      resetTimer: () => set({ ...initialState }, false, 'resetTimer'),
    }),
    { name: 'TimerStore' }
  )
)
