#!/usr/bin/env node

import path from 'path';
import {query, mutation} from './graphql';
import {
    setClient,
    printMessage,
    getTrackingUri,
    getPackageJson,
    displayError
} from '../helpers';
import clc from 'cli-color';

const client = setClient();
const packageJsonPath = path.join(
    path.dirname(__dirname),
    '..',
    'package.json'
);
const targetPackageJsonPath = path.join(
    path.dirname(process.argv[1]),
    '..',
    '..',
    'package.json'
);

const checkPackage = name =>
    new Promise((resolve, reject) => {
        client
            .query({
                query,
                variables: {name}
            })
            .then(result => {
                const {count} = result.data._allPackagesMeta;
                return resolve(count);
            })
            .catch(error => reject(error));
    });

const createPackage = name => {
    client
        .mutate({
            mutation,
            variables: {name}
        })
        .then(() => displayMessage(name))
        .catch(displayError);
};

const displayMessage = targetPackageName =>
    getPackageJson(packageJsonPath)
        .then(json => {
            const {name, version} = json;
            printMessage([
                '✌️ ✌️ ✌️',
                '',
                `📦 ${clc.bold.red(`${name}@${version}`)}`,
                '',
                `👉 Here is the link to track real-time ${clc.bold(
                    targetPackageName
                )} installs`,
                '',
                `🔗 ${clc.underline.green(getTrackingUri(targetPackageName))}`
            ]);
        })
        .catch(displayError);

getPackageJson(targetPackageJsonPath)
    .then(json => {
        const {name} = json;
        checkPackage(name)
            .then(count => (count ? displayMessage(name) : createPackage(name)))
            .catch(displayError);
    })
    .catch(displayError);
