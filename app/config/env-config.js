const config = process.env;
const setDefault = (defaultValues) => {
    Object.keys(defaultValues).forEach(prop => {
        if (typeof config[prop] === 'undefined') {
            config[prop] = defaultValues[prop];
        };
    });
};

setDefault({
    // Add default values here
    PORT: 3000,
    ENVIRONMENT: 'dev',
    SECRET_TOKEN: 'N0M3L0sT0k3nS',
    MONGODB_URI: "mongodb+srv://dmongo-home:iBv4eoN1rtxwOTWw@cluster0-u0wma.mongodb.net/test?retryWrites=true&w=majority",
    BCRYPT_N_SALTS: 13,
    AUTH_USER_FIELD: 'username',
    AUTH_PASS_FIELD: 'password'
});

module.exports = config;