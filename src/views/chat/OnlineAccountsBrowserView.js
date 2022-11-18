import styled from "styled-components"
import { Colors } from "../../utitlity/Colors"
import { B3, S3, S4, T3 } from "../../utitlity/TypographyStyles"

export default function OnlineAccountsBrowserView(props) {
    
    return (
        <BrowserWrapper>
            <TitleWrapper>
                <Title>Available Users:</Title>
            </TitleWrapper>

            <ChatsWrapper>
                {props.accountList.length === 0
                ?
                <Subtitle>The application does not have any users yet.</Subtitle>
                :<div/>}

                {props.accountList.map((account)=> (
                    <div onClick={() => {
                        console.log("on account select browser", account)
                        props.onAccountSelect(account)
                    }}>
                        <AccountText>{account.email}</AccountText>
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

const ChatsWrapper = styled.div`
    width: 100%;
    top: 50px;
    overflow-x: scroll;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: start;
    justify-content: start;
`

const AccountText = styled(B3)`
    padding: 0px 16px;
`