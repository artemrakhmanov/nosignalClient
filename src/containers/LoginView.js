import styled from "styled-components"
import { Form, Formik } from "formik";
import iconImg from "../assets/icon.png"
import { T2 } from "../utitlity/TypographyStyles";
import { useState } from "react";
import EmailStageView from "../views/auth/EmailStageView";
import OTPStageView from "../views/auth/OTPStageView";
import SecretGenStageView from "../views/auth/SecretGenStageView";
import SecretInputStageView from "../views/auth/SecretInputStageView";
import LoadingView from "../views/LoadingView";
import { userEnteredEmail, userSuppliedOTP, userSuppliedSecretPhrase } from "../controllers/AuthController";


export default function LoginView() {

    const [loginStage, setLoginStage] = useState(0)

    const [userEmail, setUserEmail] = useState("")
    const [secretPhrase, setSecretPhrase] = useState(null)
    const [privateKey, setPrivateKey] = useState(null)
    const [publicKey, setPublicKey] = useState(null)
    const [jwt, setJwt] = useState(null)

    return (
        <div>

            <LogoWrapper>
                <Icon src={iconImg} />
            </LogoWrapper>

            {loginStage === 0
            ?
            <EmailStageView onSubmitAction={(inputEmail)=> {
                userEnteredEmail(inputEmail, setUserEmail, loginStage, setLoginStage)
            }}/>
            :<div/>}

            {loginStage === 1
            ?
            <OTPStageView email={userEmail} onSubmitAction={(otp)=>{
                userSuppliedOTP(otp, loginStage, setLoginStage)
            }}/>
            :<div/>}

            {loginStage === 2
            ?
            <SecretGenStageView onSubmitAction={()=> {
                setLoginStage(3)
            }}/>
            :<div/>}

            {loginStage === 3
            ?
            <SecretInputStageView onSubmitAction={(mnemonic)=> {
                userSuppliedSecretPhrase(mnemonic, setLoginStage)
            }}/>
            :<div/>}

            {loginStage === -1
            ?
            <LoadingView/>
            :<div/>}

        </div>
    )
}

const LogoWrapper = styled.div`
    position: absolute;
    top: 10px;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const Icon = styled.img`
    object-fit: contain;
    height: 40px;
`



