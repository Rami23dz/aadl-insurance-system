import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { I18nProvider } from '@/app/i18n';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </I18nProvider>
  );
}
