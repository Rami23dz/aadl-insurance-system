import { supabase } from './config';

// Database queries for Supabase
export const queries = {
  // User queries
  users: {
    getByUsername: async (username: string) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .single();
      
      if (error) throw error;
      return data;
    },
    create: async (userData: any) => {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select();
      
      if (error) throw error;
      return data[0];
    },
  },
  
  // Insurance types queries
  insuranceTypes: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('insurance_types')
        .select('*');
      
      if (error) throw error;
      return data;
    },
    getById: async (id: number) => {
      const { data, error } = await supabase
        .from('insurance_types')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
  },
  
  // Incident reports queries
  reports: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('incident_reports')
        .select(`
          *,
          buildings(*),
          insurance_types(*),
          users(*)
        `);
      
      if (error) throw error;
      return data;
    },
    getById: async (id: number) => {
      const { data, error } = await supabase
        .from('incident_reports')
        .select(`
          *,
          buildings(*),
          insurance_types(*),
          users(*)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    create: async (reportData: any) => {
      const { data, error } = await supabase
        .from('incident_reports')
        .insert([reportData])
        .select();
      
      if (error) throw error;
      return data[0];
    },
    update: async (id: number, reportData: any) => {
      const { data, error } = await supabase
        .from('incident_reports')
        .update(reportData)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      return data[0];
    },
  },
  
  // Buildings queries
  buildings: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('buildings')
        .select(`
          *,
          property_locations(*)
        `);
      
      if (error) throw error;
      return data;
    },
  },
  
  // Generated documents queries
  documents: {
    create: async (documentData: any) => {
      const { data, error } = await supabase
        .from('generated_documents')
        .insert([documentData])
        .select();
      
      if (error) throw error;
      return data[0];
    },
    getByReportId: async (reportId: number) => {
      const { data, error } = await supabase
        .from('generated_documents')
        .select('*')
        .eq('incident_report_id', reportId);
      
      if (error) throw error;
      return data;
    },
  },
  
  // System logs queries
  logs: {
    create: async (logData: any) => {
      const { data, error } = await supabase
        .from('system_logs')
        .insert([logData]);
      
      if (error) throw error;
      return data;
    },
    getAll: async () => {
      const { data, error } = await supabase
        .from('system_logs')
        .select(`
          *,
          users(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  },
};

// Export individual functions to match the original API
export const getUserByUsername = queries.users.getByUsername;
export const getAllInsuranceTypes = queries.insuranceTypes.getAll;
export const getIncidentReports = queries.reports.getAll;
export const getIncidentReportById = queries.reports.getById;
export const createIncidentReport = queries.reports.create;
export const updateIncidentReport = queries.reports.update;
export const getDocumentsByIncidentId = queries.documents.getByReportId;
export const createGeneratedDocument = queries.documents.create;
export const createSystemLog = queries.logs.create;
export const getAllSystemLogs = queries.logs.getAll;

export default queries;
