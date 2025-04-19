# Insurance Form Processing System Deployment Guide

This guide provides detailed instructions for deploying the Insurance Form Processing System with Supabase integration. The system allows property managers to submit incident reports (theft, vandalism, etc.) and generate official declarations and complaint documents.

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- A Supabase account (https://supabase.com)
- A hosting platform for Next.js applications (Vercel, Netlify, AWS, etc.)

## Step 1: Set Up Supabase Database

1. Create a new Supabase project from the Supabase dashboard
2. Navigate to the SQL Editor in your Supabase dashboard
3. Execute the following SQL script to create the necessary tables:

```sql
-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create insurance_types table
CREATE TABLE insurance_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create property_locations table
CREATE TABLE property_locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(255) NOT NULL,
  postal_code VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create buildings table
CREATE TABLE buildings (
  id SERIAL PRIMARY KEY,
  building_number VARCHAR(50) NOT NULL,
  sector_number VARCHAR(50),
  property_location_id INTEGER REFERENCES property_locations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create incident_reports table
CREATE TABLE incident_reports (
  id SERIAL PRIMARY KEY,
  report_number VARCHAR(50) NOT NULL UNIQUE,
  user_id INTEGER REFERENCES users(id),
  insurance_type_id INTEGER REFERENCES insurance_types(id),
  building_id INTEGER REFERENCES buildings(id),
  manager_name VARCHAR(255) NOT NULL,
  incident_date DATE NOT NULL,
  report_date DATE NOT NULL,
  description_fr TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create generated_documents table
CREATE TABLE generated_documents (
  id SERIAL PRIMARY KEY,
  incident_report_id INTEGER REFERENCES incident_reports(id),
  document_type VARCHAR(50) NOT NULL,
  file_path TEXT NOT NULL,
  language VARCHAR(10) NOT NULL DEFAULT 'fr',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create system_logs table
CREATE TABLE system_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  details TEXT,
  ip_address VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert default insurance types
INSERT INTO insurance_types (name, code, description) VALUES
('Vol', 'VOL', 'Assurance contre le vol'),
('Bris de Machine', 'BRIS_MACHINE', 'Assurance contre le bris de machine'),
('Bris de Glace', 'BRIS_GLASS', 'Assurance contre le bris de glace'),
('Vandalisme', 'VANDALISM', 'Assurance contre le vandalisme'),
('Multirisque', 'MULTIRISQUE', 'Assurance multirisque'),
('RC Décennale', 'RC_DECINAL', 'Responsabilité civile décennale'),
('Catastrophes Naturelles', 'CAT_NAT', 'Assurance contre les catastrophes naturelles');

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password, full_name, email, role) VALUES
('admin', '$2a$10$X7VYJfGMUGDCklDLGe5xLOzQV1j7S3gIjrW.yO3sJ4ym3ORoZQMNm', 'System Administrator', 'admin@example.com', 'admin');

-- Insert sample property location
INSERT INTO property_locations (name, address, city, postal_code) VALUES
('DRAA ERRICH', '1380 DRAA ERRICH', 'Annaba', '23000');

-- Insert sample building
INSERT INTO buildings (building_number, sector_number, property_location_id) VALUES
('BAT 03', 'SECTEUR 02', 1);
```

4. After executing the SQL script, verify that all tables have been created correctly

## Step 2: Configure Environment Variables

Create a `.env` file in the root directory of the project with the following variables:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# NextAuth Configuration
NEXTAUTH_URL=your_application_url
NEXTAUTH_SECRET=your_nextauth_secret_key
```

Replace the placeholder values with your actual Supabase project URL and API key, which can be found in your Supabase project settings.

## Step 3: Build the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the application:
   ```bash
   npm run build
   ```

## Step 4: Deploy to Hosting Platform

### Option 1: Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Follow the prompts to complete the deployment

### Option 2: Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy to Netlify:
   ```bash
   netlify deploy
   ```

3. Follow the prompts to complete the deployment

### Option 3: Deploy to AWS Amplify

1. Install AWS Amplify CLI:
   ```bash
   npm install -g @aws-amplify/cli
   ```

2. Configure Amplify:
   ```bash
   amplify configure
   ```

3. Initialize Amplify in your project:
   ```bash
   amplify init
   ```

4. Add hosting:
   ```bash
   amplify add hosting
   ```

5. Deploy:
   ```bash
   amplify publish
   ```

## Step 5: Verify Deployment

1. Access your deployed application using the URL provided by your hosting platform
2. Log in with the default admin credentials:
   - Username: admin
   - Password: admin123
3. Test the following functionality:
   - Creating a new incident report
   - Generating declaration and complaint documents
   - Viewing existing reports

## Security Considerations

1. Change the default admin password immediately after deployment
2. Set up proper authentication and authorization rules in Supabase
3. Configure Row Level Security (RLS) policies in Supabase for data protection
4. Use environment variables for all sensitive information
5. Implement regular backups of your database

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Verify that your Supabase URL and API key are correct
2. Check that your Supabase project is active
3. Ensure that the database tables have been created correctly
4. Check for any network restrictions that might prevent connections to Supabase

### Authentication Issues

If users cannot log in:

1. Verify that the NEXTAUTH_URL and NEXTAUTH_SECRET environment variables are set correctly
2. Check that the users table in Supabase contains the correct user information
3. Ensure that the password hashing is working correctly

### Document Generation Issues

If document generation fails:

1. Check that the docx library is installed correctly
2. Verify that the incident report data is complete and correctly formatted
3. Ensure that the generated_documents table in Supabase is accessible

## Maintenance and Updates

1. Regularly update dependencies to ensure security and performance
2. Monitor Supabase usage and upgrade your plan if necessary
3. Implement a CI/CD pipeline for automated testing and deployment
4. Keep backups of your database and application code

## Support

For additional support or questions, please contact the development team.
