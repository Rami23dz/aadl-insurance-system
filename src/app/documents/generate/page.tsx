'use client';

import { useI18n } from '@/app/i18n';
import { useState } from 'react';
import { FaFileAlt, FaSave, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';

export default function GenerateDocument() {
  const { t } = useI18n();
  
  // Form state
  const [formData, setFormData] = useState({
    incidentReportId: '',
    documentType: '',
    language: 'fr',
  });
  
  const documentTypes = [
    { value: 'declaration', label: t('documents.declaration') },
    { value: 'depot_plainte', label: t('documents.depotPlainte') },
  ];
  
  const languages = [
    { value: 'fr', label: t('documents.french') },
    { value: 'ar', label: t('documents.arabic') },
  ];
  
  // Mock data for demonstration
  const reports = [
    { id: '1', reportNumber: 'REP-2025-001', location: '1380 DRAA ERRICH', building: 'BAT 03 SECTEUR 02' },
    { id: '2', reportNumber: 'REP-2025-002', location: '900 KALITOSA', building: 'BAT 15 NUM 19' },
    { id: '3', reportNumber: 'REP-2025-003', location: '1200 ANNABA', building: 'BAT 07 SECTEUR 01' },
    { id: '4', reportNumber: 'REP-2025-004', location: '1500 CONSTANTINE', building: 'BAT 22 SECTEUR 05' },
    { id: '5', reportNumber: 'REP-2025-005', location: '2000 ORAN', building: 'BAT 11 SECTEUR 03' },
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form submission logic will be implemented in the backend
    console.log('Form submitted:', formData);
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Link href="/documents" className="mr-4">
          <FaArrowLeft className="text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold">{t('documents.generateDocument')}</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reports.title')}
              </label>
              <select
                name="incidentReportId"
                value={formData.incidentReportId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">{t('common.select')}</option>
                {reports.map(report => (
                  <option key={report.id} value={report.id}>
                    {report.reportNumber} - {report.location} {report.building}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('documents.documentType')}
              </label>
              <select
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">{t('common.select')}</option>
                {documentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('documents.language')}
              </label>
              <div className="mt-2 space-x-4">
                {languages.map(lang => (
                  <label key={lang.value} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="language"
                      value={lang.value}
                      checked={formData.language === lang.value}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">{lang.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <div className="flex items-center text-sm text-gray-600">
              <FaFileAlt className="mr-2 text-blue-500" />
              <p>
                {t('documents.generationInfo')}
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Link 
              href="/documents" 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              {t('common.cancel')}
            </Link>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <FaSave className="mr-2" />
              {t('documents.generateDocument')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
