import Layout from '../Layouts/Layout'
import { NavLink } from 'react-router-dom';
const Home = () => {
    return (
        <Layout>
            <div className="text-center text-gray-800 py-20 px-6">
                <h1 className="text-4xl font-bold mt-0 mb-6">
                    OExhanger - an application that let's you communicate with others.
                </h1>
                <p className="text-3xl mb-8">
                    This app let you communicate with others about topics that you are interested in.
                    This would be similar to the way that Reddit works, which you might be familiar with.
                    From politics to hobbies, you can create multiple communities, join others and share your thoughts!
                </p>
                <button className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="light">
                    <NavLink to="/sign-up">
                        Get Started
                    </NavLink>
                </button>
            </div>
        </Layout>
    )
}

export default Home