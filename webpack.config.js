const path = require('path')

module.exports = {
    mode: 'development',
    entry: { 
        firebaseConfig: '/src/firebase_config.js',
        signIn: '/src/sign_in.js',
        resetPass: '/src/reset_password.js',
        signUp: '/src/sign_up.js',
        index: '/src/index.js',
        addSub: '/src/addSubscription.js',
        dashboard: '/src/dashboard.js'
    },
    output: {
        path: path.resolve(__dirname, 'Bundles'),
        filename: '[name].bundle.js'
    },
    watch: true
    
}