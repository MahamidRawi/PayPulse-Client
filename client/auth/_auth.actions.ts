import * as SecureStore from 'expo-secure-store';
import axios, { AxiosError } from "axios";
import { base_url } from "../variables/_vars";

const validate = async () => {
    try {
        const token = SecureStore.getItem('token');
        if (!token) throw 'No Token'
        const res = await axios.post(base_url + '/auth/validate', {}, {headers: {'x-access-token': token}});
        console.log(res.data.message)
        return true
    } catch (err) {
        throw 'Failed to Authenticate'
    }
}

const signIn = async (email: string, password: string) => {
    try {
        const token = SecureStore.getItem('token');
        if (!token) throw 'No Token'
        const res = await axios.post(base_url + '/auth/signin', {email, password}, {headers: {'x-access-token': token}});
        console.log(res.data.message)
        return true
    } catch (err: any) {
        const axioserr = err.response.data.message
        throw axioserr
    }
}


export {validate, signIn}