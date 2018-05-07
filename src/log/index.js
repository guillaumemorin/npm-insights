#!/usr/bin/env node
/* eslint-disable no-console */

import readJson from 'read-package-json';
import {setClient} from '../helpers';
import {query, mutation} from './graphql';
import path from 'path';

const client = setClient();
const targetPackageJsonPath = path.join(process.cwd(), 'package.json');

// readJson(
//     path.join(process.cwd(), '..', '..', 'package.json'),
//     console.error,
//     false,
//     (err, targetPackageJson) => {
//         if (err) {
//             console.error('There was an error reading the file');
//             return;
//         }
//         const {name} = targetPackageJson;
//         console.log('name>>>>>>>>>>>', name);
//         getPackageId(name)
//             .then(id => createLog(id))
//             .catch(error => console.error(error));
//     }
// );

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
            .catch(error => console.error(error))
    );

const createLog = packageId => {
    client
        .mutate({
            mutation,
            variables: {packageId}
        })
        .catch(error => console.error(error));
};

readJson(
    targetPackageJsonPath,
    console.error,
    false,
    (err, targetPackageJson) => {
        if (err) {
            console.error('There was an error reading the file');
            return;
        }
        const {name} = targetPackageJson;
        getPackageId(name)
            .then(id => createLog(id))
            .catch(error => console.error(error));
    }
);
