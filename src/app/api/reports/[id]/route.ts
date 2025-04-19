import { NextRequest, NextResponse } from 'next/server';
import { getIncidentReportById } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  context: any
) {
  try {
    const id = parseInt(context.params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid report ID' },
        { status: 400 }
      );
    }
    
    // Get incident report by ID
    const report = await getIncidentReportById(id);
    
    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      data: report
    });
  } catch (error) {
    console.error('Error fetching incident report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch incident report' },
      { status: 500 }
    );
  }
}
