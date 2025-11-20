import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'
import { QuestionTopic } from '@/types/quiz'
import { SCRUM_MASTER_BANK } from '@/__mock__/scrumMasterBank'

// Run once time to import
// curl -X POST http://localhost:3000/api/questions
// window: curl.exe -v -X POST http://localhost:3000/api/questions
export async function POST() {
  const supabase = createServerClient()

  const payload = SCRUM_MASTER_BANK.map(q => {
    const { id, ...data } = q
    void id // explicitly mark 'id' as unused
    return {
      topic: QuestionTopic.SCRUM_MASTER,
      question: data, // store full object as JSONB without 'id'
    }
  })

  const { error } = await supabase.from('questions').insert(payload)

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
