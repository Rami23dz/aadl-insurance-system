import { NextRequest, NextResponse } from 'next/server';
import { getIncidentReports } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  try {
    // Get all incident reports from database
    const reports = await getIncidentReports();
    
    return NextResponse.json({ 
      success: true, 
      data: reports
    });
  } catch (error) {
    console.error('Error fetching incident reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch incident reports' },
      { status: 500 }
    );
  }
}
