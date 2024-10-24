
import React, { useState, useEffect } from "react";
import { FaApple, FaGoogle} from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { Container, SignIn, SignUp, SubContainer, Box, Title, Description, FormContent, FormItens, FormInput, FormButton, Or, RecaptchaDiv } from "../styles/Login";
import UserService from "../services/UsersService";
import SessionService from "../services/SessionService";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Button, Form, Nav } from "react-bootstrap";

export default function Login() {

  const [isExpanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);
  const [nameInsert, setNameInsert ] = useState('');
  const [emailInsert, setEmailInsert ] = useState('');
  const [passwordInsert, setPasswordInsert ] = useState('');
  const [emailLogin, setEmailLogin ] = useState('');
  const [passwordLogin, setPasswordLogin ] = useState('');
  const [confirmPasswordInsert, setConfirmPasswordInsert ] = useState('');
  const [registerCaptchaValue, setRegisterCaptchaValue] = useState(null);
  const [loginCaptchaValue, setLoginCaptchaValue ] = useState(null);
  const navigate = useNavigate();
  const userService = new UserService();
  const sessionService = new SessionService(navigate);

  // Monitora o redimensionamento da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

   

    window.addEventListener('resize', handleResize);

    // Limpeza do evento quando o componente for desmontado
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const registerButton = async () => {
    await userService.insert(nameInsert, emailInsert, passwordInsert, confirmPasswordInsert, registerCaptchaValue);
  }

  const loginButton = async () => {
    await sessionService.firstFactor(emailLogin, passwordLogin, loginCaptchaValue)
  }

  const onChangeREcaptchaLogin = (value) => {
    if(value)
    {
      setLoginCaptchaValue(value);
    }
  }

  const onChangeREcaptcha = (value) => {
    if(value)
    {
      setRegisterCaptchaValue(value);
    }
  }

  const signinORsignup = (event) => {
      const data = event.currentTarget.getAttribute("data");

      if(data === "signin")
      {
        document.getElementById("signin").style.display = "block";
        document.getElementById("signup").style.display = "none";
      }
      else if(data === "signup")
      {
        document.getElementById("signup").style.display = "block";
        document.getElementById("signin").style.display = "none";
      }
  }

  const toggleDiv = () => {
    setExpanded(!isExpanded);
    if(!isExpanded)
    {
      document.getElementById("signin").style.opacity= 0;
      document.getElementById("signup").style.opacity = 1;
    }
    else if(isExpanded)
    {
      document.getElementById("signin").style.opacity= 1;
      document.getElementById("signup").style.opacity = 0;
    }
    console.log("Is Expanded:", isExpanded); // Verifica se o estado está sendo alternado
  };

  const titles = [
    "Entre com a sua Conta",
    "Crie sua Conta"
  ];

  const descriptions = [
    "Você não possí conta? Crie uma conta agora para desfrutar dos benefícios da plataforma.",
    "Você ja possuí uma conta? Entre com a mesma para desfrutar da plataforma."
  ];



  return (
    <>
      <Container>
        <SubContainer>
          <SignIn id="signin">
            <Title>Bem-Vindo de Volta!</Title>
           

            <FormContent>
              <FormItens>
                <strong>Email</strong>
                <Form.Control 
                  type="email" 
                  onChange={(e) => setEmailLogin(e.target.value)} 
                  placeholder="Digite seu E-mail" 
                  required
                />
              </FormItens>

              <FormItens>
                <strong>Senha</strong>
                <Form.Control 
                  type="password" 
                  onChange={(e) => setPasswordLogin(e.target.value)} 
                  placeholder="Digite sua Senha" 
                  required
                />
              </FormItens>
              
              <FormItens>
                 <RecaptchaDiv>
                  <ReCAPTCHA
                    sitekey="6LecUyMqAAAAAHpJk9M57UMddnQ53Ivpl2L-anZk"
                    onChange={onChangeREcaptchaLogin}
                  />
                </RecaptchaDiv>
              </FormItens>
              
              <FormItens>
                <Button
                  variant="success" 
                  type="button"
                  onClick={loginButton}
                > 
                  Entrar
                </Button>
              </FormItens>

              <FormItens>
                  {isMobile && (
                  <Button variant="primary" onClick={signinORsignup} data="signup">
                    Quero Criar Conta
                  </Button>
                )}
              </FormItens>

              <FormItens>
                  <NavLink as={Link} to="/">
                    <Button variant="secondary" className="w-100">
                        Ir para Home
                    </Button>
                  </NavLink>
              </FormItens>

            </FormContent>


          </SignIn>


          <SignUp id="signup">
            <Title>Crie sua Conta para Começar!</Title>
            <FormContent>
              <FormItens>
                <strong>Nome</strong>
                <Form.Control
                  type="text"
                  id="username_insert"
                  placeholder="Digite seu Nome"
                  onChange={(e) => setNameInsert(e.target.value)}
                  required/>
              </FormItens>
              
              <FormItens>
                <strong>Email</strong>
                <Form.Control
                  type="email"
                  id="email_insert"
                  placeholder="Digite seu Email"
                  onChange={(e) => setEmailInsert(e.target.value)}
                  required
                />
              </FormItens>

              <FormItens>
                <strong>Senha</strong>
                <Form.Control
                  type="password"
                  id="password_insert"
                  placeholder="Digite sua Senha"
                  onChange={(e) => setPasswordInsert(e.target.value)}
                  required
                />
              </FormItens>

              <FormItens>
                <strong>Confirme sua Senha</strong>
                <Form.Control
                  type="password"
                  id="confirm_password_insert"
                  placeholder="Digite sua senha novamente"
                  onChange={(e) => setConfirmPasswordInsert(e.target.value)}
                  required
                />
              </FormItens>

              <FormItens >
                <RecaptchaDiv>
                  <ReCAPTCHA
                    sitekey="6LecUyMqAAAAAHpJk9M57UMddnQ53Ivpl2L-anZk"
                    onChange={onChangeREcaptcha}
                  />
                </RecaptchaDiv>
              </FormItens>


              <FormItens>
                <Button variant="success" type="button" onClick={registerButton}>Criar Conta</Button>
              </FormItens>

              <FormItens>
                  <NavLink as={Link} to="/">
                    <Button variant="secondary" className="w-100">
                        Ir para Home
                    </Button>
                  </NavLink>
              </FormItens>

              <FormItens>
              {isMobile && (
                  <Button variant="primary" onClick={signinORsignup} data="signin">
                    Ja Tenho Conta
                  </Button>
                )}
              </FormItens>
            </FormContent>
          </SignUp>
         {true ? (
          <Box key="box" expanded={isExpanded ? true : undefined}>
            
            <Title show={isExpanded.toString()}>
              {isExpanded ?  titles[0] : titles[1]}
            </Title>
            <Description show={isExpanded.toString()}>
              {isExpanded ?  descriptions[1] : descriptions[0]}
            </Description>
            <br></br>
            <FormItens>
              <Button variant="primary" className="w-100" onClick={toggleDiv} type="button">
                {isExpanded ?  "Entrar" : "Cadastrar-Me"}
              </Button>
            </FormItens>
            
          </Box>
        ) : (
          <p>Loading...</p>
        )}
        </SubContainer>
      </Container>
    </>
  );
}
