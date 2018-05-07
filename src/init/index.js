#!/usr/bin/env node
/* eslint-disable no-console */

import readJson from 'read-package-json';
import path from 'path';
import {query, mutation} from './graphql';
import {setClient, printMessage, getTrackingUri} from '../helpers';
import clc from 'cli-color';

const client = setClient();

const targetPackageJsonPath = path.join(
    path.dirname(process.argv[1]),
    '..',
    '..',
    'package.json'
);

const displayMessage = targetPackageName =>
    readJson(
        path.join(path.dirname(__dirname), '..', 'package.json'),
        console.error,
        false,
        (err, data) => {
            const {name, version} = data;
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
        }
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
        .catch(error => console.error(error));
};

readJson(
    targetPackageJsonPath,
    console.error,
    false,
    (err, targetPackageJson) => {
        if (err) {
            console.error('There was an error reading package.json');
            return;
        }
        const {name} = targetPackageJson;
        checkPackage(name)
            .then(count => (count ? displayMessage(name) : createPackage(name)))
            .catch(error => console.error(error));
    }
);
