import styled from "styled-components"
import { B3, T2 } from "../../utitlity/TypographyStyles"

export default function OTPStageView(props) {
    
    return (
        <CentralBlockWrapper>
            <T2>Enter your one-time-password</T2>
            <B3>{"Sent to " + props.email + ". Please check the spam forlder."}</B3>
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