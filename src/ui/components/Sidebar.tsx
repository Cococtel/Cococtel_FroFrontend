import { Home, Scan, Users, User, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function BottomNav() {
  const [active, setActive] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: <Home className="text-[#f97316]" />, link: '#' },
    { name: 'Scan', icon: <Scan className="text-[#f97316]" />, link: '/scan' },
    { name: 'Community', icon: <Users className="text-[#f97316]" />, link: '#' },
    { name: 'Profile', icon: <User className="text-[#f97316]" />, link: '#' }
  ];

  return (
    <div className="z-50 max-w-lg rounded-3xl fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-lg px-2 py-5 flex justify-around items-center">
      {menuItems.map(({ name, icon, link }) => (
        <a 
          key={name} 
          href={link} 
          onClick={() => setActive(name)}
          className={`flex flex-col items-center text-gray-700 transition-all duration-200`}
        >
          {icon}
          {/* <span className="text-sm mt-1">{name}</span> */}
        </a>
      ))}
    </div>
  );
}
