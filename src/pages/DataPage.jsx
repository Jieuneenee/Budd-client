import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { CONTAINER_WIDTH, HEADER_HEIGHT } from "../utils/layouts";
import { BLUE, GRAY } from "../utils/colors";
import Header from "../components/Header";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

const DataPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/comments?page=${page}`);
      setUsers(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Root>
        <Header />
        <Container>
          <Contents>
            <TextBox>
              <Title>사용자 의견</Title>
              <SubTitle>사용자들의 노인복지서비스 관련 의견입니다.</SubTitle>
            </TextBox>
            <MessageList>
              {users.map((user, index) => (
                <MessageItem key={index}>
                  <Comment>{user.comment}</Comment>
                  <DateText>{user.date}</DateText>
                </MessageItem>
              ))}
            </MessageList>

            <Pagination>
              <PageButton1
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                이전
              </PageButton1>
              {Array.from({ length: totalPages }, (_, i) => (
                <PageButton
                  key={i}
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
          </Contents>
        </Container>
      </Root>
    </>
  );
};

export default DataPage;

const Root = styled.div`
  width: 100%;
  height: 1100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${HEADER_HEIGHT}px;
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
  padding: 20px;
`;

const MessageList = styled.div`
  width: 80%;
  max-width: 1000px;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin: 0 auto; /* 중앙 정렬 */
`;

const MessageItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid ${GRAY.DEFAULT};
  &:last-child {
    border-bottom: none;
  }
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

const Title = styled.h1`
  font-size: 24px;
  color: ${BLUE.DARK};
`;

const SubTitle = styled.h2`
  font-size: 20px;
  color: ${GRAY.DARK};
`;
const Comment = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #000;
`;

const DateText = styled.div`
  font-size: 12px;
  color: ${GRAY.DARK};
  text-align: right;
`;
const TextBox = styled.div`
  width: 80%;
  max-width: 1000px;

  margin: 0 auto;
`;
