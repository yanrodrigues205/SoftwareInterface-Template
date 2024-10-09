
import React, { useState, useEffect } from "react";
import { FaApple, FaGoogle} from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { Container, SignIn, SignUp, SubContainer, Box, Title, Description, FormContent, FormItens, FormInput, FormButton, Or, RecaptchaDiv } from "../styles/Login";
import UserService from "../services/UsersService";
import SessionService from "../services/SessionService";
import { useNavigate } from "react-router-dom";

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
    "Sign In to Your Account",
    "Create Your Account"
  ];

  const descriptions = [
    "Don't have an account? Sign up now and start enjoying all the benefits of our platform.",
    "Already have an account? Log in here to continue where you left off."
  ];



  return (
    <>
      <Container>
        <SubContainer>
          <SignIn id="signin">
            <Title>Welcome Back!</Title>
            {isMobile && (
              <button onClick={signinORsignup} data="signup">
                Sign Up
              </button>
            )}

            <FormContent>
              <FormItens>
                <FormButton type="button"><FaGoogle/>Sign In with Google</FormButton>
              </FormItens>

              <FormItens>
                <FormButton type="button"><FaApple/>  Sign In with Apple</FormButton>
              </FormItens>
              <br/>
              <hr/>
              <Or>Or With Email</Or>
              <FormItens>
                <strong>Email</strong>
                <FormInput 
                  type="email" 
                  onChange={(e) => setEmailLogin(e.target.value)} 
                  placeholder="Enter your email" 
                  required
                />
              </FormItens>

              <FormItens>
                <strong>Password</strong>
                <FormInput 
                  type="password" 
                  onChange={(e) => setPasswordLogin(e.target.value)} 
                  placeholder="Enter your password" 
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
                <FormButton 
                  type="button"
                  onClick={loginButton}
                > 
                  Log In
                </FormButton>
              </FormItens>

            </FormContent>


          </SignIn>


          <SignUp id="signup">
            <Title>Join Us and Get Started!</Title>
            {isMobile && (
              <button onClick={signinORsignup} data="signin">
                Sign In
              </button>
            )}
            <br/>
            <FormContent>
              <FormItens>
                <FormButton type="button"><FaGoogle/>Sign Up with Google</FormButton>
              </FormItens>

              <FormItens>
                <FormButton type="button"><FaApple/>  Sign Up with Apple</FormButton>
              </FormItens>
              <br/>
              <hr/>
              <Or>Or With Email</Or>
              <FormItens>
                <strong>Name</strong>
                <FormInput
                  type="text"
                  id="username_insert"
                  placeholder="Enter your name"
                  onChange={(e) => setNameInsert(e.target.value)}
                  required/>
              </FormItens>
              
              <FormItens>
                <strong>Email</strong>
                <FormInput
                  type="email"
                  id="email_insert"
                  placeholder="Enter your email"
                  onChange={(e) => setEmailInsert(e.target.value)}
                  required
                />
              </FormItens>

              <FormItens>
                <strong>Password</strong>
                <FormInput
                  type="password"
                  id="password_insert"
                  placeholder="Enter your password"
                  onChange={(e) => setPasswordInsert(e.target.value)}
                  required
                />
              </FormItens>

              <FormItens>
                <strong>Confirm Password</strong>
                <FormInput
                  type="password"
                  id="confirm_password_insert"
                  placeholder="Confirm your password"
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
                <FormButton type="button" onClick={registerButton}>Create Account</FormButton>
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
            <button onClick={toggleDiv} type="button">
              {isExpanded ?  "Sign In" : "Sign Up"}
            </button>
          </Box>
        ) : (
          <p>Loading...</p>
        )}
        </SubContainer>
      </Container>
    </>
  );
}
