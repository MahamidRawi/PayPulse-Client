import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { base_url } from "../variables/_vars";

const getUser = async (token: any): Promise<any> => {
    try {
      // Wait for the token to be retrieved
    //   const token = SecureStore.getItem('token');
    //   console.log(token);
      
      if (!token) {
        console.log('NO TOKEN');
        return null; // or handle it accordingly
      }
  
      console.log('TOKEN ', token);
      
      // Wait for the axios request to complete
      const res = await axios.get(`${base_url}/dashboard/getUser`, {
        headers: { 'x-access-token': token }
      });
      
      console.log('User data:', res.data.user);
      
      // Return the user data
      return { info: res.data.user };
  
    } catch (err: any) {
      console.log(err.response?.data || err);
      
      // Throw appropriate error based on status code
      throw err.response?.data?.stc === 401 ? false : 'An Error has Occurred';
    }
  };
  

const addJob = async (job: object) => {
    try {
        const token = SecureStore.getItem('token');
        const res = await axios.post(`${base_url}/dashboard/createJob`, {job}, {headers: {'x-access-token': token}});
        return res.data
    } catch (err: any) {
        console.log(err)
        console.log(err.response.data)
        throw {message: err.response.data, auth: err.response.status == 400 ? false : true}
    }
}

const updateJob = async (job: object, jobId: string) => {
    try {
        const token = SecureStore.getItem('token');
        const res = await axios.post(`${base_url}/dashboard/updateJob`, {job, jobId}, {headers: {'x-access-token': token}});
        return res.data
    } catch (err: any) {
        console.log(err)
        console.log(err.response.data)
        throw {message: err.response.data, auth: err.response.status == 400 ? false : true}
    }
}

const getJob = async (jobId: string) => {
    try {
        const token = SecureStore.getItem('token');
        const res = await axios.get(`${base_url}/dashboard/getJob`, {headers: {'x-access-token': token, 'jobid': jobId}});
        console.log('RES : ', jobId, res.data)
        return {job: res.data.job, stats: res.data.stats}
    } catch (err: any) {
        console.log(err)
        console.log(err.response.data)
        const stc = err.response.status
        throw {message: err.response.data, auth: stc == 404 ? false : true}
    }
}

const startJob = async (jobId: string, timeStarted: number) => {
    try {
        const token = SecureStore.getItem('token');
        const res = await axios.post(`${base_url}/dashboard/startJob`, {jobId, timeStarted}, {headers: {'x-access-token': token}})
        console.log('BONJOUR : ',res.data)
        return res.data.job
    } catch (err: any) {
        console.log(err.response.data)
        throw false
    }
}

const finishJob = async (jobId: string) => {
    try {
        const token = SecureStore.getItem('token');
        const res = await axios.post(`${base_url}/dashboard/finishJob`, {jobId}, {headers: {'x-access-token': token}})
        return res.data.job;
    } catch (err: any) {
        throw false;
    }
}

const deleteJob = async (jobId: string) => {
    try {
        const token = SecureStore.getItem('token');
        const res = await axios.post(`${base_url}/dashboard/deleteJob`, {jobId}, {headers: {'x-access-token': token}})
        return res.data.message;
    } catch (err: any) {
        throw err.response.status == 401 ? false : err.response.data.msg;
    }
}

const getEntry = async (entryId: string) => {
    try {
        const token = SecureStore.getItem('token');
        const res = await axios.post(`${base_url}/dashboard/getEntry`, {entryId}, {headers: {'x-access-token': token}})
        return res.data.entry;
    } catch (err: any) {
        throw err.response.status == 401 ? false : err.response.data.msg;
    }
}

const deleteEntry = async (entryId: string) => {
    try {
        const token = SecureStore.getItem('token');
        const res = await axios.post(`${base_url}/dashboard/deleteEntry`, {entryId}, {headers: {'x-access-token': token}})
        return res.data.msg;
    } catch (err: any) {
        throw err.response.status == 401 ? false : err.response.data.msg;
    }
}

export {deleteEntry, getEntry, updateJob, deleteJob, startJob, finishJob, getUser, addJob, getJob}