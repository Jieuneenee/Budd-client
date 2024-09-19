import styled from "styled-components";
import UserInput from "./UserInput";
import { useState } from "react";
import { GRAY, BLUE } from "../utils/colors";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 20px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background-color: ${BLUE.DEFAULT};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${BLUE.LIGHT};
  }
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
  color: black;
  font-size: 14px;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: ${BLUE.DARK};
`;

const RadioGroup = styled.div`
  display: flex; /* 가로 정렬을 위한 Flexbox */
  gap: 20px; /* 라디오 버튼 간 간격 */
  margin-bottom: 10px;
`;

const RadioItem = styled.div`
  display: flex; /* 라디오 버튼과 라벨을 가로로 배치 */
  align-items: center; /* 라디오 버튼과 라벨의 수직 정렬 */
  gap: 8px;
  vertical-align: middle;
`;
const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  background-color: ${({ bgColor }) =>
    bgColor || BLUE.DEFAULT}; /* 기본 색상 설정 */

  &:active {
    background-color: ${({ activeColor }) =>
      activeColor || BLUE.LIGHT}; /* 기본 활성화 색상 설정 */
  }
`;
const AddUser = ({ children, onClose }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");

  return (
    <ModalBackdrop>
      <ModalContent>
        {children}
        <Title>사용자 추가</Title>

        <Label htmlFor="name">이름</Label>
        <UserInput
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Label htmlFor="age">나이</Label>
        <UserInput
          type="text"
          placeholder="숫자만 입력하세요"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <Label>성별</Label>
        <RadioGroup>
          <RadioItem>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="male">남성</label>
          </RadioItem>
          <RadioItem>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="female">여성</label>
          </RadioItem>
        </RadioGroup>

        <Label htmlFor="phoneNumber">사용자 전화번호</Label>
        <UserInput
          type="text"
          placeholder="010-0000-0000"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <Label htmlFor="address">주소</Label>
        <UserInput
          type="text"
          placeholder="주소를 입력하세요"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Label htmlFor="contact1">보호자 연락처1</Label>
        <UserInput
          type="text"
          placeholder="010-0000-0000"
          value={contact1}
          onChange={(e) => setContact1(e.target.value)}
        />

        <Label htmlFor="contact2">보호자 연락처2</Label>
        <UserInput
          type="text"
          placeholder="010-0000-0000"
          value={contact2}
          onChange={(e) => setContact2(e.target.value)}
        />

        <StyledButton bgColor={BLUE.DEFAULT} activeColor={BLUE.LIGHT}>
          추가
        </StyledButton>
        <StyledButton
          bgColor={GRAY.DEFAULT}
          activeColor={GRAY.LIGHT}
          onClick={onClose}
        >
          닫기
        </StyledButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default AddUser;
