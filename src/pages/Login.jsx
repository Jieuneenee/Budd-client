import React, { useState } from "react";
import styled from "styled-components";
import UserInput from "../components/UserInput";
import LogoImg from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// CORS 설정을 위해 Axios에 withCredentials 설정 추가
axios.defaults.withCredentials = true;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 추가
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        navigate("/userlist");
        console.log("로그인 성공:", response.data);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage("잘못된 이메일 또는 비밀번호를 입력하셨습니다.");
        // console.error("로그인 실패:", error.response.data);
      } else if (error.request) {
        setErrorMessage("네트워크 문제입니다. 다시 시도해주세요.");
        // console.error("응답 없음: 네트워크 문제일 수 있습니다.", error.request);
      } else {
        setErrorMessage("로그인 요청 실패: " + error.message);
        // console.error("로그인 요청 실패:", error.message);
      }
    }
  };
  return (
    <LoginContainer>
      <FormContainer onSubmit={handleLogin}>
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
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}{" "}
        {/* 오류 메시지 출력 */}
        <StyledButton type="submit">로그인</StyledButton>
      </FormContainer>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.form`
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

const ErrorMessage = styled.p`
  color: red;
  margin: 10px 0;
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

export default Login;
