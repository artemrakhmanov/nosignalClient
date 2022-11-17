import styled from "styled-components"
import { T2 } from "../../utitlity/TypographyStyles"

export default function EmailStageView(props) {
    
    return (
        <CentralBlockWrapper>
            <T2>Log in to noSignal</T2>
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