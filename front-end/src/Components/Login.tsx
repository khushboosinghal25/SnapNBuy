import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [Username, setUsername] = useState<string>('');
    const [Password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5190/api/auth/login', { Username, Password });
            const token: string = response.data.token;
            localStorage.setItem('token', token);

            const userData = {
                username: Username,
                name: Username.substring(0, 8),
                id: response.data.existingUser.id,
            };
            localStorage.setItem('userData', JSON.stringify(userData));
            navigate('/shop');
            console.log('Logged in successfully');
            
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Login</h2>
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Email:</label>
                        <input
                            type="email"
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Password:</label>
                        <input
                            type="password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <div className="text-center mt-4">
                    <p className="text-gray-700">Don't have an account?</p>
                    <button
                        onClick={handleRegisterRedirect}
                        className="mt-2 text-blue-600 font-medium hover:underline"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
