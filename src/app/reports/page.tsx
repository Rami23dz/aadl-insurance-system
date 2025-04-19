'use client';

import { useI18n } from '@/app/i18n';
import { FaPlus, FaFilter, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

interface ReportItemProps {
  id: string;
  reportNumber: string;
  location: string;
  building: string;
  date: string;
  status: string;
  type: string;
}

const ReportItem = ({ id, reportNumber, location, building, date, status, type }: ReportItemProps) => {
  const { t } = useI18n();
  
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">{reportNumber}</td>
      <td className="px-6 py-4 whitespace-nowrap">{location}</td>
      <td className="px-6 py-4 whitespace-nowrap">{building}</td>
      <td className="px-6 py-4 whitespace-nowrap">{date}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(status)}`}>
          {t(`reports.status.${status}`)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{t(`insuranceTypes.${type}`)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <Link href={`/reports/${id}`} className="text-blue-600 hover:text-blue-900 mr-3">
          {t('common.view')}
        </Link>
        <Link href={`/reports/${id}/edit`} className="text-green-600 hover:text-green-900 mr-3">
          {t('common.edit')}
        </Link>
        <Link href={`/documents/generate/${id}`} className="text-purple-600 hover:text-purple-900">
          {t('documents.generateDocument')}
        </Link>
      </td>
    </tr>
  );
};

export default function Reports() {
  const { t } = useI18n();
  
  // Mock data for demonstration
  const reports = [
    { id: '1', reportNumber: 'REP-2025-001', location: '1380 DRAA ERRICH', building: 'BAT 03 SECTEUR 02', date: '15/04/2025', status: 'pending', type: 'VOL' },
    { id: '2', reportNumber: 'REP-2025-002', location: '900 KALITOSA', building: 'BAT 15 NUM 19', date: '12/04/2025', status: 'processing', type: 'BRIS_GLASS' },
    { id: '3', reportNumber: 'REP-2025-003', location: '1200 ANNABA', building: 'BAT 07 SECTEUR 01', date: '10/04/2025', status: 'completed', type: 'VANDALISM' },
    { id: '4', reportNumber: 'REP-2025-004', location: '1500 CONSTANTINE', building: 'BAT 22 SECTEUR 05', date: '08/04/2025', status: 'archived', type: 'MULTIRISQUE' },
    { id: '5', reportNumber: 'REP-2025-005', location: '2000 ORAN', building: 'BAT 11 SECTEUR 03', date: '05/04/2025', status: 'completed', type: 'CAT_NAT' },
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('reports.title')}</h1>
        <Link 
          href="/reports/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" />
          {t('reports.newReport')}
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <div className="relative mb-4 md:mb-0 md:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={t('common.search')}
            />
          </div>
          
          <div className="flex space-x-2">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md flex items-center hover:bg-gray-200 transition">
              <FaFilter className="mr-2" />
              {t('common.filter')}
            </button>
            <select className="border border-gray-300 rounded-md px-4 py-2 bg-white">
              <option value="">{t('reports.status.pending')}</option>
              <option value="">{t('reports.status.processing')}</option>
              <option value="">{t('reports.status.completed')}</option>
              <option value="">{t('reports.status.archived')}</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('reports.reportNumber')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('reports.location')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('reports.building')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('reports.reportDate')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.status')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('reports.insuranceType')}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <ReportItem key={report.id} {...report} />
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-700">
            {t('common.showing')} 1-5 {t('common.of')} 5 {t('reports.title').toLowerCase()}
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
              {t('common.previous')}
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50">
              {t('common.next')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
