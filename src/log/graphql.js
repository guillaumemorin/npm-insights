import gql from 'graphql-tag';

const logMutation = gql`
  mutation createLog(
    $packageId: ID!
    $name: String
    $version: String
    $targetName: String
    $targetVersion: String
    $os: Json
    $versions: Json
    $time: Json
  ) {
    createLog(
      packageId: $packageId
      name: $name
      version: $version
      targetName: $targetName
      targetVersion: $targetVersion
      os: $os
      versions: $versions
      time: $time
    ) {
      id
    }
  }
`;

const packageQuery = gql`
  query Package($name: String!) {
    Package(name: $name) {
      id
    }
  }
`;

const packageMutation = gql`
  mutation createPackage($name: String!) {
    createPackage(name: $name) {
      id
      name
    }
  }
`;

export { logMutation, packageMutation, packageQuery };
