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
import { BASE_URL } from "../../env";

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 상태 추가

  const navigate = useNavigate();
  const location = useLocation();
  const role = sessionStorage.getItem("role");

  // URL에서 쿼리 파라미터로부터 페이지 번호 가져오기
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
      setUsers(response.data.content); // 사용자 데이터 설정
      setTotalPages(response.data.totalPages); // 전체 페이지 수 설정
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

  const handleNextPage = () => {
    // 전체 페이지 수를 넘지 않도록 제어
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      navigate(`?page=${nextPage}`);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      navigate(`?page=${prevPage}`);
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

        <PaginationActions>
          <PaginationButton
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            이전
          </PaginationButton>
          <CurrentPage>{currentPage}</CurrentPage>
          <PaginationButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages} // 마지막 페이지를 넘지 않도록 비활성화
          >
            다음
          </PaginationButton>
        </PaginationActions>

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
  margin-left: auto;
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

const SearchActions = styled.div`
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

const PaginationActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  bottom: 35px;
  left: 0;
  right: 0;
  margin: 0 auto;
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

const PaginationButton = styled.button`
  background-color: ${BLUE.DEFAULT};
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;

  &:disabled {
    background-color: ${GRAY.DEFAULT};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${BLUE.LIGHT};
  }
`;

const CurrentPage = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${BLUE.DARK};
`;

export default UserListPage;
