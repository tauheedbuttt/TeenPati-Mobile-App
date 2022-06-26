import {MONGO_URL} from "@env";

const devEnvironmentVariables = {
    MONGO_URL,
};
const prodEnvironmentVariables = {
    MONGO_URL,
};

export default __DEV__?devEnvironmentVariables:prodEnvironmentVariables;