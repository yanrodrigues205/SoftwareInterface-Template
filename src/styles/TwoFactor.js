import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    max-width: 1200px;
    flex-direction: column;
`;

export const SubContainer = styled.div`
    display: flex;
    max-width: 500px;
    height: 100vh;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.span`
    display: flex;
    font-size: 28px;
    padding: 10px;
`;

export const Description = styled.span`
    font-size: 18px;
    padding: 10px;
`;

export const Form = styled.span`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 10px;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
`;

export const OTPInput = styled.input`
    font-size: 30px;
    max-width: 50px;
    padding: 5px;
`;

export const ButtonForm = styled.button`
    font-size: 15px;
    padding: 10px;
`;

export const Timer = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    align-items: center;
    gap: 15px;
    margin: 0 auto;
`;

export const TimerValue = styled.strong`
    font-size: 20px;
`;
