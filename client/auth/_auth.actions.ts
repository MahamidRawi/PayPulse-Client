import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { base_url } from "../variables/_vars";

const validate = async () => {
    try {
        const token = await SecureStore.getItemAsync('token'); // Use await here
        if (!token) throw 'No Token';
        const res = await axios.post(base_url + '/auth/validate', {}, { headers: { 'x-access-token': token } });
        console.log(res.data.message);
        return true;
    } catch (err) {
        return false;
    }
}

const signIn = async (email: string, password: string) => {
    try {
        const res = await axios.post(base_url + '/auth/signin', {email, password});
        console.log(res.data.message)
        return {token: res.data.token}
    } catch (err: any) {
        console.warn(err);
        const axioserr = err.response.data.message || 'An Error has Occured'
        throw axioserr
    }
}

const signUp = async (email: string, password: string, name: string) => {
    try {
        console.log('name : ', name)
        const res = await axios.post(base_url + '/auth/signup', {email, password, name});
        console.log(res.data.message)
        return true
    } catch (err: any) {
        const axioserr = err.response.data.message || err
        throw axioserr
    }
}


export {validate, signIn, signUp}