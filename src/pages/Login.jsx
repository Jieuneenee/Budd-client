// Login.jsx
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import UserInput from "../components/UserInput";
import LogoImg from "../assets/images/logo.png";

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
  margin-bottom: px;
  color: #4338CA;
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <LoginContainer>
      <FormContainer>
        <Logo>
          <img src={LogoImg} alt="Logo" />
          Butt.
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
        <Button
          activeColor="#3b52bb"
          bgColor="#4763E4"
          onClick={handleLogin}
          title="로그인"
        />
        <Button
          activeColor="#b9b9b9"
          bgColor="#d8d8d8"
          onClick={handleLogin}
          title="계정 추가"
        />
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;
