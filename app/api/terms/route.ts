import { prisma } from '@/lib/prisma'
import { getServerSession } from '@/utils/auth'
import logger from '@/utils/logger'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const session = getServerSession()

    if (!session) {
      throw new Error('Unauthorized')
    }

    const body = await request.json()

    const { policyType, version, content, effectiveDate } = body

    // validation
    if (!policyType || !version || !content || !effectiveDate) {
      throw new Error(
        'Missing required fields: policyType, version, content, and effectiveDate are required'
      )
    }

    const dateObject = new Date(effectiveDate)
    // Check if the date object is valid
    if (isNaN(dateObject.getTime())) {
      throw new Error('Invalid date format')
    }

    const newTerm = await prisma.termContent.create({
      data: {
        policyType: policyType,
        version: version,
        content: content,
        effectiveDate: dateObject,
      },
    })

    return NextResponse.json({
      message: `New Terms with id ${newTerm.id} are added successfully`,
    })
  } catch (error: unknown) {
    // Handle Prisma Unique constraint violation (P2002)
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        {
          message: `Conflict: A TermContent record with policyType and version already exists.`,
        },
        { status: 409 }
      )
    }

    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    logger.error('Prisma TermContent creation error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const terms = await prisma.termContent.findMany({
      // Optional: order by policy type and then by effective date descending
      orderBy: [{ policyType: 'asc' }, { effectiveDate: 'desc' }],
      // Optional: select specific fields to keep the payload small
      select: {
        id: true,
        policyType: true,
        content: true,
        version: true,
        effectiveDate: true,
      },
    })

    return NextResponse.json({
      data: terms[0],
    })
  } catch (error: unknown) {
    logger.error('Prisma TermContent get error:', error)
    return NextResponse.json(
      { message: 'Internal Server Error.' },
      { status: 500 }
    )
  }
}
