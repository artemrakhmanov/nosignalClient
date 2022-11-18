import { pki, random } from "node-forge";
import { generateMnemonic, mnemonicToSeed } from "bip39";
const cryptico = require('cryptico');

export function getMnemonicPhrase() {
    const mnemonic = generateMnemonic(256)
    return mnemonic
}

export async function generateRSA(mnemonic) {
    try {

        var secret = cryptico.generateRSAKey(mnemonic, 1024)
        var publicKey = cryptico.publicKeyString(keypair)

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
        var cipher = cryptico.encrypt(plaintext, publicKey)
        return cipher
    } catch (error) {
        console.log("error during encryption", error)
        return ""
    }
}

export async function decrypt(cipher, secret) {
    try {
        const plaintext = cryptico.decrypt(cipher, secret)
        return plaintext
    } catch (error) {
        console.log("error during decryption", error)
        return ""
    }
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
