import { NextRequest, NextResponse } from 'next/server';
import { getAllInsuranceTypes } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    // Get all insurance types from database
    const insuranceTypes = await getAllInsuranceTypes();
    
    return NextResponse.json({ 
      success: true, 
      data: insuranceTypes
    });
  } catch (error) {
    console.error('Error fetching insurance types:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insurance types' },
      { status: 500 }
    );
  }
}
