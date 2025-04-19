import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createIncidentReport, getIncidentReportById, getIncidentReports } from '@/lib/db/queries';
import pool from '@/lib/db/config';
import { generateDeclarationForm, generateDepotPlainte } from '@/lib/document-generator';
import { Packer } from 'docx';
import fs from 'fs/promises';
import path from 'path';

// Mock data for testing
const testReport = {
  report_number: 'TEST-2025-001',
  building_id: 1,
  insurance_type_id: 1,
  incident_date: '2025-04-19',
  report_date: '2025-04-19',
  description_fr: 'Test description in French',
  description_ar: 'وصف اختبار باللغة العربية',
  manager_name: 'Test Manager',
  original_report_file: '/test/path/to/file.pdf',
  created_by: 1
};

describe('Insurance System Functionality Tests', () => {
  let reportId;
  
  // Setup test database connection
  beforeAll(async () => {
    // Create test tables if needed
    // This would typically be done in a test database
    console.log('Setting up test environment');
  });
  
  // Clean up after tests
  afterAll(async () => {
    // Clean up test data
    if (reportId) {
      try {
        await pool.query('DELETE FROM incident_reports WHERE id = ?', [reportId]);
      } catch (error) {
        console.error('Error cleaning up test data:', error);
      }
    }
    
    // Close database connection
    await pool.end();
  });
  
  // Test incident report creation
  it('should create an incident report', async () => {
    const result = await createIncidentReport(testReport);
    reportId = result.insertId;
    
    expect(result).toBeDefined();
    expect(result.insertId).toBeGreaterThan(0);
  });
  
  // Test incident report retrieval
  it('should retrieve an incident report by ID', async () => {
    const report = await getIncidentReportById(reportId);
    
    expect(report).toBeDefined();
    expect(report.report_number).toBe(testReport.report_number);
    expect(report.description_fr).toBe(testReport.description_fr);
    expect(report.description_ar).toBe(testReport.description_ar);
  });
  
  // Test incident reports list retrieval
  it('should retrieve a list of incident reports', async () => {
    const reports = await getIncidentReports();
    
    expect(reports).toBeDefined();
    expect(Array.isArray(reports)).toBe(true);
    expect(reports.length).toBeGreaterThan(0);
  });
  
  // Test document generation - French declaration
  it('should generate a French declaration document', async () => {
    // Get the report with additional data needed for document generation
    const reportData = {
      ...testReport,
      id: reportId,
      insurance_type_name: 'Vol',
      insurance_type_name_ar: 'سرقة',
      location_name: '1380 DRAA ERRICH',
      building_number: 'BAT 03',
      sector_number: 'SECTEUR 02'
    };
    
    const doc = await generateDeclarationForm(reportData);
    expect(doc).toBeDefined();
    
    // Test that document can be packed to buffer
    const buffer = await Packer.toBuffer(doc);
    expect(buffer).toBeDefined();
    expect(buffer.length).toBeGreaterThan(0);
  });
  
  // Test document generation - Arabic depot de plainte
  it('should generate an Arabic depot de plainte document', async () => {
    // Get the report with additional data needed for document generation
    const reportData = {
      ...testReport,
      id: reportId,
      insurance_type_name: 'Vol',
      insurance_type_name_ar: 'سرقة',
      location_name: '1380 DRAA ERRICH',
      building_number: 'BAT 03',
      sector_number: 'SECTEUR 02'
    };
    
    const doc = await generateDepotPlainte(reportData);
    expect(doc).toBeDefined();
    
    // Test that document can be packed to buffer
    const buffer = await Packer.toBuffer(doc);
    expect(buffer).toBeDefined();
    expect(buffer.length).toBeGreaterThan(0);
  });
});
