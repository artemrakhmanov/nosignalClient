import styled from "styled-components"
import { Colors } from "../../utitlity/Colors"

export default function ChatView(props) {
    
    return (
        <ChatWrapper>
            chat view
        </ChatWrapper>
    )
}

const ChatWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${Colors.white};
    border-radius: 25px;
    border: 1px solid ${Colors.yellow};
    overflow: hidden;
`


