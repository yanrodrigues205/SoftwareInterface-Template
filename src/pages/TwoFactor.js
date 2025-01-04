import React, {useState, useRef, useEffect} from "react";
import { Button } from "react-bootstrap";
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
                <Title>Verificação por Código 🔒</Title><br/>
                <Description><i>A autenticação de Dois Fatores aumenta a segurança ao exigir duas formas de verificação, normalmente algo que o usuário conhece a senha e algo que ele possui um código ou dispositivo. Essa camada extra reduz o risco de acesso não autorizado, mesmo se as credenciais de login estiverem comprometidas. Garante uma proteção mais forte para dados confidenciais.</i></Description><br/>
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
                    <Button variant="success" type="button">
                        Enviar
                    </Button>
                </Form>
            </SubContainer>
       </Container>
    );
}