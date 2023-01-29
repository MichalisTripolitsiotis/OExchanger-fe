import Layout from '../../../Layouts/Layout'
import EmailVerificationForm from '../../forms/auth/EmailVerificationForm'

const EmailVerification = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <EmailVerificationForm />
            </div>
        </Layout>
    )
}

export default EmailVerification