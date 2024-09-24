import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // 기본 스타일을 적용합니다
import { CONTAINER_WIDTH, HEADER_HEIGHT } from "../utils/layouts";
import Header from "../components/Header";
import { GRAY } from "../utils/colors";
import { FaCircle, FaTimes, FaRegCircle } from "react-icons/fa";
import mockData from "../constants/json/user_detail_sample.json";
import { format } from "date-fns";
import { Input, Button } from "antd";
import {
  CheckOutlined,
  QuestionOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Report from '../assets/icons/report.png'

const UserDetailPage = () => {
  const user_detail = mockData[0].user_detail;
  const callData = user_detail.call_data;
  const reportData = mockData[0].month_report;

  // call data의 status에 따른 아이콘 표시
  const renderIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckOutlined color='green' />; // 체크 아이콘, 전화 수신 및 응답
      case "missed":
        return <CloseOutlined />; // X, 전화 미수신
      case "scheduled":
        return <FaCircle color='red' />; // 빨간색 원, 전화 예정일
      case "additional":
        return <FaCircle color='green' />; // 초록색 원, 추가 전화 예정일
      case "noResponse":
        return <QuestionOutlined color='gray' />; // ?, 전화 수신 및 미응답
      default:
        return null;
    }
  };

  const getCallStatus = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const call = callData.find((call) => call.scheduled_date === formattedDate);
    return call ? renderIcon(call.status) : null;
  };

  const [phoneNumber, setPhoneNumber] = useState(user_detail.phone_number);
  const [address, setAddress] = useState(user_detail.address);
  const [guardianContact, setGuardianContact] = useState(
    user_detail.contact1 || ""
  );

  const handleSave = () => {
    console.log("Updated phone number:", phoneNumber);
    console.log("Updated address:", address);
    console.log("Updated guardian contact:", guardianContact);
  };

  return (
    <Root>
      <Header />
      <Container>
        <MainContainer>
          <UserInfo>
            <h2>
              {user_detail.name} ({user_detail.age}세 / {user_detail.gender})
            </h2>
            <InfoRow>
              <EditableRow>
                <Label>전화번호</Label>
                <div style={{ display: "flex" }}>
                  <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <Button icon={<CheckOutlined />} onClick={handleSave} />
                </div>
              </EditableRow>

              <EditableRow>
                <Label>주소</Label>
                <div style={{ display: "flex" }}>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Button icon={<CheckOutlined />} onClick={handleSave} />
                </div>
              </EditableRow>

              <EditableRow>
                <Label>보호자 연락처</Label>
                <div style={{ display: "flex" }}>
                  <Input
                    value={guardianContact}
                    onChange={(e) => setGuardianContact(e.target.value)}
                  />
                  <Button icon={<CheckOutlined />} onClick={handleSave} />
                </div>
              </EditableRow>
            </InfoRow>
          </UserInfo>

          <CalendarWrapper>
            <Calendar
              tileContent={({ date }) => (
                <IconContainer>{getCallStatus(date)}</IconContainer>
              )}
            />
            <StatusContainer>
              <div>
                <StatusLine>
                  <FaCircle color='red' />: 전화 예정일
                </StatusLine>
                <StatusLine>
                  <FaCircle color='green' />: 추가 전화 예정일
                </StatusLine>
                <StatusLine>
                  <CheckOutlined color='green' />: 전화 수신 및 응답
                </StatusLine>
                <StatusLine>
                  <QuestionOutlined color='gray' />: 전화 수신 및 미응답
                </StatusLine>
                <StatusLine>
                  <CloseOutlined />: 전화 미수신
                </StatusLine>
              </div>
              <StatusInfo>
                통화 일정은 분기별로 업데이트 됩니다. 통화가 완료되면 해당일의
                상태가 업데이트 됩니다.
              </StatusInfo>
            </StatusContainer>
          </CalendarWrapper>
        </MainContainer>
        <Reportcontainer>
          <h2>{reportData.month}월 종합 리포트</h2>
          <h3>식사 상태</h3>
          {reportData.meal}
          <h3>건강 상태</h3>
          {reportData.health}
          <h3>정서적 상태</h3>
          {reportData.mental}
          <h3>종합 평가</h3>
          {reportData.sum}
        </Reportcontainer>
      </Container>
    </Root>
  );
};

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${HEADER_HEIGHT}px;
  position: relative;
  background-color: ${GRAY.LIGHT};
`;

const Container = styled.div`
  width: ${CONTAINER_WIDTH}px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
`;

const CalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const StatusContainer = styled.div`
  width: 240px;
  height: 100%;
  border: 1px solid ${GRAY.DEFAULT};
  border-radius: 10px;
  padding: 20px;
  justify-content: space-between;
  margin-left: 30px;
`;

const StatusLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const StatusInfo = styled.div`
  margin-top: 40px;
  color: ${GRAY.DARK};
`;
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const EditableRow = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const Reportcontainer = styled.div`
  margin-left: 30px;
  width: 70%;
`;

const ReportLineContainer = styled.div`
  display: flex;
  flex-direction: row
`
const ReportIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export default UserDetailPage;
