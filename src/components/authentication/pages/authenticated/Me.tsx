import Layout from '../../../Layouts/Layout'
import { ME } from '../../../../graphql/authentication/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import Loading from '../../../Layouts/Loader';

const Me = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { data } = useQuery(ME, {
        onCompleted: () => {
            setIsLoading(false)
        }
    });

    return (
        <Layout>
            {isLoading ? (
                <Loading loading={isLoading} />
            ) :
                (
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

                            <div className="mt-20 text-center">
                                <h1 className="text-4xl font-medium text-gray-700">{data.me.name}</h1>

                                <p className="mt-8 text-gray-500">{data.me.email}</p>
                                <p className="mt-2 text-gray-500">University of Computer Science</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </Layout>

    )
}

export default Me