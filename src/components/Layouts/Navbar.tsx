import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';

const Navbar = () => {
    let navigate = useNavigate();
    const { token, logout } = useContext(AuthContext);

    const onLogout = () => {
        logout();
        navigate('/');
    }
    // console.log(user);
    return (
        <div className="content px-8 py-2">
            <nav className="flex items-center justify-between">
                <h2 className="text-blue-600 font-bold text-2xl ">
                    <NavLink to="/">
                        <div>OExhanger</div>
                    </NavLink >
                </h2>
                {token ?
                    <>
                        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <button className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                        <NavLink to="/dashboard">
                                            Dashboard
                                        </NavLink >
                                    </button>
                                </li>
                                <li>
                                    <button className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                        <NavLink to="/me">
                                            Account
                                        </NavLink >
                                    </button>
                                </li>
                                <li>
                                    <button className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        onClick={onLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>

                    </>
                    :
                    <>
                        <div className="auth flex items-center">
                            <button className="bg-transparent text-gray-800  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700">
                                <NavLink to="/login">
                                    Login
                                </NavLink >
                            </button>
                            <button className="bg-blue-600 text-gray-100  py-2 px-3 rounded  hover:bg-blue-800 hover:text-gray-100">
                                <NavLink to="/register">
                                    Register
                                </NavLink >
                            </button>
                        </div>
                    </>
                }
            </nav >
        </div >
    );
};

export default Navbar;