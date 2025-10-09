import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import bgImg from '../assets/images/background-image6.jpg';
import logo from '../assets/icons/logo.png';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/staff/home';

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await login(email, password);
            const userRole = response.userInfo.userRole;
            
            // Redirect based on role
            if (userRole === 'ADMIN') {
                navigate('/admin/home', { replace: true });
            } else {
                navigate('/staff/home', { replace: true });
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="relative flex items-center justify-center min-h-screen overflow-hidden"
        >
            {/* Company Logo - top right */}
            <img
                src={logo}
                alt="Company Logo"
                className="absolute top-4 right-6 w-24 h-auto z-20"
            />

            {/* Blurred Background */}
            <div
                className="absolute inset-0 bg-cover bg-no-repeat filter blur-xs scale-105"
                style={{ backgroundImage: `url(${bgImg})` }}
            ></div>
            {/* Optional dark overlay for better contrast */}
            <div className="absolute inset-0 bg-black/40"></div>
            <form
                onSubmit={handleSubmit}
                className="relative bg-soft/15 backdrop-blur-md p-8 rounded-3xl shadow-lg 
                w-140 h-85 border-2 border-accent/30 z-10 transition transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
                <h2 className="text-4xl font-bold mb-15 text-center">Login</h2>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <div className="mb-10 grid grid-cols-2 gap-2">
                    <label className="block mb-1 font-medium text-xl">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-black px-2 py-1 rounded 
                        focus:outline-none focus:border-accent focus:ring-0"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="mb-3 grid grid-cols-2 gap-2">
                    <label className="block mb-1 font-medium text-xl">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-black px-2 py-1 rounded 
                        focus:outline-none focus:border-accent focus:ring-0"
                        required
                        disabled={loading}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-35 bg-primary text-white py-2 rounded hover:bg-primary/80 transition mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
                
                {/* <div className="mt-4 text-center text-sm text-gray-600">
                    <p>Default credentials:</p>
                    <p>Admin: admin@epms.com / admin123</p>
                    <p>Staff: staff@epms.com / staff123</p>
                </div> */}
            </form>
        </div>
    );
}

export default Login;
