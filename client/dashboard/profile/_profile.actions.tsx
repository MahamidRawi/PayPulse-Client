import axios from "axios";
import { base_url } from "../../variables/_vars";
import * as SecureStore from 'expo-secure-store';

export const updateProfile = async (name: string, currency: string) => {
    try {
        const token = SecureStore.getItem('token');
        const res = await axios.post(`${base_url}/dashboard/updateUser`, {name, currency}, {headers: {'x-access-token': token}})
        return res.data.msg;
    } catch (err: any) {
        console.log(err);
        throw err.response.status == 401 ? false : err.response.data.msg;
    }
}

export const deleteProfile = async () => {
    try {
        const token = SecureStore.getItem('token');
        const res = await axios.post(`${base_url}/dashboard/deleteUser`, {}, {headers: {'x-access-token': token}})
        return res.data.msg;
    } catch (err: any) {
        console.warn(err.response);
        throw err.response.status == 401 ? false : err.response.data.msg;
    }
}