import gql from 'graphql-tag';

const query = gql`
    query _allPackagesMeta($name: String!) {
        _allPackagesMeta(filter: {name: $name}) {
            count
        }
    }
`;

const mutation = gql`
    mutation createPackage($name: String!) {
        createPackage(name: $name) {
            id
            name
        }
    }
`;

// client.query({
//   query: gql`
//     query {
//         allUsers {
//             id
//           name
//       }
//   }
//   `,
// })

export {query, mutation};
