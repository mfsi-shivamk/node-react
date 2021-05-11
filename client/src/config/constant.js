/* eslint-disable no-undef */
export const constants = {
    gqlApi: {
        baseUrl: `${process.env.REACT_APP_NODE_SECURE}://${process.env.REACT_APP_NODE_URL}:${process.env.REACT_APP_NODE_PORT}/graphql`,
        baseWebSocketUrl: `${process.env.REACT_APP_NODE_SOCKET}://${process.env.REACT_APP_NODE_URL}:${process.env.REACT_APP_NODE_PORT}/subscriptions`,
        split: {
            kind: 'OperationDefinition',
            operation: 'subscription'
        }
    },
    api: {
        baseUrl: `${process.env.REACT_APP_NODE_SECURE}://${process.env.REACT_APP_NODE_URL}:${process.env.REACT_APP_NODE_PORT}/`,
        register: {
            method: 'post',
            url: '/api/v1/auth/register',
        },
        token: {
            url: '/api/v1/auth/token',
            method: 'get'
        },
        login: {
            method: 'post',
            url: '/api/v1/auth/login',
        },
        logout: {
            method: 'get',
            url: '/api/v1/auth/logout',
        }
    },
    pages: {
        header: [
            { text: 'Home', link: '' }, 
            { text: 'movie', link: 'movie' },
            { text: 'setting', link: 'setting' },
            { text: 'logout', link: 'logout' }
        ],
        login: {
            url: '/login'
        },
        eye: {
            steps: ['Preperation', 'Contrast Check', 'Visual acuity test'],
            url: '/eye-test'
        }
    },
    cookie: {
        key: 'XSRF-token'
    },
    notification: {
        color: {
            s: 'success',
            d: "danger",
            i: "info"
        },
        common: {
            s: 'Successfully created.',
            d: "Some error occoured.",
            i: "Successfully updated."
        },
        login: {
            s: 'Logged in successfully.',
            i: 'Login credentials updated.',
            d: 'Invalid credentials.'
        },
        register: {
            s: 'Registered in successfully.',
            i: 'Registered updated.',
            d: 'Invalid credentials.'
        },
        movie: {
            s: 'Movie added successfully',
            i: 'Movie List updated',
            d: 'Some Error Occoured'
        },
    },
    sentry: {
        dns: process.env.REACT_APP_SENTRY_URL
    }
}