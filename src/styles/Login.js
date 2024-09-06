import styled, {keyframes, css} from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;


export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  background: red;
  padding: 20px;
`;

export const SubContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px;
  @media(max-width: 800px)
  {
    flex-direction: row;
    height: 200vh;
    display: block;
  }
`;

export const SignIn = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  background: white;
  flex-direction: column;
  float: left;
  z-index: 1; /* Coloca essa div abaixo da azul */
  justify-content: center;
  transition: 1s ease-in-out;
  @media(max-width: 800px)
  {
    width: 100%;
    height: 100%;
  }
`; //LEFT

export const SignUp = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  background: white;
  flex-direction: column;
  float: left;
  transition: 1s ease-in-out;
  z-index: 1; /* Coloca essa div abaixo da azul */
  justify-content: center;
  @media(max-width: 800px)
  {
    width: 100%;
    height: 100%;
    display: none;
  }
`; //RIGHT

export const Box = styled.div`
  position: absolute;
  left: ${(props) => (props.expanded ? "calc(0% + 20px)" : "50%")};
  transition: left 0.8s ease-in-out; /* Transição apenas da propriedade 'left' */
  width: calc(50% - 20px);
  height: calc(100% - 40px); 
  background: white;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media(max-width: 800px)
  {
    position: relative;
    z-index: 0;
    left: 0;
    display: none;
  }
`;

export const Title = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 30px;
  padding: 20px;
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
  animation: ${props => props.show ? css`${fadeIn} 1.0s` : css`${fadeOut} 1.0s`};
`;

export const Description = styled.span`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 22px;
  max-width: 450px;
  margin: 0 auto;
  padding: 20px;
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
  animation: ${props => props.show ? css`${fadeIn} 1.0s` : css`${fadeOut} 1.0s`};

  
`;


export const FormContent = styled.form`
  display: flex;
  width: 100%;
  padding: 20px;
  flex-direction: column;
  gap: 15px;
  padding: 5px;
  max-width: 450px;
  margin: 0 auto;
`;

export const FormItens = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const FormInput = styled.input`
  font-size: 15px;
  padding: 8px;
  background: none;
  border: 2px solid gray;
  border-radius: 5px;
`

export const FormButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 15px;
  padding: 8px;
  align-items: center;
  gap: 10px;
  & > svg{
    font-size: 18px;
  }
`;

export const Or = styled.span`
  display: flex;
  background: white;
  width: 100px;
  margin: 0 auto;
  position: relative;
  top: -25px;
  justify-content: center;
  color: gray;
`;

export const RecaptchaDiv = styled.div`
  margin: 0 auto;
`;