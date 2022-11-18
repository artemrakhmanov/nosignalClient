import { useEffect, useState } from "react"
import styled from "styled-components"
import { getMnemonicPhrase } from "../../controllers/EncryptionController"
import { ConfirmButton } from "../../utitlity/Buttons"
import { B1, B2, B3, S3, T2 } from "../../utitlity/TypographyStyles"

export default function SecretGenStageView(props) {

    const [mnemonic, setMnemonic] = useState("")

    useEffect(() => {
      setMnemonic(getMnemonicPhrase())
    }, [])
    
    
    return (
        <CentralBlockWrapper>
            <T2>Write down or securely save your secret</T2>
            <B3>This secret will be used to encrypt your messages. Never share it or store in a non-protected environment.</B3>

            <SecretPhraseContainer>
                <S3>{mnemonic}</S3>
            </SecretPhraseContainer>

            <ConfirmButton text={"Continue"} action={() => {
                props.onSubmitAction()
            }}/>

        </CentralBlockWrapper>
    )
}

const CentralBlockWrapper = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

const SecretPhraseContainer = styled.div`
    width: 60vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`