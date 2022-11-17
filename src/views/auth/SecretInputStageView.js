import styled from "styled-components"
import { B1, B3, T2 } from "../../utitlity/TypographyStyles"
import { Formik, Form, Field } from "formik";
import { InputField2, TextAreaStyle } from "../../utitlity/Fields";
import { ConfirmButton } from "../../utitlity/Buttons";

export default function SecretInputStageView(props) {
    
    return (
        <Formik
            initialValues={{secretPhrase: ""}}
            onSubmit={values=>{
                console.log("submitted secret form")
                console.log(values)
                props.onSubmitAction(values.secretPhrase)
            }}
        >
            {props=> (
                <Form noValidate>
                    <CentralBlockWrapper>
                        <T2>Enter your secret phrase</T2>

                        <B3>This secret is used to encrypt your messages. Losing it or reseting it will lead to the loss of previous chats.</B3>

                        <InputField2
                            type="text" 
                            as={TextAreaStyle}
                            rows="4"
                            name="secretPhrase" 
                            value={props.values.secretPhrase} 
                            placeholder="Type in your secret phrase" 
                            isValid={true}
                            onChange={(e) => {
                                props.setFieldValue("secretPhrase", e.target.value)
                            }}
                            style={{width: "60%", height: "100px"}}
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