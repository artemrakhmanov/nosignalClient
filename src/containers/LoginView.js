import styled from "styled-components"
import { Form, Formik } from "formik";
import iconImg from "../assets/icon.png"
import { T2 } from "../utitlity/TypographyStyles";

export default function LoginView() {

    return (
        <div>
            <LogoWrapper>
                <Icon src={iconImg} />
            </LogoWrapper>

            <CentralBlockWrapper>
                <T2>Log in to noSignal</T2>
            </CentralBlockWrapper>
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



