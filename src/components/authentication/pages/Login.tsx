import Layout from '../../Layouts/Layout'
import LoginForm from '../forms/LoginForm'

const Login = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <div className="px-8 py-6 mt-4 text-left">
                    <div className="w-full bg-white rounded-lg shadow dark:border">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login