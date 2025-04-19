import { NextRequest, NextResponse } from 'next/server';
import { createSystemLog } from '@/lib/db/queries';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['user_id', 'action', 'details'];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Get IP address from request
    const ip_address = request.headers.get('x-forwarded-for') || 
                       request.headers.get('x-real-ip') || 
                       '127.0.0.1';
    
    // Create log entry in database
    const logData = {
      user_id: data.user_id,
      action: data.action,
      details: data.details,
      ip_address
    };
    
    await createSystemLog(logData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'System log created successfully'
    });
  } catch (error) {
    console.error('Error creating system log:', error);
    return NextResponse.json(
      { error: 'Failed to create system log' },
      { status: 500 }
    );
  }
}
