import styled from "styled-components";
import { CONTAINER_WIDTH, HEADER_HEIGHT } from "../utils/layouts";
import { GRAY, BLUE } from "../utils/colors";
import UserCard from "../components/UserCard";
import userData from "../constants/json/user_list_sample.json";
import { useState } from "react";
import UserInput from "../components/UserInput";
import AddUser from "../components/AddUser";
import Header from "../components/Header";

const UserListPage = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  return (
    <Root>
      <Header />
      <Container>
        <Contents>
          <Title>사용자 목록</Title>
          <Actions>
            <UserInputWrapper>
              <UserInput
                placeholder="Serach User"
                type="text"
                maxWidth="400px"
              />
            </UserInputWrapper>
            <Button onClick={() => setAddModalOpen(true)}>+</Button>
          </Actions>
        </Contents>
        <ColumnWrapper>
          {userData.map((user) => {
            console.log(user);
            return (
              <UserCard
                key={user.userId}
                userId={user.userId}
                name={user.name}
                age={user.age}
                gender={user.gender}
                phoneNumber={user.phoneNumber}
                riskLevel={user.riskLevel}
                address={user.address}
                contact1={user.contact1}
                contact2={user.contact2}
              />
            );
          })}
        </ColumnWrapper>

        {isAddModalOpen && (
          <AddUser onClose={() => setAddModalOpen(false)}></AddUser>
        )}
      </Container>
    </Root>
  );
};
const Root = styled.div`
  width: 100%;
  height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${HEADER_HEIGHT}px;
  position: relative;
  background-color: ${GRAY.LIGHT};
`;

const Container = styled.div`
  width: ${CONTAINER_WIDTH}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Contents = styled.div`
  width: 100%;
  max-width: ${CONTAINER_WIDTH}px;
  margin-bottom: 16px;
  padding: 0 160px;
`;

const ColumnWrapper = styled.div`
  width: 100%;
  max-width: ${CONTAINER_WIDTH}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: ${BLUE.DARK};
`;

const Actions = styled.div`
  width: 100%;
  max-width: ${CONTAINER_WIDTH}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
  padding: 0 10px;
  box-sizing: border-box;
`;

const UserInputWrapper = styled.div`
  margin-right: 550px;
`;

const Button = styled.button`
  background-color: ${BLUE.DEFAULT};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: white;
  font-size: 30px;
  border: none;
  padding: 0;
  cursor: pointer;
  line-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${BLUE.LIGHT};
  }
`;

export default UserListPage;
