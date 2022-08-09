import axios from 'axios';
import { EXPRESS_URL } from '@env'

console.log(EXPRESS_URL);
export default axios.create({
    baseURL: `${EXPRESS_URL}`,
});