#!/usr/bin/env node

import {setClient, displayError, getPackageJson} from '../helpers';
import {query, mutation} from './graphql';
import path from 'path';

const client = setClient();
const packageJsonPath = path.join(process.cwd(), 'package.json');
const [targetPath] = path.dirname(process.argv[1]).split('node_modules');
const targetPackageJsonPath = path.join(targetPath, 'package.json');

const getPackageId = name =>
    new Promise((resolve, reject) =>
        client
            .query({
                query,
                variables: {name}
            })
            .then(
                result =>
                    result.data.Package.id
                        ? resolve(result.data.Package.id)
                        : reject("Can't log. Package missing")
            )
            .catch(displayError)
    );

const createLog = (packageId, packageJson) => {
    const {version} = packageJson;
    getPackageJson(targetPackageJsonPath).then(({name: target}) =>
        client
            .mutate({
                mutation,
                variables: {packageId, version, target}
            })
            .catch(displayError)
    );
};

getPackageJson(packageJsonPath)
    .then(json => {
        const {name} = json;
        getPackageId(name)
            .then(id => createLog(id, json))
            .catch(displayError);
    })
    .catch(displayError);
