import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CONTAINER_WIDTH, HEADER_HEIGHT } from "../utils/layouts";
import Header from "../components/Header";
import { GRAY } from "../utils/colors";
import { FaCircle } from "react-icons/fa";
import mockData from "../constants/json/user_detail_sample.json";
import { format } from "date-fns";
import { Button, Modal, Input, Radio } from "antd";
import {
  CheckOutlined,
  QuestionOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const UserDetailPage = () => {
  const user_detail = mockData[0].user_detail;
  const callData = user_detail.call_data;
  const reportData = mockData[0].month_report;

  const renderIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckOutlined color="green" />;
      case "missed":
        return <CloseOutlined />;
      case "scheduled":
        return <FaCircle color="red" />;
      case "additional":
        return <FaCircle color="green" />;
      case "noResponse":
        return <QuestionOutlined color="gray" />;
      default:
        return null;
    }
  };

  const getCallStatus = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const call = callData.find((call) => call.scheduled_date === formattedDate);
    return call ? renderIcon(call.status) : null;
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [name, setName] = useState(user_detail.name);
  const [age, setAge] = useState(user_detail.age);
  const [gender, setGender] = useState(user_detail.gender);
  const [phoneNumber, setPhoneNumber] = useState(user_detail.phone_number);
  const [address, setAddress] = useState(user_detail.address);
  const [guardianContact1, setGuardianContact1] = useState(
    user_detail.contact1 || ""
  );
  const [guardianContact2, setGuardianContact2] = useState(
    user_detail.contact2 || ""
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log("Updated details:", {
      name,
      age,
      gender,
      phoneNumber,
      address,
      guardianContact1,
      guardianContact2,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteOk = () => {
    console.log("User deleted");
    setIsDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <Root>
      <Header />
      <Container>
        <MainContainer>
          <UserInfo>
            <h2>
              {name} ({age}세 / {gender})
              <Button
                icon={<EditOutlined />}
                onClick={showModal}
                style={{ marginLeft: "10px" }}
              />
              <Button
                icon={<DeleteOutlined />}
                onClick={showDeleteModal}
                style={{ marginLeft: "10px" }}
              />
            </h2>
            <InfoRow>
              <InfoRowContainer>
                <InfoItem>
                  <Label>전화번호:</Label>
                  <Value>{phoneNumber}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>주소:</Label>
                  <Value>{address}</Value>
                </InfoItem>
              </InfoRowContainer>
              <InfoItem>
                <Label>보호자 연락처:</Label>
                <Value>
                  {guardianContact1} / {guardianContact2}
                </Value>
              </InfoItem>
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
                  <FaCircle color="red" />: 전화 예정일
                </StatusLine>
                <StatusLine>
                  <FaCircle color="green" />: 추가 전화 예정일
                </StatusLine>
                <StatusLine>
                  <CheckOutlined color="green" />: 전화 수신 및 응답
                </StatusLine>
                <StatusLine>
                  <QuestionOutlined color="gray" />: 전화 수신 및 미응답
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

        <ReportContainer>
          <h2>{reportData.month}월 종합 리포트</h2>
          <h3>식사 상태</h3>
          {reportData.meal}
          <h3>건강 상태</h3>
          {reportData.health}
          <h3>정서적 상태</h3>
          {reportData.mental}
          <h3>종합 평가</h3>
          {reportData.sum}
        </ReportContainer>
      </Container>

      <ModalContainer
        title="사용자 정보 수정"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Label>이름</Label>
        <ModalInput
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label>나이</Label>
        <ModalInput
          placeholder="나이"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <Label>성별</Label>
        <StyledRadioGroup
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        >
          <Radio value="남성">남성</Radio>
          <Radio value="여성">여성</Radio>
        </StyledRadioGroup>
        <Label>전화번호</Label>
        <ModalInput
          placeholder="전화번호"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Label>주소</Label>
        <ModalInput
          placeholder="주소"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Label>보호자 연락처1</Label>
        <ModalInput
          placeholder="보호자 연락처2"
          value={guardianContact1}
          onChange={(e) => setGuardianContact1(e.target.value)}
        />
        <Label>보호자 연락처2</Label>
        <ModalInput
          placeholder="보호자 연락처2"
          value={guardianContact2}
          onChange={(e) => setGuardianContact2(e.target.value)}
        />
      </ModalContainer>

      <Modal
        title="사용자 삭제"
        open={isDeleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>정말로 사용자를 삭제하시겠습니까?</p>
      </Modal>
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
  padding-bottom: 30px;
`;

const Container = styled.div`
  width: ${CONTAINER_WIDTH}px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  margin-top: ${HEADER_HEIGHT};
  border-radius: 10px;
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
  width: 220px;
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
  flex-direction: column;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const Value = styled.div``;

const ReportContainer = styled.div`
  justify-content: start;
  align-items: start;
  margin-left: 40px;
  margin-bottom: 20px;
  height: 100%;
`;

const ModalInput = styled(Input)`
  margin-bottom: 10px;
`;

const InfoRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 10px;
`;

const ModalContainer = styled(Modal)`
  .ant-modal-body {
    padding: 10px;
    gap: 20px;
  }
`;
const StyledRadioGroup = styled(Radio.Group)`
  margin-bottom: 10px;
`;

export default UserDetailPage;
