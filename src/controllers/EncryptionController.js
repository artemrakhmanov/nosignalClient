import { pki } from "node-forge";
import { generateMnemonic } from "bip39";
const cryptico = require('cryptico');
const crypto = require('crypto');


export function getMnemonicPhrase() {
    const mnemonic = generateMnemonic(256)
    return mnemonic
}

export async function generateRSA(mnemonic) {
    try {

        var secret = cryptico.generateRSAKey(mnemonic, 1024)
        var publicKey = cryptico.publicKeyString(secret)

        return {
            secret: secret,
            publicKey: publicKey
        }

    } catch (error) {
        alert("Error during keypair generation")
        console.log(error)
        return
    }
}

export async function encrypt(plaintext, publicKey) {
    try {
        var encryptionResult = cryptico.encrypt(plaintext, publicKey)
        if (encryptionResult.status === "failure") {
            console.log("error during encryption")
            alert("Encryption Error")
            return ""
        }
        return encryptionResult.cipher
    } catch (error) {
        console.log("error during encryption", error)
        return ""
    }
}

export async function decrypt(cipher, secret) {
    try {
        var decryptionResult = cryptico.decrypt(cipher, secret)
        if (decryptionResult.status === "failure") {
            console.log("error during decryption")
            alert("Decryption Error")
            return ""
        }
        const plaintext = decryptionResult.plaintext
        return plaintext
    } catch (error) {
        console.log("error during decryption", error)
        return ""
    }
}

//create a shared secret
export function generateAES() {
    var aesSecret = crypto.randomBytes(32)
    var aesSecretString = aesSecret.toString('base64')
    return aesSecretString
}

export function getAESFromString(aesString) {
    return Buffer.from(aesString, 'base64')
}

export function encryptAES(plaintext, aesString) {
    const aesKey = getAESFromString(aesString)
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(aesKey), iv);
    let encrypted = cipher.update(plaintext);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}
   
export function decryptAES(ivString, cipher, aesString) {
    const aesKey = getAESFromString(aesString)
    let iv = Buffer.from(ivString, 'hex');
    let encryptedText = Buffer.from(cipher, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(aesKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}


//helper function for an async/await syntax
//causes worker syntax error....
async function createKeypair(prng) {
    return new Promise((resolve, reject)=>{
        pki.rsa.generateKeyPair({
            bits: 4096,
            prng,
            workers: 1 //allow forge to determine workers count itself
        }, (err, keypair) => {
            if (err) {
                return reject(err)
            }
            
            resolve(keypair)
        })
    })
}
