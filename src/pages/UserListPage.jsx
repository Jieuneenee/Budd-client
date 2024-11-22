import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { CONTAINER_WIDTH, HEADER_HEIGHT } from "../utils/layouts";
import { GRAY, BLUE } from "../utils/colors";
import UserCard from "../components/UserCard";
import UserInput from "../components/UserInput";
import AddUser from "../components/AddUser";
import Header from "../components/Header";
import axios from "axios";

const BASE_URL = "http://13.125.254.203:8080";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  const role = sessionStorage.getItem("role");

  const queryParams = new URLSearchParams(location.search);
  const pageFromUrl = parseInt(queryParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const page = parseInt(queryParams.get("page")) || 1;
    setCurrentPage(page);
  }, [location.search]);

  const fetchUsers = async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users?page=${page}`);
      setUsers(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = async (name) => {
    if (!name) {
      await fetchUsers(currentPage);
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/api/users/${name}`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      navigate(`?page=${page}`);
    }
  };

  if (role !== "admin") {
    return (
      <Root>
        <Header />
        <Container>
          <h3>로그인 후 접근할 수 있습니다.</h3>
        </Container>
      </Root>
    );
  }

  return (
    <Root>
      <Header />
      <Container>
        <Contents>
          <Title>사용자 목록</Title>
          <SearchActions>
            <UserInputWrapper>
              <UserInput
                placeholder="Search User"
                type="text"
                maxWidth="400px"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleSearch(e.target.value);
                }}
              />
            </UserInputWrapper>
            <Button onClick={() => setAddModalOpen(true)}>+</Button>
          </SearchActions>
        </Contents>

        <ColumnWrapper>
          {users.map((user) => (
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
          ))}
        </ColumnWrapper>
        <Pagination>
          <PageButton1
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            이전
          </PageButton1>
          {Array.from({ length: totalPages }, (_, i) => (
            <PageButton
              key={i + 1}
              active={currentPage === i + 1}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
          <PageButton1
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            다음
          </PageButton1>
        </Pagination>

        {isAddModalOpen && <AddUser onClose={() => setAddModalOpen(false)} />}
      </Container>
    </Root>
  );
};

// Styled Components
const Root = styled.div`
  width: 100%;
  height: 1350px;
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
  align-items: center;
`;

const Contents = styled.div`
  width: 100%;
  max-width: ${CONTAINER_WIDTH}px;
  margin-bottom: 16px;
  padding: 0 160px;
  margin-left: 350px;
`;

const ColumnWrapper = styled.div`
  width: 100%;
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

const SearchActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
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
  cursor: pointer;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid ${GRAY.DEFAULT};
  background-color: ${(props) => (props.active ? BLUE.DEFAULT : "#fff")};
  color: ${(props) => (props.active ? "#fff" : BLUE.DARK)};
  cursor: pointer;
  &:disabled {
    background-color: ${GRAY.LIGHT};
    cursor: not-allowed;
  }
`;

const PageButton1 = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid ${GRAY.DEFAULT};
  background-color: ${(props) => (props.active ? "#fff" : GRAY.DEFAULT)};
  color: ${(props) => (props.active ? "#fff" : GRAY.DARK)};
  cursor: pointer;
  &:disabled {
    background-color: ${GRAY.LIGHT};
    cursor: not-allowed;
  }
`;

export default UserListPage;
