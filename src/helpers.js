/* eslint-disable no-console */

import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import fetch from 'node-fetch';
import {GRAPHCOOL, WEBAPP} from './config';
import readJson from 'read-package-json';
import print from 'print-message';
import clc from 'cli-color';

const {SCHEME, URI, TYPE, VERSION, KEY} = GRAPHCOOL;

export const setClient = () =>
    new ApolloClient({
        link: new HttpLink({
            uri: `${SCHEME}://${URI}/${TYPE}/${VERSION}/${KEY}`,
            fetch
        }),
        cache: new InMemoryCache()
    });

export const printMessage = message =>
    print(message, {
        marginTop: 1,
        marginBottom: 1,
        paddingTop: 1,
        paddingBottom: 1,
        sideSymbol: ''
    });

export const getTrackingUri = targetPackageName => {
    const {SCHEME, URI} = WEBAPP;
    return `${SCHEME}://${URI}/${targetPackageName}`;
};

export const displayError = error =>
    printMessage(['🤔 🤔 🤔', '', `👉 ${clc.bold.red(`${error}`)}`, '']);

export const getPackageJson = path =>
    new Promise((resolve, reject) =>
        readJson(
            path,
            null,
            false,
            (err, json) =>
                err
                    ? reject(
                          `There was an error reading the file with path:${path}`
                      )
                    : resolve(json)
        )
    );
