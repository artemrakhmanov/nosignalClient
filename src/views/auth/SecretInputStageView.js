import styled from "styled-components"
import { B1, B3, T2 } from "../../utitlity/TypographyStyles"

export default function SecretInputStageView(props) {
    
    return (
        <CentralBlockWrapper>
            <T2>Enter your secret phrase</T2>
            <B3>This secret is used to encrypt your messages. Losing it or reseting it will lead to the loss of previous chats.</B3>

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