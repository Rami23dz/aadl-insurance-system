import Link from 'next/link';
import { useI18n } from '@/app/i18n';
import { FaUser, FaSignOutAlt, FaGlobe } from 'react-icons/fa';

export default function Header() {
  const { t, locale, changeLocale } = useI18n();

  const toggleLocale = () => {
    changeLocale(locale === 'fr' ? 'ar' : 'fr');
  };

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            {t('common.appName')}
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleLocale}
            className="flex items-center px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            <FaGlobe className="mr-1" />
            <span>{locale === 'fr' ? 'العربية' : 'Français'}</span>
          </button>
          
          <div className="relative group">
            <button className="flex items-center px-3 py-1 rounded hover:bg-blue-700 transition">
              <FaUser className="mr-1" />
              <span>Admin</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
              <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                {t('auth.profile')}
              </Link>
              <Link href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                <div className="flex items-center">
                  <FaSignOutAlt className="mr-2" />
                  {t('auth.logout')}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
