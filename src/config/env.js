LOCAL_URL = process.env.LOCAL_URL;
SERVER_URL = process.env.SERVER_URL;

const devEnvironmentVariables = {
    URI: LOCAL_URL
};
const prodEnvironmentVariables = {
    URI: SERVER_URL
};

export default prodEnvironmentVariables;