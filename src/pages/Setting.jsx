import { useState } from "react";
import styled from "styled-components";
import { CONTAINER_WIDTH, HEADER_HEIGHT } from "../utils/layouts";
import Header from "../components/Header";
import { GRAY, BLUE, WHITE } from "../utils/colors";
import { message } from "antd";
import axios from "axios";

const BASE_URL = "https://localhost:8080";

const Setting = () => {
  const role = sessionStorage.getItem("role");
  const [phoneNumber, setPhoneNumber] = useState("");

  if (role !== "admin") {
    return (
      <Root>
        <Header />
        <h3>로그인 후 접근할 수 있습니다.</h3>
      </Root>
    );
  }

  const handleCall = async () => {
    if (!phoneNumber) {
      message.error("전화번호를 입력하세요");
      return;
    }

    // 전화번호를 인코딩하여 전달 +는 URL 에서 공백으로 인색함. 따라서 이를 인코딩하여 전달 서버에서는 자동 디코딩 한다고 함
    const apiUrl = `${BASE_URL}/test/call?to=${encodeURIComponent(
      phoneNumber
    )}`;
    try {
      const response = await axios.get(apiUrl);
      console.log("API 응답:", response.data);
      message.success("전화 발신에 성공했습니다!");
    } catch (error) {
      console.error("API 호출 오류:", error);
      message.error("전화발신 중 오류가 발생했습니다.");
    }
  };

  return (
    <Root>
      <Header />
      <Container>
        <CallTestBox>
          <Title>Call Test</Title>
          <Content>전화번호를 입력하고 Call 버튼을 눌러주세요.</Content>
          <MainContainer>
            <PhoneNumberInput
              placeholder="820000000000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <CallButton onClick={handleCall}>Call</CallButton>
          </MainContainer>
        </CallTestBox>
      </Container>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: ${HEADER_HEIGHT}px;
  background-color: ${GRAY.LIGHT};
`;

const Container = styled.div`
  width: ${CONTAINER_WIDTH}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CallTestBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 350px;
  padding: 24px;
  margin-bottom: 100px;
  background-color: ${WHITE};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 35px;
  font-size: 30px;
  color: ${GRAY.DARK};
`;

const Content = styled.h2`
  margin-bottom: 35px;
  font-size: 15px;
  color: ${GRAY.DARK};
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const PhoneNumberInput = styled.input`
  width: 250px;
  padding: 12px;
  border: 1px solid ${GRAY.DARK};
  border-radius: 8px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: ${BLUE.DEFAULT};
  }
`;

const CallButton = styled.button`
  padding: 12px 24px;
  background-color: ${BLUE.DEFAULT};
  color: ${WHITE};
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${BLUE.DARK};
  }
`;

export default Setting;
