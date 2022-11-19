import styled from "styled-components"
import { Colors } from "../../utitlity/Colors"
import { B3, S3, S4, T3 } from "../../utitlity/TypographyStyles"

export default function YourChatsView(props) {

    function getReceiverEmail(chat) {
        const myUserID = props.myUserID
        if (myUserID === chat.userID1) {
            return chat.userEmail2
        } else {
            return chat.userEmail1
        }
    }
    
    return (
        <BrowserWrapper>
            <TitleWrapper>
                <Title>Your chats:</Title>
            </TitleWrapper>

            <ChatsWrapper>
                {props.accountList.length === 0
                ?
                <Subtitle>You have not started any chats yet.</Subtitle>
                :<div/>}

                {props.accountList.map((chat)=> (
                    <div onClick={() => {
                        props.onAccountSelect(chat)
                    }}>
                        <AccountText>{getReceiverEmail(chat)}</AccountText>
                    </div>
                ))}
            </ChatsWrapper>
        </BrowserWrapper>
    )
}

const BrowserWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${Colors.white};
    border-radius: 25px;
    border: 1px solid ${Colors.lightgray};
    overflow: hidden;
    position: relative;
`

const TitleWrapper = styled.div`
    width: 100%;
    background-color: ${Colors.white};
    position: sticky; 
    top: 0px;
`

const Title = styled(T3)`
    padding: 16px;
`

const Subtitle = styled(S4)`
    padding: 16px;
`
const AccountText = styled(B3)`
    padding: 0px 16px;
`

const ChatsWrapper = styled.div`
    width: 100%;
    top: 50px;
    overflow-x: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: start;
    justify-content: start;
`