import Layout from '../../../Layouts/Layout'
import ResetPasswordForm from '../../forms/auth/ResetPasswordForm'

const ResetPassword = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <ResetPasswordForm />
            </div>
        </Layout>
    )
}

export default ResetPassword