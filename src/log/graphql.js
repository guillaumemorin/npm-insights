import gql from 'graphql-tag';

const mutation = gql`
  mutation createLog(
    $name: String
    $version: String
    $targetName: String
    $targetVersion: String
    $os: Json
    $versions: Json
    $time: Json
  ) {
    createLog(
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

export { mutation };
