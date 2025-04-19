import { NextRequest, NextResponse } from 'next/server';
import { createIncidentReport } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'reportNumber', 'buildingId', 'insuranceTypeId', 'incidentDate', 
      'reportDate', 'descriptionFr', 'descriptionAr', 'managerName', 
      'originalReportFile', 'createdBy'
    ];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Create incident report in database
    const result = await createIncidentReport(data);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Incident report created successfully',
      reportId: result.insertId
    });
  } catch (error) {
    console.error('Error creating incident report:', error);
    return NextResponse.json(
      { error: 'Failed to create incident report' },
      { status: 500 }
    );
  }
}
