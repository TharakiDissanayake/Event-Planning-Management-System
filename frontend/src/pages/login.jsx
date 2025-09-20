import bgImg from '../assets/images/background-image6.jpg';
import logo from '../assets/icons/logo.png';

function Login() {
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
                // className="relative bg-soft p-8 rounded-3xl shadow-md w-140 h-85 border-6 border-accent z-10"
                className="relative bg-soft/15 backdrop-blur-md p-8 rounded-3xl shadow-lg 
                w-140 h-85 border-2 border-accent/30 z-10 transition transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
                <h2 className="text-4xl font-bold mb-15 text-center">Login</h2>
                <div className="mb-10 grid grid-cols-2 gap-2">
                    <label className="block mb-1 font-medium text-xl">Email:</label>
                    <input
                        type="email"
                        className="w-full border border-black px-2 py-1 rounded 
                        focus:outline-none focus:border-accent focus:ring-0"
                        required
                    />
                </div>
                <div className="mb-3 grid grid-cols-2 gap-2">
                    <label className="block mb-1 font-medium text-xl">Password:</label>
                    <input
                        type="password"
                        className="w-full border border-black px-2 py-1 rounded 
                        focus:outline-none focus:border-accent focus:ring-0"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="w-35 bg-primary text-white py-2 rounded hover:bg-primary/80 transition mt-6"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
