-- Insurance Form Processing System Database Schema for Supabase (PostgreSQL)

-- Users table for authentication and authorization
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insurance types table
CREATE TABLE insurance_types (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL UNIQUE,
    name_fr VARCHAR(100) NOT NULL,
    name_ar VARCHAR(100) NOT NULL,
    description_fr TEXT,
    description_ar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Document templates table
CREATE TABLE document_templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('declaration', 'depot_plainte')),
    insurance_type_id INTEGER NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    language VARCHAR(2) NOT NULL CHECK (language IN ('fr', 'ar')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (insurance_type_id) REFERENCES insurance_types(id)
);

-- Property locations table
CREATE TABLE property_locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Buildings table
CREATE TABLE buildings (
    id SERIAL PRIMARY KEY,
    location_id INTEGER NOT NULL,
    building_number VARCHAR(20) NOT NULL,
    sector_number VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES property_locations(id)
);

-- Incident reports table
CREATE TABLE incident_reports (
    id SERIAL PRIMARY KEY,
    report_number VARCHAR(50) NOT NULL UNIQUE,
    building_id INTEGER NOT NULL,
    insurance_type_id INTEGER NOT NULL,
    incident_date DATE NOT NULL,
    report_date DATE NOT NULL,
    description_fr TEXT NOT NULL,
    description_ar TEXT NOT NULL,
    manager_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'archived')),
    original_report_file VARCHAR(255) NOT NULL,
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (building_id) REFERENCES buildings(id),
    FOREIGN KEY (insurance_type_id) REFERENCES insurance_types(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Generated documents table
CREATE TABLE generated_documents (
    id SERIAL PRIMARY KEY,
    incident_report_id INTEGER NOT NULL,
    document_type VARCHAR(20) NOT NULL CHECK (document_type IN ('declaration', 'depot_plainte')),
    file_path VARCHAR(255) NOT NULL,
    language VARCHAR(2) NOT NULL CHECK (language IN ('fr', 'ar')),
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    generated_by INTEGER NOT NULL,
    FOREIGN KEY (incident_report_id) REFERENCES incident_reports(id),
    FOREIGN KEY (generated_by) REFERENCES users(id)
);

-- System logs table
CREATE TABLE system_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Initial data for insurance types
INSERT INTO insurance_types (code, name_fr, name_ar, description_fr, description_ar) VALUES
('VOL', 'Vol', 'سرقة', 'Assurance contre le vol', 'التأمين ضد السرقة'),
('BRIS_MACHINE', 'Bris de Machine', 'كسر الآلات', 'Assurance contre le bris de machine', 'التأمين ضد كسر الآلات'),
('BRIS_GLASS', 'Bris de Glass', 'كسر الزجاج', 'Assurance contre le bris de verre', 'التأمين ضد كسر الزجاج'),
('VANDALISM', 'Vandalisme', 'تخريب', 'Assurance contre le vandalisme', 'التأمين ضد التخريب'),
('MULTIRISQUE', 'Multirisque Immeuble', 'متعدد المخاطر للمباني', 'Assurance multirisque pour les immeubles', 'التأمين متعدد المخاطر للمباني'),
('RC_DECINAL', 'Responsabilité Civile Décennale', 'المسؤولية المدنية العشرية', 'Assurance responsabilité civile décennale', 'التأمين على المسؤولية المدنية العشرية'),
('CAT_NAT', 'Catastrophe Naturelle', 'كارثة طبيعية', 'Assurance contre les catastrophes naturelles', 'التأمين ضد الكوارث الطبيعية');

-- Create admin user (password: admin123)
INSERT INTO users (username, password, full_name, email, role) VALUES
('admin', '$2y$10$8KzO3LOgRmQQ7TXCOKwYo.9ckp5TeJwPL4ux9Qs.Uc9bNtXLIwXtK', 'System Administrator', 'admin@aadlgestimmo.com', 'admin');
