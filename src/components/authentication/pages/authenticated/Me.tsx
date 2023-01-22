import Layout from '../../../Layouts/Layout'
import Loader from '../../../Layouts/Loader';
import useMe from '../../../../hooks/useMe';

const Me = () => {
    const { data, loading } = useMe();

    if (loading) {
        return (
            <Layout>
                <div className="p-16">
                    <div className="p-8 bg-white shadow mt-24">
                        <Loader loading={loading} />
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-16">
                <div className="p-8 bg-white shadow mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-1">
                        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                            <div>
                                <p className="font-bold text-gray-700 text-xl">22</p>
                                <p className="text-gray-400">Joined Communities</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">10</p>
                                <p className="text-gray-400">Moderated communities</p>
                            </div>
                            <div>
                                <p className="font-bold text-gray-700 text-xl">89</p>
                                <p className="text-gray-400">Posts</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <h1 className="text-4xl font-medium text-gray-700">{data.me.name}</h1>

                        <p className="mt-8 text-gray-500">{data.me.email}</p>
                        <p className="mt-2 text-gray-500">User since: {new Date(data.me.created_at).toDateString()}</p>
                    </div>
                </div>
            </div>
        </Layout>

    )
}

export default Me