'use client';

import { useI18n } from '@/app/i18n';
import { useState } from 'react';
import { FaUpload, FaSave, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';

export default function NewReport() {
  const { t } = useI18n();
  
  // Form state
  const [formData, setFormData] = useState({
    reportNumber: '',
    location: '',
    building: '',
    sector: '',
    insuranceType: '',
    incidentDate: '',
    reportDate: '',
    managerName: '',
    descriptionFr: '',
    descriptionAr: '',
    file: null as File | null
  });
  
  const insuranceTypes = [
    { value: 'VOL', label: t('insuranceTypes.VOL') },
    { value: 'BRIS_MACHINE', label: t('insuranceTypes.BRIS_MACHINE') },
    { value: 'BRIS_GLASS', label: t('insuranceTypes.BRIS_GLASS') },
    { value: 'VANDALISM', label: t('insuranceTypes.VANDALISM') },
    { value: 'MULTIRISQUE', label: t('insuranceTypes.MULTIRISQUE') },
    { value: 'RC_DECINAL', label: t('insuranceTypes.RC_DECINAL') },
    { value: 'CAT_NAT', label: t('insuranceTypes.CAT_NAT') }
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form submission logic will be implemented in the backend
    console.log('Form submitted:', formData);
  };
  
  return (
    <div>
      <div className="flex items-center mb-6">
        <Link href="/reports" className="mr-4">
          <FaArrowLeft className="text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold">{t('reports.newReport')}</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reports.reportNumber')}
              </label>
              <input
                type="text"
                name="reportNumber"
                value={formData.reportNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reports.insuranceType')}
              </label>
              <select
                name="insuranceType"
                value={formData.insuranceType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">{t('common.select')}</option>
                {insuranceTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reports.location')}
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reports.building')}
              </label>
              <input
                type="text"
                name="building"
                value={formData.building}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reports.sector')}
              </label>
              <input
                type="text"
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reports.managerName')}
              </label>
              <input
                type="text"
                name="managerName"
                value={formData.managerName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reports.incidentDate')}
              </label>
              <input
                type="date"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('reports.reportDate')}
              </label>
              <input
                type="date"
                name="reportDate"
                value={formData.reportDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('reports.descriptionFr')}
            </label>
            <textarea
              name="descriptionFr"
              value={formData.descriptionFr}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('reports.descriptionAr')}
            </label>
            <textarea
              name="descriptionAr"
              value={formData.descriptionAr}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              dir="rtl"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('reports.uploadReport')}
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>{t('common.upload')}</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">{t('common.dragAndDrop')}</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, PDF up to 10MB
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Link 
              href="/reports" 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              {t('common.cancel')}
            </Link>
            <button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <FaSave className="mr-2" />
              {t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
