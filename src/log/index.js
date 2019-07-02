#!/usr/bin/env node

import { setClient, displayError, getPackageJson } from '../helpers';
import { logMutation, packageMutation, packageQuery } from './graphql';
import si from 'systeminformation';
import path from 'path';

const client = setClient();
const trackedPackageJsonPath = path.join(process.cwd(), 'package.json');
const [targetPath] = path.dirname(process.argv[1]).split('node_modules');
const targetPackageJsonPath = path.join(targetPath, 'package.json');

const getInfos = () =>
  new Promise(resolve => {
    const data = {};
    return si
      .osInfo()
      .then(os => {
        data.os = os;
        return si.versions();
      })
      .then(versions => {
        data.versions = versions;
        return si.time();
      })
      .then(time => {
        data.time = time;
        return si.shell();
      })
      .then(() => resolve(data))
      .catch(displayError);
  });

const getPackage = name =>
  new Promise((resolve, reject) => {
    client
      .query({
        query: packageQuery,
        variables: { name }
      })
      .then(result => resolve(result.data.Package))
      .catch(error => reject(error));
  });

const createPackage = name =>
  new Promise((resolve, reject) => {
    client
      .mutate({
        mutation: packageMutation,
        variables: { name }
      })
      .then(result => resolve(result.data.createPackage))
      .catch(error => reject(error));
  });

const log = async (trackedPackageJson, targetPackageJson) => {
  const { os, shell, versions, time } = await getInfos();
  const { name, version } = trackedPackageJson;
  const { name: targetName, version: targetVersion } = targetPackageJson;
  if (!name || name === targetName) return;
  const { id: packageId } =
    (await getPackage(name)) || (await createPackage(name));
  client.mutate({
    mutation: logMutation,
    variables: {
      packageId,
      name,
      version,
      targetName,
      targetVersion,
      os,
      shell,
      versions,
      time
    }
  });
};

(async () => {
  try {
    const trackedPackageJson = await getPackageJson(trackedPackageJsonPath);
    const targetPackageJson = await getPackageJson(targetPackageJsonPath);
    log(trackedPackageJson, targetPackageJson);
  } catch (error) {
    displayError();
  }
})();
