import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { base_url } from "../variables/_vars";

const validate = async () => {
    try {
        const token = SecureStore.getItem('token');
        if (!token) throw 'No Token'
        const res = await axios.post(base_url + '/auth/validate', {token});
        return {success: res.data.success}
    } catch (err) {
        throw 'Failed to Authenticate'
    }
}


export {validate}