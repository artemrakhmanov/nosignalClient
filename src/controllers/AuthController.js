import { checkIfUserSetUpAPI, requestOTPWithEmailAPI, signInWithOTPAPI, supplyPublicKey } from "../api/AuthAPI"
import Cookies from 'universal-cookie';
import { generateRSA } from "./EncryptionController";
import store from "../reducers/store"
import { addPublicKey, addSecret } from "../reducers/keyReducer";
import { logIn } from "../reducers/loginReducer";

export async function userEnteredEmail(
    inputEmail,
    setUserEmail,
    loginStage, setLoginStage
) {
    //login stage to -1 for loading
    setLoginStage(-1)

    //check email for syntax
    if (!inputEmail.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
        //invalid email
        alert("Please check the syntax of email.")
        setLoginStage(0)
        return
    }

    try {
        const response = await requestOTPWithEmailAPI(inputEmail)
        console.log(response)
        //save email
        setUserEmail(inputEmail)
        //save JWT
        const cookies = new Cookies()
        cookies.set("jwt", response.token, { path: '/' })
        //direct towards next stage
        setLoginStage(1)
        return
    } catch (error) {
        alert("An error occured, please try again later")
        setLoginStage(0)
        return
    }
}

export async function userSuppliedOTP(
    otp,
    loginStage, setLoginStage
) {
    try {
        //change stage to -1
        setLoginStage(-1)
        
        //call api method to supply otp
        const response = await signInWithOTPAPI(otp)

        if (!response.status) {
            alert("Invalid one time password")
            setLoginStage(1)
            return
        }

        console.log(response.token)

        //save new token
        const cookies = new Cookies()
        cookies.set("jwt", response.token, {path: '/'})

        //query if user is set up to determine secret gen or input
        const userIsSetUp = await checkIfUserSetUpAPI()
        
        console.log(userIsSetUp)

        if (userIsSetUp === true) {
            setLoginStage(3)
        } else {
            console.log('seting')
            setLoginStage(2)
        }

    } catch (error) {
        alert(error.response.data.message)
        setLoginStage(0)
        return
    }
}

export async function userSuppliedSecretPhrase(
    mnemonic, setLoginStage
) {
    try {
        setLoginStage(-1)
        //generate keypair from mnemonic
        const keypair = await generateRSA(mnemonic)
        //supply public key to the server
        const response = await supplyPublicKey(keypair.publicKey)
        //retrieve and save a new app authorized JWT
        const cookies = new Cookies()
        cookies.set("jwt", response.token, {path: '/'})
        //store private and public key in redux store
        store.dispatch(addPublicKey(keypair.publicKey))
        store.dispatch(addSecret(keypair.secret))
        store.dispatch(logIn())
        return true

    } catch (error) {
        alert("Error happened during secret generation")
        console.log("error", error)
        setLoginStage(3)
        return false
    }
}

