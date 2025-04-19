'use client';

import { useI18n } from '@/app/i18n';
import { useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

interface DashboardCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  bgColor: string;
}

const DashboardCard = ({ title, count, icon, bgColor }: DashboardCardProps) => (
  <div className={`${bgColor} rounded-lg shadow-md p-6 flex items-center`}>
    <div className="rounded-full bg-white bg-opacity-30 p-3 mr-4">
      {icon}
    </div>
    <div>
      <h3 className="text-white text-lg font-semibold">{title}</h3>
      <p className="text-white text-2xl font-bold">{count}</p>
    </div>
  </div>
);

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
      </td>
    </tr>
  );
};

export default function Dashboard() {
  const { t } = useI18n();
  
  // Mock data for demonstration
  const recentReports = [
    { id: '1', reportNumber: 'REP-2025-001', location: '1380 DRAA ERRICH', building: 'BAT 03 SECTEUR 02', date: '15/04/2025', status: 'pending', type: 'VOL' },
    { id: '2', reportNumber: 'REP-2025-002', location: '900 KALITOSA', building: 'BAT 15 NUM 19', date: '12/04/2025', status: 'processing', type: 'BRIS_GLASS' },
    { id: '3', reportNumber: 'REP-2025-003', location: '1200 ANNABA', building: 'BAT 07 SECTEUR 01', date: '10/04/2025', status: 'completed', type: 'VANDALISM' },
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>
        <Link 
          href="/reports/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition"
        >
          <FaPlus className="mr-2" />
          {t('reports.newReport')}
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard 
          title={t('dashboard.pendingReports')} 
          count={5} 
          icon={<FaSearch className="text-white" />} 
          bgColor="bg-blue-600" 
        />
        <DashboardCard 
          title={t('dashboard.completedReports')} 
          count={12} 
          icon={<FaSearch className="text-white" />} 
          bgColor="bg-green-600" 
        />
        <DashboardCard 
          title={t('documents.title')} 
          count={24} 
          icon={<FaSearch className="text-white" />} 
          bgColor="bg-purple-600" 
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{t('dashboard.recentReports')}</h2>
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
              {recentReports.map((report) => (
                <ReportItem key={report.id} {...report} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">{t('dashboard.quickActions')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/reports/new" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg flex items-center transition">
            <FaPlus className="mr-3 text-blue-600" />
            <span>{t('reports.newReport')}</span>
          </Link>
          <Link href="/documents/generate" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg flex items-center transition">
            <FaPlus className="mr-3 text-green-600" />
            <span>{t('documents.generateDocument')}</span>
          </Link>
          <Link href="/admin/users" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg flex items-center transition">
            <FaPlus className="mr-3 text-purple-600" />
            <span>{t('admin.addUser')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
