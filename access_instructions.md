# Insurance System Access Instructions

This document provides instructions for accessing and using the Insurance Form Processing System with Supabase integration.

## Accessing the System

The Insurance Form Processing System has been successfully configured with Supabase integration. To access the system, follow these steps:

1. Deploy the application using the instructions in the `deployment_guide.md` file
2. Access the application using the URL provided by your hosting platform
3. Log in with the default admin credentials:
   - Username: `admin`
   - Password: `admin123`

**Important:** Change the default admin password immediately after your first login for security purposes.

## System Features

The Insurance Form Processing System provides the following features:

### 1. User Management

- **Admin users** can create and manage user accounts
- **Regular users** can submit incident reports and generate documents

### 2. Incident Report Management

- Create new incident reports for various insurance types:
  - Theft (Vol)
  - Machine Breakage (Bris de Machine)
  - Glass Breakage (Bris de Glace)
  - Vandalism
  - Multi-risk
  - Decennial Civil Liability
  - Natural Disasters
- View and manage existing incident reports
- Search and filter reports by various criteria

### 3. Document Generation

- Generate official declaration documents in French
- Generate complaint documents (dépôt de plainte) in Arabic
- Download generated documents in DOCX format
- View document history for each incident report

## User Roles and Permissions

The system has two main user roles:

1. **Admin**
   - Full access to all system features
   - Can create and manage user accounts
   - Can view all incident reports
   - Can generate all types of documents

2. **User**
   - Can create and view their own incident reports
   - Can generate documents for their reports
   - Limited access to system settings

## Using the System

### Creating a New Incident Report

1. Log in to the system
2. Navigate to the "Reports" section
3. Click on "New Report"
4. Fill in the required information:
   - Report Number
   - Location
   - Building
   - Sector
   - Insurance Type
   - Incident Date
   - Report Date
   - Manager Name
   - Description (in French and Arabic)
5. Click "Save" to create the report

### Generating Documents

1. Navigate to the "Documents" section
2. Click on "Generate Document"
3. Select the incident report from the dropdown
4. Choose the document type:
   - Declaration (French)
   - Dépôt de Plainte (Arabic)
5. Select the language (if applicable)
6. Click "Generate Document"
7. Download the generated document

## Database Structure

The system uses Supabase as the database backend with the following tables:

- `users`: Stores user account information
- `insurance_types`: Contains different types of insurance
- `property_locations`: Stores property location information
- `buildings`: Contains building information linked to property locations
- `incident_reports`: Stores incident report details
- `generated_documents`: Tracks generated documents
- `system_logs`: Records system activities for auditing

## Customization

The system can be customized in several ways:

1. **Adding Insurance Types**
   - Add new insurance types directly in the Supabase database
   - Update the UI to display the new types

2. **Modifying Document Templates**
   - Edit the document templates in the `src/lib/document-generator.ts` file
   - Customize the layout, content, and formatting as needed

3. **Adding New Features**
   - The system is built with Next.js, making it easy to extend
   - Add new pages in the `src/app` directory
   - Create new API endpoints in the `src/app/api` directory

## Troubleshooting

If you encounter issues while using the system:

1. Check the browser console for any JavaScript errors
2. Verify that your Supabase connection is working correctly
3. Ensure that all required environment variables are set
4. Check the system logs for any error messages

## Support

For additional support or questions about using the system, please refer to the deployment guide or contact the development team.
