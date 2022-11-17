import styled from "styled-components";
import { Colors } from "./Colors";
import { S4 } from "./TypographyStyles";

export function ConfirmButton(props) {
    let btnText = props.text
    let action = props.action

    return(
        <CapsuleWrapper onClick={() => action()}>
            <ButtonText>{btnText}</ButtonText>
        </CapsuleWrapper>
    )
}

const CapsuleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 40px;
    align-items: center;
    justify-content: start;
    background-color: ${Colors.green};

    border-radius: 25px;
    
    -webkit-user-select: none;  
    -moz-user-select: none;    
    -ms-user-select: none;      
    user-select: none;

    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`

const ButtonText = styled(S4)`
    color: ${Colors.black};
    padding: 0px 16px;
`