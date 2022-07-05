import {MONGO_URL,YELP_API_KEY, YELP_CLIENT_ID} from "@env";

const devEnvironmentVariables = {
    MONGO_URL,
    YELP_API_KEY,
    YELP_CLIENT_ID,
};
const prodEnvironmentVariables = {
    MONGO_URL,
    YELP_API_KEY,
    YELP_CLIENT_ID,
};

export default __DEV__ ? devEnvironmentVariables : prodEnvironmentVariables;