// const { process_params } = require("express/lib/router");
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const morgan = require('morgan');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    ASSETS_PATH: '/assets',
    session_cookie_key: 'helloWorld',
    db: 'codieal_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'kunalraj2999@gmail.com',
            pass: '@rajkunal@9065'
        }
    },
    google_client_id: "802198501272-4msfqb0q6d06a64af4k11b6hi3lstg5e.apps.googleusercontent.com",
    google_client_Secret: "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",
    google_callback_URL: "http://localhost:8000/users/auth/google/callback",
    github_client_id: "8e51cd4e679ddd854d0a",
    github_client_Secret: "c8e2f2c2f3bf51f18b9d63ffe7ecf1defb26768f",
    github_callback_URL: "http://localhost:8000/users/auth/github/callback",
    jwt_secret : 'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

const production = {
    name: process.env.CODIEAL_NAME,
    session_cookie_key: process.env.CODIEAL_SESSION_COOKIE_KEY,
    db: process.env.CODIEAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODIEAL_USER_EMAIL,
            pass: process.env.CODIEAL_USER_PASS
        }
    },
    google_client_id: process.env.CODIEAL_GOOGLE_CLIENT_ID,
    google_client_Secret: process.env.CODIEAL_GOOGLE_CLIENT_SECRET,
    google_callback_URL: process.env.CODIEAL_GOOGLE_CALLBACK_URL,
    github_client_id: process.env.CODIEAL_GITHUB_CLIENT_ID,
    github_client_Secret: process.env.CODIEAL_GITHUB_CLIENT_SCERET,
    github_callback_URL: process.env.CODIEAL_GITHUB_CALLBACK_URL,
    jwt_secret :  process.env.JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports = eval(process.env.CODIEAL_ENVIROMENT == undefined ? development :  eval(process.env.CODIEAL_ENVIROMENT));