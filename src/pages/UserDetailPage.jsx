import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css'; // 기본 스타일을 적용합니다
import { CONTAINER_WIDTH, HEADER_HEIGHT } from "../utils/layouts";
import Header from "../components/Header";
import { GRAY } from "../utils/colors";
import { FaCircle, FaTimes, FaRegCircle } from "react-icons/fa";
import mockData from "../constants/json/user_detail_sample.json";
import { format } from "date-fns";
import { Input, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const UserDetailPage = () => {
  const user_detail = mockData[0].user_detail;
  const callData = user_detail.call_data;

  // call data의 status에 따른 아이콘 표시
  const renderIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCircle color='green' />; // O
      case "missed":
        return <FaTimes color='red' />; // X
      case "scheduled":
      case "additional":
        return <FaRegCircle color='orange' />; // △
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
                <IconContainer>
                  {getCallStatus(date)}
                </IconContainer>
              )}
            />
          </CalendarWrapper>
        </MainContainer>
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
  max-width: 600px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const EditableRow = styled.div`
  margin-right: 20px;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

export default UserDetailPage;
