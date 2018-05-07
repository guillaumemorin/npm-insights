import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import fetch from 'node-fetch';
import {GRAPHCOOL, WEBAPP} from './config';
import print from 'print-message';

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
    const {SCHEME, URI, PORT} = WEBAPP;
    return `${SCHEME}://${URI}:${PORT}/${targetPackageName}`;
};
