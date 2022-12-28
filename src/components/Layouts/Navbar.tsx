import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="content px-8 py-2">
            <nav className="flex items-center justify-between">
                <h2 className="text-blue-600 font-bold text-2xl ">
                    <NavLink to="/">
                        <div>OExhanger</div>
                    </NavLink >
                </h2>
                <div className="auth flex items-center">
                    <button className="bg-transparent text-gray-800  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700">
                        <NavLink to="/login">
                            Login
                        </NavLink >
                    </button>
                    <button className="bg-blue-600 text-gray-100  py-2 px-3 rounded  hover:bg-blue-800 hover:text-gray-100">
                        <NavLink to="/sign-up">
                            Sign up
                        </NavLink >
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;