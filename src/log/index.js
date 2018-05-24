#!/usr/bin/env node

import {setClient, displayError, getPackageJson} from '../helpers';
import {query, mutation} from './graphql';
import si from 'systeminformation';
import path from 'path';

const client = setClient();
const packageJsonPath = path.join(process.cwd(), 'package.json');
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
        getInfos().then(data => {
            const {os, shell, versions, time} = data;
            client
                .mutate({
                    mutation,
                    variables: {
                        packageId,
                        version,
                        target,
                        os,
                        shell,
                        versions,
                        time
                    }
                })
                .catch(displayError);
        })
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
