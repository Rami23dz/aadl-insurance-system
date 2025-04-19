import { NextRequest, NextResponse } from 'next/server';
import { getIncidentReportById, createGeneratedDocument } from '@/lib/db/queries';
import path from 'path';
import fs from 'fs/promises';
import { Packer } from 'docx';
import { generateDeclarationForm, generateDepotPlainte } from '@/lib/document-generator';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const { incidentReportId, documentType, language, userId } = data;
    
    if (!incidentReportId || !documentType || !language || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Get incident report data
    const reportData = await getIncidentReportById(incidentReportId);
    
    if (!reportData) {
      return NextResponse.json(
        { error: 'Incident report not found' },
        { status: 404 }
      );
    }
    
    // Generate document based on type and language
    let doc;
    if (documentType === 'declaration') {
      doc = await generateDeclarationForm(reportData);
    } else if (documentType === 'depot_plainte') {
      doc = await generateDepotPlainte(reportData);
    } else {
      return NextResponse.json(
        { error: 'Invalid document type' },
        { status: 400 }
      );
    }
    
    // Create documents directory if it doesn't exist
    const documentsDir = path.join(process.cwd(), 'public', 'documents');
    try {
      await fs.mkdir(documentsDir, { recursive: true });
    } catch (error) {
      console.error('Error creating documents directory:', error);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}_${reportData.report_number}_${documentType}_${language}.docx`;
    const filePath = path.join(documentsDir, fileName);
    
    // Save document to file
    const buffer = await Packer.toBuffer(doc);
    await fs.writeFile(filePath, buffer);
    
    // Relative path for database storage and frontend access
    const relativePath = `/documents/${fileName}`;
    
    // Save document record in database
    const documentData = {
      incident_report_id: incidentReportId,
      document_type: documentType,
      file_path: relativePath,
      language: language,
      generated_by: userId
    };
    
    const result = await createGeneratedDocument(documentData);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Document generated successfully',
      documentId: result.insertId,
      filePath: relativePath
    });
  } catch (error) {
    console.error('Error generating document:', error);
    return NextResponse.json(
      { error: 'Failed to generate document' },
      { status: 500 }
    );
  }
}
