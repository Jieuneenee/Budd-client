import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const UserCard = ({
  name,
  age,
  gender,
  riskLevel,
  phoneNumber,
  address,
  contact1,
  contact2,
  userId,
}) => {
  const colors = ["#f8d0d0", "#d0f0f8", "#f8e8d0", "#d0f8d0"];
  const [bgColor, setBgColor] = useState("");

  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/user/${userId}`);
  };

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor);
  }, []);

  return (
    <CardContainer>
      <ProfileImage $bgColor={bgColor}>👤</ProfileImage>
      <UserInfoContainer>
        <UserInfoItem>
          <InfoLabel>{name}</InfoLabel>
          <InfoValue>
            {gender} / {age}세 / {riskLevel}
          </InfoValue>
        </UserInfoItem>
        <UserInfoItem>
          <InfoLabel>전화번호</InfoLabel>
          <InfoValue>{phoneNumber}</InfoValue>
        </UserInfoItem>
        <UserInfoItem>
          <InfoLabel>주소</InfoLabel>
          <InfoValue>{address}</InfoValue>
        </UserInfoItem>
        <UserInfoItem>
          <InfoLabel>보호자 전화번호</InfoLabel>
          <InfoValue>{contact1}</InfoValue>
          <InfoValue>{contact2}</InfoValue>
        </UserInfoItem>
      </UserInfoContainer>
      <ViewDetailsButton onClick={handleViewDetails}>
        View Details
      </ViewDetailsButton>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 30%;
  background-color: ${(props) => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #fff;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  margin-left: 15px;
  margin-right: 20px;
`;

const UserInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoLabel = styled.div`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 3px;
`;

const InfoValue = styled.div`
  font-size: 14px;
  color: #888;
`;

const ViewDetailsButton = styled.button`
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 20px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export default UserCard;
