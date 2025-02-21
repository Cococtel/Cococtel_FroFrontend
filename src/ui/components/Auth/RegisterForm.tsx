import { useState } from 'react';
import { registerUser } from '../../../features/auth/services/authService';
import type { UserRegistration } from '../../../features/auth/dtos/registerDto';
import { toast } from "sonner";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();
  
    const user: UserRegistration = {
      name,       
      lastname,
      phone,
      email,
      username,
      image: '',
      password,
      type: 'normal',
    };
  
    const response = await registerUser(user);
    
    if (response.data && response.data.register && response.data.register.data) {
        toast.success('Usuario creado correctamente');
        return;
    } 
            
    toast.error('No se pudo autenticar el usuario');
  };

  return (
    <div className="container mx-auto p-4 h-screen flex justify-center items-center">
      <div className="max-w-lg w-full mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#eb6b50]">Registro</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#eb6b50]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastname" className="block text-gray-700 font-semibold mb-2">
              Apellido
            </label>
            <input
              type="text"
              id="lastname"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#eb6b50]"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#eb6b50]"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#eb6b50]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
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
            Registrarse
          </button>
        </form>
        <p className="text-center mt-4">
          ¿Ya tienes una cuenta?
          <a href="/" className="text-[#eb6b50] font-semibold hover:underline">
            Iniciar Sesión
          </a>
        </p>
      </div>
    </div>
  );
}
