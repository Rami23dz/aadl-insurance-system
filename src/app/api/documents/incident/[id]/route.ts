import { NextRequest, NextResponse } from 'next/server';
import { getDocumentsByIncidentId } from '@/lib/db/queries';

export async function GET(
  request: NextRequest,
  context: any
) {
  try {
    const id = parseInt(context.params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid incident report ID' },
        { status: 400 }
      );
    }
    
    // Get documents by incident report ID
    const documents = await getDocumentsByIncidentId(id);
    
    return NextResponse.json({ 
      success: true, 
      data: documents
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}
