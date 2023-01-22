import { useQuery } from '@apollo/client';
import { ME } from '../graphql/authentication/queries';

const useMe = () => {
    const { data, loading } = useQuery(ME);
    return { data, loading };
};

export default useMe;