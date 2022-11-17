import styled from "styled-components"
import PuffLoader from "react-spinners/PuffLoader"
import { Colors } from "../utitlity/Colors"

export default function LoadingView() {
    return (
        <CentralBlockWrapper>
            <PuffLoader
                color={Colors.yellow}
                loading={true}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
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