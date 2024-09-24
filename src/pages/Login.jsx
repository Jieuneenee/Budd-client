import React, { useState } from "react";
import styled from "styled-components";
import UserInput from "../components/UserInput";
import LogoImg from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80vh;
  width: 520px;
`;

const Logo = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
  color: #4338ca;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 10px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: black;
  font-size: 14px;
`;

const SubText = styled.p`
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 5px;
  background-color: #4763e4;

  &:active {
    background-color: #3b52bb;
  }
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    navigate("/userlist");
  };

  return (
    <LoginContainer>
      <FormContainer>
        <Logo>
          <img src={LogoImg} alt="Logo" />
          Budd.
        </Logo>
        <Label htmlFor="email">ID</Label>
        <UserInput
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={handleEmailChange}
        />
        <Label htmlFor="password">Password</Label>
        <UserInput
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={handlePassChange}
        />
        <StyledButton onClick={handleLogin}>로그인</StyledButton>
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;
