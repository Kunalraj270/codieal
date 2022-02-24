const development = {
    name: 'development',
    // assets_path: '/assets',
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
    jwt_secret : 'codeial'
}

const production = {
    name: 'production'
}

module.exports = development;