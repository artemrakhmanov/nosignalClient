import styled from "styled-components"
import { Colors } from "../../utitlity/Colors"

export default function YourChatsView(props) {
    
    return (
        <BrowserWrapper>
            YourChatsView
        </BrowserWrapper>
    )
}

const BrowserWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${Colors.white};
    border-radius: 25px;
    border: 1px solid ${Colors.yellow};
    overflow: hidden;
`