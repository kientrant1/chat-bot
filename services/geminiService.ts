import logger from '@/utils/logger'

export const callGeminiAPI = async (message: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to get AI response')
    }

    const data = await response.json()
    return data.response
  } catch (error) {
    logger.error('Error calling Gemini API:', error)
    return "I'm sorry, I'm having trouble connecting to the AI service right now. Please try again later."
  }
}
