import { Field } from "formik";
import styled from "styled-components";
import { Colors } from "./Colors";

export const InputField1 = styled(Field)`
    width: 400px;
    height: 55px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background-color: white;
    border: 1px solid ${props => props.isValid ? Colors.gray : "red"};
    border-radius: 8px;
    font-size: 18px;
    font-weight: 400;
`

export const InputField2 = styled(Field)`
    width: 400px;
    height: 400px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    background-color: white;
    border: 1px solid ${props => props.isValid ? Colors.gray : "red"};
    border-radius: 8px;
    font-size: 18px;
    font-weight: 400;

    > * {
        margin-left: 10px;
    }
`

export const TextAreaStyle = styled.textarea`
    resize: none;
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 400;
`
