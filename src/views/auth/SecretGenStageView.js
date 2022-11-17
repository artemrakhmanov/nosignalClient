import styled from "styled-components"
import { B1, B3, T2 } from "../../utitlity/TypographyStyles"

export default function SecretGenStageView(props) {
    
    return (
        <CentralBlockWrapper>
            <T2>Write down or securely save your secret</T2>
            <B3>This secret will be used to encrypt your messages. Never share it or store in a non-protected environment.</B3>
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