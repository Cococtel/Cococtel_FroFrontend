import React, { useState } from 'react';
import type { UserLogin } from '../../../features/auth/dtos/loginDto';
import { loginUser } from '../../../features/auth/services/authService';
import { toast } from "sonner";

export default function LoginForm( { redirectTo }: {redirectTo: string} ) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const login: UserLogin = {
      username,
      password,
      type: 'normal',
    };

    const response = await loginUser(login);
    
    if (response.data && response.data.login && response.data.login.data && response.data.login.data.token) {
        const tokenData = JSON.parse(atob(response.data.login.data.token.split('.')[1]));
        
        document.cookie = `auth-token=${response.data.login.data.token}; path=/; max-age=86400; samesite=strict;`;
        document.cookie = `user-id=${tokenData.user}; path=/; max-age=86400; samesite=strict;`;
        
        toast.success('Usuario autenticado correctamente');
        
        setTimeout(() => {
            window.location.href = redirectTo;
        }, 1000);
        
        return;
    } 
    
    toast.error('Usuario o contraseña incorrectos');
  };

  return (
    <div className="container mx-auto p-4 h-screen flex justify-center items-center">
      <div className="max-w-lg w-full mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#eb6b50]">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#eb6b50]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#eb6b50]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#eb6b50] text-white py-2 rounded-md hover:bg-[#d85e3f] transition duration-300"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="text-center mt-4">
          ¿No tienes una cuenta?
          <a href="/register" className="text-[#eb6b50] font-semibold hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
