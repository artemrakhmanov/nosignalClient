import { getChatAPI, getMessagesAPI, getUserIDAPI, initialiseChatAPI, queryMyChatsAPI, queryUsersAPI, sendMessageAPI } from "../api/ChatAPI"
import { decrypt, decryptAES, encrypt, encryptAES, generateAES } from "./EncryptionController"
import store from "../reducers/store"

//get and populate own id parameter
export async function userRequestedOwnID(setUserID) {
    try {
        const userID = await getUserIDAPI()
        setUserID(userID)
        return userID
    } catch (error) {
        alert(error.message)
        return
    }
}

//get an array of users with whom the chats have been created
export async function userRequestedOwnChats(setMyChatsList) {
    try {
        const response = await queryMyChatsAPI()
        setMyChatsList(response.chats)
        return response.chats
    } catch (error) {
        alert(error.message)
        return
    }
}

//get an array of other users in the application to select from
export async function userRequestedUserList(setOtherUsersList) {
    try {
        const response = await queryUsersAPI()
        setOtherUsersList(response.users)
        return response.users
    } catch (error) {
        alert(error.message)
        return
    }
}

//get a chat object
/*
    Requests a chat object with the other user
    If chat has not been initialised:
        creates a shared secret & encrypts it with own & recepient public key
        pushed data back to server
        
    requests a chat object with the user provided & returns decrypted shared secret

    polls show my chats again & updates a value
*/
export async function openChatWithUser(
    user, myUserID, setOpenChat, setCurrentDecryptedSecret
) {
    try {
        //byild user object if necessary
        var receiverUser = user
        if (!receiverUser.email) {
            //determine if 1 or 2
            var myIndex = 0
            if (user.userID1 === myUserID) {
                myIndex = 1
            } else {
                myIndex = 2
            }
            receiverUser = {
                _id: myIndex === 1 ? user.userID2 : user.userID1,
                publicKey: myIndex === 1 ? user.publicKey2 : user.publicKey1,
                email: myIndex === 1 ? user.userEmail2 : user.userEmail1
            }
        }

        //get chat object
        var chatObject = await getChatAPI(receiverUser)

        //determine if 1 or 2
        myIndex = 0
        if (chatObject.userID1 === myUserID) {
            myIndex = 1
        } else {
            myIndex = 2
        }

        const state = store.getState()
        const publicKey = state.key.value.publicKey
        const secret = state.key.value.secret
        
        //check if initialised
        if (chatObject.encryptedChatKey1 === "" || chatObject.encryptedChatKey2 === "") {
            //new chat
            console.log("init routine")
            //create a shared secret
            const aesString = generateAES()
            //encrypt with own public key
            const encryptedAES_own = await encrypt(aesString, publicKey)
            //encrypt with receiver public key
            const receiverPublicKey = myIndex === 1 ? chatObject.publicKey2 : chatObject.publicKey1
            const encryptedAES_receiver = await encrypt(aesString, receiverPublicKey)
            //push to server & update object
            chatObject = await initialiseChatAPI(myIndex, encryptedAES_own, encryptedAES_receiver, chatObject._id)
        }

        //decrypt secret
        let encyptedAESString = myIndex === 1 ? chatObject.encryptedChatKey1 : chatObject.encryptedChatKey2
        console.log("progress", secret, encyptedAESString, chatObject)
        const decryptedAESString = await decrypt(encyptedAESString, secret)
        //set secret
        setCurrentDecryptedSecret(decryptedAESString)
        //set chat
        setOpenChat(chatObject)
        //end
        return chatObject
        
    } catch (error) {
        alert(error.message)
        return
    }
}

export async function testEncryption() {
    try {
        const state = store.getState()
        const publicKey = state.key.value.publicKey
        const secret = state.key.value.secret
        //create a shared secret
        const aesString = generateAES()
        console.log("aes pre encryption", aesString)
        //encrypt with own public key
        const encryptedAES = await encrypt(aesString, publicKey)
        console.log("encrypted:", encryptedAES)
        const decryptedAESString = await decrypt(encryptedAES, secret)
        console.log("aes post decryption", decryptedAESString)
    } catch (error) {
        console.log(error)
    }
}

//sends a message to the other user and retrieves a new messages object
/*
    encrypts the message & metadata with the shared secret
    pushes to the server
    receives a new chat object
*/
export async function sendMessage(plaintext, aesKeyString, senderID, receiverID, chatID) {
    try {
        //encrypt
        const encryptionResult = encryptAES(plaintext, aesKeyString)
        const cipher = encryptionResult.encryptedData
        const iv = encryptionResult.iv
        const decryptedTimestamp = (new Date()).toISOString()
        const timestampEncRes = encryptAES(decryptedTimestamp, aesKeyString)
        const timeCipher = timestampEncRes.encryptedData
        const timeIV = timestampEncRes.iv
        //send
        const updatedMessagesArray = await sendMessageAPI(cipher, iv, timeCipher, timeIV, senderID, receiverID, chatID)
        console.log(updatedMessagesArray)

        //decrypt
        const decryptedMessages = decryptMessagesArray(updatedMessagesArray, aesKeyString)

        //return new messages object
        return decryptedMessages
    } catch (error) {
        console.log(error)
        alert(error.message)
        return []
    }
}

//a method for user to update the messages stream
export async function getDecryptedMessages(chatID, aesKeyString) {
    try {
        //get messages api
        const encryptedMessages = await getMessagesAPI(chatID)
        //decrypt into an array
        const decryptedMessages = decryptMessagesArray(encryptedMessages, aesKeyString)

        return decryptedMessages

    } catch (error) {
        console.log(error)
        alert(error.message)
        return []
    }
}

function decryptMessagesArray(messages, aesKeyString) {
    var result = []
    console.log(messages)

    messages.forEach((element, index, array)=> {
        const plaintext = decryptAES(element.iv, element.body, aesKeyString)
        const timestampString = decryptAES(element.ivTimestamp, element.timestamp, aesKeyString)
        const decrypted = {
            _id: element._id,
            senderID: element.senderID,
            receiverID: element.receiverID,
            timestamp: timestampString,
            body: plaintext
        }
        result.push(decrypted)
    })

    // for (const message of messages) {
    //     const plaintext = decryptAES(message.iv, message.body, aesKeyString)
    //     const timestampString = decryptAES(message.timeIV, message.timeCipher, aesKeyString)
    //     const decrypted = {
    //         _id: message._id,
    //         senderID: message.senderID,
    //         receiverID: message.receiverID,
    //         timestamp: timestampString,
    //         body: plaintext
    //     }
    //     result.push(decrypted)
    // }
    console.log("decrypted:",result)
    return result
}