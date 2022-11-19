import styled from "styled-components"
import { getChatAPI } from "../../api/ChatAPI"
import { getDecryptedMessages, sendMessage, testEncryption } from "../../controllers/ChatController"
import { Colors } from "../../utitlity/Colors"
import { InputField1 } from "../../utitlity/Fields"
import { B3, B3T, S4, B2, B4T } from "../../utitlity/TypographyStyles"
import { Form, Formik } from "formik";
import { ConfirmButton } from "../../utitlity/Buttons";
import { useEffect, useState } from "react"
import { useInterval } from "../../utitlity/hooks"

export default function ChatView(props) {

    function getReceiverEmail(chat) {
        const myUserID = props.myUserID
        if (myUserID === chat.userID1) {
            return chat.userEmail2
        } else {
            return chat.userEmail1
        }
    }

    function getReceiverID(chat) {
        const myUserID = props.myUserID
        if (myUserID === chat.userID1) {
            return chat.userID2
        } else {
            return chat.userID1
        }
    }

    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (props.currentChat) {
            if (!props.currentSecret) {return}
            getDecryptedMessages(props.currentChat._id, props.currentSecret)
            .then(decryptedMessages=> {
                setMessages(decryptedMessages)
            })
        }
    }, [props.currentChat])

    useInterval(() => {
        if (props.currentChat) {
            if (!props.currentSecret) {return}
            getDecryptedMessages(props.currentChat._id, props.currentSecret)
            .then(decryptedMessages=> {
                setMessages(decryptedMessages)
            })
        }
    }, 1000 * 10)
    
    
    return (
        <ChatWrapper>

            {messages
            ?
            <MessagesStreamWrapper>
                {messages.map((message)=>(
                    <MessageRowWrapper ownMessage={message.senderID === props.myUserID ? true : false}>
                        <MessageContainer ownMessage={message.senderID === props.myUserID ? true : false}>
                            <MessageText>{message.body}</MessageText>
                            <TimestampText>{message.timestamp}</TimestampText>
                        </MessageContainer>
                    </MessageRowWrapper>
                ))}
            </MessagesStreamWrapper>
            :
            <div/>}

            {props.currentChat
            ?
            <div>
                <Header>
                    <HeaderItem>
                        <S4>{getReceiverEmail(props.currentChat)}</S4>
                    </HeaderItem>
                </Header>

                

                

                <Formik
                    initialValues={{message: ""}}
                    onSubmit={(values, {resetForm})=>{
                        console.log("submitted message form")
                        console.log(values)
                        // props.onSubmitAction(values.)
                        sendMessage(values.message, props.currentSecret, props.myUserID, getReceiverID(props.currentChat), props.currentChat._id)
                        .then(newMessages=> {
                            resetForm()
                            setMessages(newMessages)
                        })
                    }}
                >
                    {props=> (
                        <Form noValidate>
                            <MessagingWrapper>
                                <InputField1 
                                    type="text" 
                                    name="message" 
                                    value={props.values.message} 
                                    placeholder="Message"
                                    isValid={true}
                                />

                                <ConfirmButton text={"Send"} action={props.handleSubmit}/>
                            </MessagingWrapper>
                        </Form>
                    )}
                </Formik>
                
                </div>
                :
                <ErrorWrapper>
                    <S4>No open chat</S4>    
                </ErrorWrapper>
            }
            

            {/* {messages
            ?
            <MessagesStreamWrapper>
                {messages.map((message)=>(
                    <MessageRowWrapper ownMessage={message.senderID === props.myUserID ? true : false}>
                        <MessageContainer ownMessage={message.senderID === props.myUserID ? true : false}>
                            <MessageText>{message.body}</MessageText>
                            <TimestampText>{message.timestamp}</TimestampText>
                        </MessageContainer>
                    </MessageRowWrapper>
                ))}
            </MessagesStreamWrapper>
            :
            <div/>} */}

        </ChatWrapper>
    )
}

const Scrollable = styled.div`
    height: 200px;
    overflow-y: scroll;

`

const ChatWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${Colors.white};
    border-radius: 25px;
    border: 1px solid ${Colors.lightgray};
    overflow-y: auto;
    max-height: 100%;
    position: relative;
`

const ErrorWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Window = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const Header = styled.div`
    position: absolute;
    top: 0px;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(5px);
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: start;
    justify-content: start;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
`

const HeaderItem = styled.div`
    padding: 20px;
`

const MessagingWrapper = styled.div`
    position: absolute;
    bottom: 7px;
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(255,255,255,0.2);
    /* border: 1px dashed orange; */
`

const MessagesStreamWrapper = styled.div`
    position: absolute;
    /* overflow-y: scroll; */
    height: 100%;
    bottom: 100px;
    width: 100%;
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: start;
    justify-content: end;
    /* z-index: 100; */
`

const MessageRowWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    /* align-items: ${props=>props.ownMessage === true ? "end" : "start"}; */
    justify-content: ${props=>props.ownMessage === true ? "end" : "start"};
`

const MessageContainer = styled.div`
    width: 40%;
    background-color: ${Colors.white};
    border-radius: ${props => props.ownMessage ? "25px 25px 0px 25px" : "25px 25px 25px 0px"};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: ${props=>props.ownMessage === true ? "end" : "start"};
    border: 1px solid ${Colors.lightgray};
    margin: 0px 10px;
`

const MessageText = styled(B3)`
    padding: 10px 10px;
`

const TimestampText = styled(B4T)`
    padding: 10px 10px;
`


