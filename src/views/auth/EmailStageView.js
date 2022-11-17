import styled from "styled-components"
import { T2 } from "../../utitlity/TypographyStyles"
import { Form, Formik } from "formik";
import { InputField1 } from "../../utitlity/Fields";
import { ConfirmButton } from "../../utitlity/Buttons";

export default function EmailStageView(props) {
    
    return (
        <Formik
            initialValues={{email: ""}}
            onSubmit={values=>{
                console.log("submitted email form")
                console.log(values)
                props.onSubmitAction(values.email)
            }}
        >
            {props=> (
                <Form noValidate>
                    <CentralBlockWrapper>
                        <T2>Log in to noSignal</T2>

                        <InputField1 
                            type="email" 
                            name="email" 
                            value={props.values.email} 
                            placeholder="Enter your email"
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