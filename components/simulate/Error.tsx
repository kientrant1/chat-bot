export default function SimulateError() {
  const simulateError = () => {
    console.error('Simulated error for testing purposes')
  }

  return (
    <button
      onClick={simulateError}
      className="w-full text-left px-3 py-2 mt-2 text-sm text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors flex items-center gap-2 rounded-md border border-orange-200 dark:border-orange-800"
    >
      <span className="text-orange-500">⚠️</span>
      Simulate Error
    </button>
  )
}
