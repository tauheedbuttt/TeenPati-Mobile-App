import axios from 'axios';
import { EXPRESS_DEV_URL } from '@env'

console.log(EXPRESS_DEV_URL);
export default axios.create({
    baseURL: EXPRESS_DEV_URL,
});