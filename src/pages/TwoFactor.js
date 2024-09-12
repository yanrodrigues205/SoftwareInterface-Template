import React from "react";
import { Container, SubContainer, Form, OTPInput, Title, InputContainer, Description, ButtonForm, Timer, TimerValue } from "../styles/TwoFactor";
import {FaClock} from "react-icons/fa"

export default function TwoFactor()
{
    return (
       <Container>
            <SubContainer>
                <Title>Verification Code</Title><br/>
                <Description>Two-factor authentication 2FA enhances security by requiring two forms of verification—typically something the user knows password and something they possess a code or device. This extra layer reduces the risk of unauthorized access, even if login credentials are compromised. It ensures stronger protection for sensitive data.</Description><br/>
                <Form>
                    <Timer>
                        <FaClock/>
                        <TimerValue>09:59</TimerValue>
                    </Timer>
                    <InputContainer>
                        <OTPInput type="text" id="otp-1"/>
                        <OTPInput type="text" id="otp-2"/>
                        <OTPInput type="text" id="otp-3"/>
                        <OTPInput type="text" id="otp-4"/>
                        <OTPInput type="text" id="otp-5"/>
                        <OTPInput type="text" id="otp-6"/>
                    </InputContainer>
                    <ButtonForm type="button">
                        Send
                    </ButtonForm>
                </Form>
            </SubContainer>
       </Container>
    );
}