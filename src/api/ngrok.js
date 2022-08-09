import axios from 'axios';

EXPRESS_URL = process.env.EXPRESS_URL;

export default axios.create({
    baseURL: EXPRESS_URL,
});