import gql from 'graphql-tag';

const query = gql`
    query Package($name: String!) {
        Package(name: $name) {
            id
        }
    }
`;

const mutation = gql`
    mutation createLog(
        $packageId: ID!
        $version: String
        $target: String
        $os: Json
        $versions: Json
        $time: Json
    ) {
        createLog(
            packageId: $packageId
            version: $version
            target: $target
            os: $os
            versions: $versions
            time: $time
        ) {
            id
        }
    }
`;

export {query, mutation};
