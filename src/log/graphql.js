import gql from 'graphql-tag';

const query = gql`
    query Package($name: String!) {
        Package(name: $name) {
            id
        }
    }
`;

const mutation = gql`
    mutation createLog($packageId: ID!, $version: String, $target: String) {
        createLog(packageId: $packageId, version: $version, target: $target) {
            id
        }
    }
`;

export {query, mutation};
