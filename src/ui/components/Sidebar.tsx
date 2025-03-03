import { Home, Scan, Users, User, Martini } from 'lucide-react';
import { useEffect, useState } from 'react';
import { verifyUserLoginStatus } from '../../features/auth/services/authService';

export default function BottomNav( { token, user } : { token: string, user: string } ) {

  const menuItems = [
    { name: 'Dashboard', icon: <Home className="text-[#f97316]" />, link: '/home' },
    { name: 'Cocktails', icon: <Martini className="text-[#f97316]" />, link: '/cocktails' },
    { name: 'Scan', icon: <Scan className="text-[#f97316]" />, link: '/scan' },
    { name: 'Community', icon: <Users className="text-[#f97316]" />, link: '/community' },
    { name: 'Profile', icon: <User className="text-[#f97316]" />, link: '/profile' }
  ];

  return (
    <div className="z-50 max-w-lg rounded-3xl fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-white shadow-lg px-2 py-5 flex justify-around items-center">
      {menuItems.map(({ name, icon, link }) => (
        <a 
          key={name} 
          href={link} 
          className={`flex flex-col items-center text-gray-700 transition-all duration-200`}
        >
          {icon}
        </a>
      ))}
    </div>
  );
}
