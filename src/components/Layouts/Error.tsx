import { GraphQLError } from "graphql"

const Error = (props: any) => {
    return (
        <div className="bg-red-100 border mt-2 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Something went wrong!</strong> <br />
            {props.errors.map(function (error: GraphQLError) {
                return (
                    <span className="block sm:inline" key="{error}">{error.message}</span>
                );
            })}

        </div>
    )
}

export default Error