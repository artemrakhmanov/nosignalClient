import styled from "styled-components"
import { getChatAPI } from "../../api/ChatAPI"
import { sendMessage, testEncryption } from "../../controllers/ChatController"
import { Colors } from "../../utitlity/Colors"
import { InputField1 } from "../../utitlity/Fields"
import { S4 } from "../../utitlity/TypographyStyles"
import { Form, Formik } from "formik";
import { ConfirmButton } from "../../utitlity/Buttons";

export default function ChatView(props) {

    function getReceiverEmail(chat) {
        const myUserID = props.myUserID
        if (myUserID === chat.userID1) {
            return chat.userEmail2
        } else {
            return chat.userEmail1
        }
    }
    
    return (
        <ChatWrapper>
            {props.currentChat
            ?
            <Window>
                <Header>
                    <HeaderItem>
                        <S4>{getReceiverEmail(props.currentChat)}</S4>
                    </HeaderItem>
                </Header>

                

                <MessagesStreamWrapper>

                </MessagesStreamWrapper>

                <Formik
                    initialValues={{message: ""}}
                    onSubmit={values=>{
                        console.log("submitted message form")
                        console.log(values)
                        // props.onSubmitAction(values.)
                        sendMessage(values.message, props.currentSecret)
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
                {/* <MessagingWrapper>
                    <div>hello</div>
                    <div>hello</div>
                </MessagingWrapper> */}
            </Window>
            :
            <ErrorWrapper>
                <S4>No open chat</S4>    
            </ErrorWrapper>
            }
        </ChatWrapper>
    )
}

const ChatWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${Colors.white};
    border-radius: 25px;
    border: 1px solid ${Colors.lightgray};
    overflow: hidden;
    position: relative;
`

const ErrorWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Window = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
`

const Header = styled.div`
    position: sticky;
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
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    /* border: 1px dashed orange; */
`

const MessagesStreamWrapper = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    /* border: 2px solid pink; */
`


