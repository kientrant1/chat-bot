'use client'

import dynamic from 'next/dynamic'

interface TermConditionContentProps {
  content: string
}

const MarkdownRenderer = dynamic(
  () => import('snackact-ui').then(mod => mod.MarkdownRenderer),
  {
    ssr: false,
    loading: () => <p>Loading content...</p>,
  }
)

export default function TermConditionContent({
  content,
}: TermConditionContentProps) {
  return <MarkdownRenderer className="font-normal" content={content} />
}
