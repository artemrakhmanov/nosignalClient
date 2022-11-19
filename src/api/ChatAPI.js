import { rootAPI } from '../config';
import Cookies from 'universal-cookie';

import axios from "axios";

//get initialised chats
export async function queryMyChatsAPI() {
    try {
        const endpoint = rootAPI + "chat/mychats"
        const cookies = new Cookies()
        const token = cookies.get("jwt")
        const response = await axios.get(endpoint, {
            headers: {
                "x-access-token": token
            }
        })
        console.log(response.data)
        return response.data

    } catch (error) {
        console.log(error)
        throw error
    }
}

//get all users in the system except self
export async function queryUsersAPI() {
    try {
        const endpoint = rootAPI + "chat/availableusers"
        const cookies = new Cookies()
        const token = cookies.get("jwt")
        const response = await axios.get(endpoint, {
            headers: {
                "x-access-token": token
            }
        })
        console.log(response.data)
        return response.data

    } catch (error) {
        console.log(error)
        throw error
    }
}

//get the chat object 
export async function getChatAPI(receiverUser) {
    try {
        const endpoint = rootAPI + "chat/getChat"
        const cookies = new Cookies()
        const token = cookies.get("jwt")
        const payload = {
            receiverUser: receiverUser
        }
        const response = await axios.post(endpoint, payload, {
            headers: {
                "x-access-token": token
            }
        })
        console.log(response.data.chat)
        return response.data.chat

    } catch (error) {
        console.log(error)
        throw error
    }
}

//push shared key & other chat field values to the server
export async function initialiseChatAPI(
    myIndex, ownAES, receiverAES, chatID
) {
    try {
        const endpoint = rootAPI + "chat/initialiseChat"
        const cookies = new Cookies()
        const token = cookies.get("jwt")
        const payload = {
            myIndex: myIndex,
            myAES: ownAES,
            receiverAES: receiverAES,
            chatID: chatID
        }
        const response = await axios.post(endpoint, payload, {
            headers: {
                "x-access-token": token
            }
        })
        console.log(response.data.chat)
        return response.data.chat

    } catch (error) {
        console.log(error)
        throw error
    }
}

//send message to the chat
export async function sendMessageAPI(cipher, iv, timeCipher, timeIV, senderID, receiverID, chatID) {
    try {
        const payload = {
            cipher: cipher,
            iv: iv,
            timeCipher: timeCipher,
            timeIV: timeIV,
            senderID: senderID,
            receiverID: receiverID,
            chatID: chatID
        }
        const endpoint = rootAPI + "chat/sendMessage"
        const cookies = new Cookies()
        const token = cookies.get("jwt")
        
        const response = await axios.post(endpoint, payload, {
            headers: {
                "x-access-token": token
            }
        })
        console.log(response)
        return response.data.messages
    } catch(error) {
        throw error
    }
}

export async function getMessagesAPI(chatID) {
    try {
        const payload = {
            chatID: chatID
        }
        const endpoint = rootAPI + "chat/getMessages"
        const cookies = new Cookies()
        const token = cookies.get("jwt")
        
        const response = await axios.post(endpoint, payload, {
            headers: {
                "x-access-token": token
            }
        })
        console.log(response.data)
        return response.data.messages
    } catch (error) {
        throw error
    }
}

//retrieve a user ID
export async function getUserIDAPI() {
    try {
        const endpoint = rootAPI + "uid"
        const cookies = new Cookies()
        const token = cookies.get("jwt")
        const response = await axios.get(endpoint, {
            headers: {
                "x-access-token": token
            }
        })
        
        return response.data.userID

    } catch (error) {
        console.log(error)
        throw error
    }
}


