import styled from "styled-components"
import { B3, T2 } from "../../utitlity/TypographyStyles"
import { Form, Formik } from "formik";
import { InputField1 } from "../../utitlity/Fields";
import { ConfirmButton } from "../../utitlity/Buttons";

export default function OTPStageView(props) {

    let email = props.email
    
    return (
        <Formik
            initialValues={{otp: ""}}
            onSubmit={values=>{
                console.log("submitted otp form")
                console.log(values)
                props.onSubmitAction(values.otp)
            }}
        >
            {props=> (
                <Form noValidate>
                    <CentralBlockWrapper>
                        <T2>Enter your one-time-password</T2>

                        <B3>{"Sent to " + email + ". Please check the spam forlder."}</B3>

                        <InputField1 
                            type="text" 
                            name="otp" 
                            value={props.values.otp} 
                            placeholder="Enter the one-time-password"
                            isValid={true}
                        />

                        <ConfirmButton text={"Continue"} action={props.handleSubmit}/>
                    </CentralBlockWrapper>
                </Form>
            )}
        </Formik>
    )
}

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