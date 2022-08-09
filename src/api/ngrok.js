import axios from 'axios';
import env from '../config/env';

export default axios.create({
    baseURL: env.URI,
});