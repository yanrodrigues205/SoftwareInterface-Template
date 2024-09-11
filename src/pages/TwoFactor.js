import React from "react";
import { Container } from "../styles/TwoFactor";

export default function TwoFactor()
{
    return (
       <Container>
            <div>
                <span>Verificação Dois Fatores</span>
                <span>Two-factor authentication 2FA enhances security by requiring two forms of verification—typically something the user knows password and something they possess a code or device. This extra layer reduces the risk of unauthorized access, even if login credentials are compromised. It ensures stronger protection for sensitive data.</span>
                <div>
                    <input type="text" id="otp-1"/>
                    <input type="text" id="otp-2"/>
                    <input type="text" id="otp-3"/>
                    <input type="text" id="otp-4"/>
                    <input type="text" id="otp-5"/>
                    <input type="text" id="otp-6"/>
                </div>
            </div>
       </Container>
    );
}