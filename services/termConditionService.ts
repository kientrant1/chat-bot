import { siteConfig } from '@/constants/siteConfig'
import logger from '@/utils/logger'

export const getTermContent = async (isSSG: boolean): Promise<string> => {
  try {
    const response = await fetch(`${siteConfig.nextAppUrl}/api/terms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: isSSG ? 'force-cache' : 'no-store',
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to get content response')
    }

    const data = await response.json()
    return data.data.content
  } catch (error) {
    logger.error('Error getting Terms content', error)
    return 'Having problem with API. Please try again later.'
  }
}
