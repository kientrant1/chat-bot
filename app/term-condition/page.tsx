import { OriginalMarkdownRenderer } from '@/components/MarkdownRenderer'
import { getTermContent } from '@/services/termConditionService'

export default async function TermAndConditionPage() {
  const data = await getTermContent(true)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <OriginalMarkdownRenderer className="font-normal" content={data} />
      </div>
    </div>
  )
}
