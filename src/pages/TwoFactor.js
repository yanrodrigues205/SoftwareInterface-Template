import React, {useState, useRef, useEffect} from "react";
import { Container, SubContainer, Form, OTPInput, Title, InputContainer, Description, ButtonForm, TimerContainer, TimerValue } from "../styles/TwoFactor";
import {FaClock} from "react-icons/fa"
import Timer from "../components/Timer";
import SessionService from "../services/SessionService";
import { useNavigate } from "react-router-dom";

 
export default function TwoFactor()
{
    const [code, setCode ] = useState(Array(6).fill("")); //array de valores
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const sessionService = new SessionService(navigate);

    useEffect(() => {
        if(inputRefs.current[0])
        {
            inputRefs.current[0].focus();
        }
    }, []);

    const valueChange = (e, index) => {
        const value = e.target.value;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if(index < 5)
        {
            inputRefs.current[index + 1].focus();
        }
    };

    const clickKeyDown = (e, index ) => {
        if(e.key === "Backspace")
        {
            if(code[index] === "")
            {
                if(index > 0)
                {
                    inputRefs.current[index - 1].focus();
                }
            }
            else
            {
                const newCode = [...code];
                newCode[index] = "";
                setCode(newCode)
            }
        }

        if(e.key === "Enter")
        {
            sendButton();
        }   
    };

    const sendButton = async () => {
        const otp = code.join("");
        await sessionService.secondFactor(otp);
    }


    return (
       <Container>
            <SubContainer>
                <Title>Verification Code</Title><br/>
                <Description>Two-factor authentication 2FA enhances security by requiring two forms of verification—typically something the user knows password and something they possess a code or device. This extra layer reduces the risk of unauthorized access, even if login credentials are compromised. It ensures stronger protection for sensitive data.</Description><br/>
                <Form>
                    <TimerContainer>
                        <FaClock/>
                        <TimerValue><Timer targetDate={localStorage.getItem("expiry_otp")}></Timer></TimerValue>
                    </TimerContainer>
                    <InputContainer>
                        {code.map((value, index) => {
                            
                            return (
                                <OTPInput
                                    key={index}
                                    type="text"
                                    value={value}
                                    maxLength={1}
                                    onChange={(e) => valueChange(e, index)}
                                    onKeyDown={(e) => clickKeyDown(e, index)}
                                    ref={(element) => (inputRefs.current[index] = element)}
                                />
                            );
                        })}
                    </InputContainer>
                    <ButtonForm type="button">
                        Send
                    </ButtonForm>
                </Form>
            </SubContainer>
       </Container>
    );
}