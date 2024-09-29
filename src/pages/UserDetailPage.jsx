import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CONTAINER_WIDTH, HEADER_HEIGHT } from "../utils/layouts";
import Header from "../components/Header";
import { GRAY } from "../utils/colors";
import { FaCircle } from "react-icons/fa";
import { format } from "date-fns";
import { Button, Modal, Input, Radio, message, Table } from "antd";
import {
  CheckOutlined,
  QuestionOutlined,
  CloseOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../env";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserDetailPage = () => {
  const UserDetailParams = useParams();
  const userId = UserDetailParams.userId;
  const navigate = useNavigate();

  const [userData, setUserData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [guardianContact1, setGuardianContact1] = useState("");
  const [guardianContact2, setGuardianContact2] = useState("");
  const [record, setRecord] = useState(false);

  //GET: userDetail
  useEffect(() => {
    const getUserDetailData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/detail/${userId}`);
        console.log(response);
        setUserData(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    getUserDetailData();
  }, [userId]);

  useEffect(() => {
    console.log(userData);
    if (userData) {
      const user_detail = userData.user;
      const callData = userData.callRecords;
      const reportData = userData.reports;

      setName(user_detail.name);
      setAge(user_detail.age);
      setGender(user_detail.gender);
      setPhoneNumber(user_detail.phoneNumber);
      setAddress(user_detail.address);
      setGuardianContact1(user_detail.contact1 || "");
      setGuardianContact2(user_detail.contact2 || "");
    }
  }, [userData]);

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

  const getCallStatus = (date, userData) => {
    if (!userData || !userData.callRecords) {
      return <EmptyIcon />; //데이터 없으면 빈 아이콘 렌더링
    }

    const formattedDate = format(date, "yyyy-MM-dd");
    const call = userData.callRecords.find(
      (call) => call.scheduledDate === formattedDate
    );

    return call ? renderIcon(call.status) : <EmptyIcon />;
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleDeleteOk = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/detail/${userId}`);
      message.success("사용자가 삭제되었습니다.");
      navigate("/userlist"); // 삭제 후 userlist 페이지로 이동
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("사용자 삭제에 실패했습니다.");
    }

    setIsDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const handleOk = async () => {
    setIsModalVisible(false);

    const updatedUserData = {
      name,
      age,
      gender,
      phoneNumber,
      address,
      contact1: guardianContact1,
      contact2: guardianContact2,
      riskLevel: userData?.user?.riskLevel || "중",
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/api/detail/${userId}`,
        updatedUserData
      );
      console.log("Updated details:", response.data);

      setUserData((prevData) => ({
        ...prevData,
        user: {
          ...prevData.user,
          ...updatedUserData,
        },
      }));
      message.success("수정되었습니다.");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const toggleRecord = () => {
    setRecord((prevRecord) => !prevRecord);
  };

  return (
    <Root>
      <Header />
      <Container>
        <MainContainer>
          <UserInfo>
            <h2>
              {userData?.user?.name} ({userData?.user?.age}세 /{" "}
              {userData?.user?.gender})
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
                  <Value>{userData?.user?.phoneNumber}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>주소:</Label>
                  <Value>{userData?.user?.address}</Value>
                </InfoItem>
              </InfoRowContainer>
              <InfoItem>
                <Label>보호자 연락처:</Label>
                <Value>
                  {userData?.user?.contact1} / {userData?.user?.contact2}
                </Value>
              </InfoItem>
            </InfoRow>
          </UserInfo>

          <CalendarWrapper>
            <Calendar
              tileContent={({ date }) => (
                <IconContainer>{getCallStatus(date, userData)}</IconContainer>
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

          <ReportContainer>
            <h2>
              {userData && userData.reports.length > 0
                ? `${userData.reports[0].month.slice(5, 7)}월 종합 리포트`
                : ""}
            </h2>

            <h3>식사 상태</h3>
            <p>
              {userData && userData.reports.length > 0
                ? userData.reports[0].mealStatus
                : "데이터 없음"}
            </p>

            <h3>건강 상태</h3>
            <p>
              {userData && userData.reports.length > 0
                ? userData.reports[0].healthStatus
                : "데이터 없음"}
            </p>

            <h3>정서적 상태</h3>
            <p>
              {userData && userData.reports.length > 0
                ? userData.reports[0].emotionStatus
                : "데이터 없음"}
            </p>

            <h3>종합 평가</h3>
            <p>
              {userData && userData.reports.length > 0
                ? userData.reports[0].evaluation
                : "데이터 없음"}
            </p>

            <h3>결론</h3>
            <p>
              {userData && userData.reports.length > 0
                ? userData.reports[0].conclusion
                : "데이터 없음"}
            </p>
          </ReportContainer>
          <RecordContainer>
            <h2>기록</h2>
            <Button onClick={toggleRecord}>
              {record ? "기록 숨기기" : "기록 보기"}
            </Button>
            {record && (
              <RecordDetails>
                {userData?.responses && userData.responses.length > 0 ? (
                  <Table
                    dataSource={userData.responses}
                    columns={[
                      {
                        title: "날짜",
                        dataIndex: "date",
                        key: "date",
                      },
                      {
                        title: "식사 상태",
                        dataIndex: "meal",
                        key: "meal",
                        render: (meal) => (meal ? "O" : "X"),
                      },
                      {
                        title: "질병 상태",
                        dataIndex: "disease",
                        key: "disease",
                        render: (disease) => (disease ? "O" : "X"),
                      },
                      {
                        title: "약 상태",
                        dataIndex: "medicine",
                        key: "medicine",
                        render: (medicine) => (medicine ? "O" : "X"),
                      },
                      {
                        title: "정서 상태",
                        dataIndex: "mood",
                        key: "mood",
                        render: (mood) => (mood ? "O" : "X"),
                      },
                    ]}
                    rowKey="id"
                  />
                ) : (
                  <p>기록이 없습니다.</p>
                )}
              </RecordDetails>
            )}
          </RecordContainer>
        </MainContainer>
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
          <Radio value="남">남성</Radio>
          <Radio value="여">여성</Radio>
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
          placeholder="보호자 연락처1"
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
  align-items: center;
  padding: 30px 90px;
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
  height: 100%;
`;

const RecordContainer = styled.div`
  justify-content: start;
  align-items: start;
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

const EmptyIcon = styled.div`
  width: 13.33px;
  height: 13.33px;
`;

const RecordDetails = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

export default UserDetailPage;
