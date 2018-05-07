import gql from 'graphql-tag';

const query = gql`
    query Package($name: String!) {
        Package(name: $name) {
            id
        }
    }
`;

const mutation = gql`
    mutation createLog($packageId: ID!) {
        createLog(packageId: $packageId) {
            id
        }
    }
`;

export {query, mutation};
