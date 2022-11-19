import styled from "styled-components"
import logoTextImg from "../assets/iconText.png"
import YourChatsView from "../views/chat/YourChatsView"
import OnlineAccountsBrowserView from "../views/chat/OnlineAccountsBrowserView"
import ChatView from "../views/chat/ChatView"

import { useEffect, useState } from "react"
import { openChatWithUser, userRequestedOwnChats, userRequestedOwnID, userRequestedUserList } from "../controllers/ChatController"
import { useSelector } from "react-redux"
import { getChatAPI } from "../api/ChatAPI"

export default function ChatAppView() {

    // const publicKey = useSelector(state => state.key.value.publicKey)
    // const secret = useSelector(state => state.key.value.secret)
    
    const [myUserID, setMyUserID] = useState(null)
    const [openChat, setOpenChat] = useState(null)
    //store a decrypted chat secret for the current open chat
    const [currentDecryptedSecret, setCurrentDecryptedSecret] = useState(null)
    const [otherUsersList, setOtherUsersList] = useState([])
    const [myChatsList, setMyChatsList] = useState([])

    useEffect(() => {
        //get my user ID
        userRequestedOwnID(setMyUserID)
        userRequestedUserList(setOtherUsersList)
        userRequestedOwnChats(setMyChatsList)

        // console.log("pub key:", publicKey)
        // console.log("priv key: ", secret)

    }, [])

    useEffect(() => {
        userRequestedOwnChats(setMyChatsList)
    }, [openChat])
    
    

    return (
        <div>
            <LogoWrapper>
                <Icon src={logoTextImg} />
            </LogoWrapper>


            <ContentWrapper>
                    <ChatViewWrapper>
                        <BrowsersWrapper>
                            <YourChatsView 
                                accountList={myChatsList}
                                myUserID={myUserID}
                                onAccountSelect={(user)=> {
                                    //open & get a chat with this user
                                    console.log("selected from your chats", user)
                                    openChatWithUser(
                                        user, myUserID, setOpenChat, setCurrentDecryptedSecret
                                    )
                                }}
                            />

                            <OnlineAccountsBrowserView 
                                accountList={otherUsersList}
                                onAccountSelect={(user)=> {
                                    //open & get a chat with this user
                                    console.log("selected from browser", user)
                                    openChatWithUser(
                                        user, myUserID, setOpenChat, setCurrentDecryptedSecret
                                    )
                                }}
                            />
                        </BrowsersWrapper>

                        <ChatView
                            currentChat={openChat}
                            myUserID={myUserID}
                            currentSecret={currentDecryptedSecret}
                            onMessageSend={(plaintext)=> {
                                //call 
                            }}
                        />
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
    /* overflow: auto; */
`

const ChatViewWrapper = styled.div`
    height: 80vh;
    width: 80vw;
    display: grid;
    grid-gap: 7px 7px;
    grid-template-columns: ${ "40% 60%"};
    grid-auto-columns: 40% 40%;
    align-items: start;
    /* overflow: auto; */
`

const BrowsersWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    grid-gap: 7px;
    grid-template-rows: 1fr 1fr;
    align-items: start;
`