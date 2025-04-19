import Link from 'next/link';
import { useI18n } from '@/app/i18n';
import { 
  FaHome, 
  FaFileAlt, 
  FaFileSignature, 
  FaCogs, 
  FaUsers, 
  FaDatabase 
} from 'react-icons/fa';

export default function Sidebar() {
  const { t } = useI18n();

  const menuItems = [
    { 
      icon: <FaHome className="mr-3" />, 
      label: t('dashboard.title'), 
      href: '/dashboard' 
    },
    { 
      icon: <FaFileAlt className="mr-3" />, 
      label: t('reports.title'), 
      href: '/reports' 
    },
    { 
      icon: <FaFileSignature className="mr-3" />, 
      label: t('documents.title'), 
      href: '/documents' 
    },
    { 
      icon: <FaUsers className="mr-3" />, 
      label: t('admin.users'), 
      href: '/admin/users' 
    },
    { 
      icon: <FaDatabase className="mr-3" />, 
      label: t('admin.templates'), 
      href: '/admin/templates' 
    },
    { 
      icon: <FaCogs className="mr-3" />, 
      label: t('admin.settings'), 
      href: '/admin/settings' 
    },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-4">
          AADL GEST.IMMO
        </h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href}
                  className="flex items-center px-4 py-3 rounded hover:bg-gray-700 transition"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
