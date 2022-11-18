import styled from "styled-components"
import logoTextImg from "../assets/iconText.png"
import YourChatsView from "../views/chat/YourChatsView"
import OnlineAccountsBrowserView from "../views/chat/OnlineAccountsBrowserView"
import ChatView from "../views/chat/ChatView"

import useWebSocket from 'react-use-websocket';

export default function ChatAppView() {
    
    const socketUrl = "wss://127.0.0.1:8000/websocket"
    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket,
      } = useWebSocket(socketUrl, {
        onOpen: () => {
            console.log('opened')
            sendMessage("hello")
        },
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => true,
      })

    return (
        <div>
            <LogoWrapper>
                <Icon src={logoTextImg} />
            </LogoWrapper>


            <ContentWrapper>
                    <ChatViewWrapper>
                        <BrowsersWrapper>
                            <YourChatsView />

                            <OnlineAccountsBrowserView />
                        </BrowsersWrapper>

                        <ChatView/>
                    </ChatViewWrapper>
            </ContentWrapper>
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

const ContentWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const ChatViewWrapper = styled.div`
    height: 80vh;
    width: 80vw;
    display: grid;
    grid-gap: 16px 16px;
    grid-template-columns: ${ "40% 60%"};
    grid-auto-columns: 40% 40%;
    align-items: start;
`

const BrowsersWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-gap: 16px;
    grid-template-rows: 1fr 1fr;
    align-items: start;
`