import { rootAPI } from '../config';
import Cookies from 'universal-cookie';

import axios from "axios";

export async function requestOTPWithEmailAPI(email) {
    try {
        const endpoint = rootAPI + "auth/requestOTP"
        const response = await axios.post(endpoint, {
            email: email
        })
        return response.data
    } catch(error) {
        console.log(error)
    }
}

export async function signInWithOTPAPI(otp) {
    try {
        const endpoint = rootAPI + "auth/signInWithOTP"
        const payload = {
            otp: otp
        }
        const cookies = new Cookies()
        const token = cookies.get("jwt")
        const response = await axios.post(endpoint, payload, {
            headers: {
                "x-access-token": token
            }
        })
        
        return response.data

    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function supplyPublicKey(publicKey) {

    try {
        const endpoint = rootAPI + "auth/signInWithKey"
        const payload = {
            publicKey: publicKey
        }
        const cookies = new Cookies()
        const token = cookies.get("jwt")
        const response = await axios.post(endpoint, payload, {
            headers: {
                "x-access-token": token
            }
        })
        console.log(response)
        return response.data
    } catch(error) {
        console.log("error supplyPublicKey", error)
        throw error
    }
}

export async function checkIfUserSetUpAPI() {
    try {
        const endpoint = rootAPI + "auth/userIsSetUp"
        const cookies = new Cookies()
        const token = cookies.get("jwt")
        const response = await axios.get(endpoint, {
            headers: {
                "x-access-token": token
            }
        })
        console.log(response.data)
        return response.data.status

    } catch (error) {
        console.log(error)
        throw error
    }
}

