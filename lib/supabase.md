# SUPABASE_SETUP.md

# 📘 Supabase Setup Guide for Quiz Application (JSON Model)

This guide explains how to:

- Store quiz questions in **Supabase** as a single JSONB column
- Use **Next.js (App Router)** to fetch and render questions
- Build a simple **admin panel** to add/edit questions
- Track **quiz attempts** and show a **leaderboard**

---

## 1. 🛠️ Create Supabase Project

1. Go to https://supabase.com
2. Create a new project.
3. In **Project Settings → API**, copy:
   - **Project URL**
   - **anon public key**

You’ll use these in `.env.local`.

---

## 2. 🗄️ Database Schema

We’ll use:

- `questions` table — stores the full question object as JSON
- `quiz_attempts` table — stores user scores (for leaderboard / history)

### 2.1 `questions` table (full JSON)

In Supabase Dashboard → **SQL Editor**, run:

```sql
create table if not exists questions (
  id       bigserial primary key,
  question jsonb not null          -- full QuestionBank object
);

create index if not exists idx_questions_tag_json
  on questions ((question->>'tag'));
```

## 3. Environment Setup

### 3. In your project root

```
yarn install @supabase/supabase-js @supabase/ssr

```

Create .env.local

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

### 3.2 Create SupaBase function

```
// utils/supabase.ts
import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

export const createServerClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
```

### 3.3 Create API import Data

```
// app/api/questions
import { NextResponse } from 'next/server'
import { createServerClient } from '@/libs/supabase'

export async function POST() {
  const supabase = createServerClient()

  // Prepare data
  const payload = YOUR_DATA.map((q) => ({
    question: q,
  }))

  // insert data into table
  const { error } = await supabase.from('questions').insert(payload)

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
```

Can run below command to test

```
curl -X POST http://localhost:3000/api/questions
```

### 3.4 Create service to fetch data

```
// services/questions.ts
import { createServerClient } from '@/libs/supabase'

async function getQuestions(): Promise<Data[]> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error(error)
    return []
  }

  const rows = data as DBQuestionRow[]
  return rows.map((row) => row.question)
}
```

### 3.5 Display data in page

```
import { getQuestions } from '@/services/questions'

export default async function QuizPage() {
  const questions = await getQuestions()
  // Render UI base on questions
}
```
