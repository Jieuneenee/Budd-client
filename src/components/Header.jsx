import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CONTAINER_WIDTH, HEADER_HEIGHT } from "../utils/layouts";
import { Typography, Button, Modal } from "antd";
import LogoIcon from "../assets/images/logo.png";
import { BLUE, GRAY } from "../utils/colors";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState("DB 조회");
  const [modalVisible, setModalVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    setRole(storedRole);
  }, []);

  useEffect(() => {
    if (location.pathname === "/userlist") {
      setSelectedMenu("사용자조회");
    } else if (location.pathname === "/data") {
      setSelectedMenu("사용자의견");
    } else if (location.pathname === "/setting") {
      setSelectedMenu("테스트");
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/logout`);
      setModalVisible(false);
      navigate("/login");
      console.log("로그아웃 성공:", response.data);
      message.success("로그아웃 되었습니다.");
      sessionStorage.removeItem("role");
      setRole(null);
    } catch (error) {
      console.error("로그아웃 실패:", error);
      message.error("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleLoginNavigate = () => {
    navigate("/login");
  };

  return (
    <Container>
      <ItemContainer>
        <Link to="/userlist" style={{ textDecoration: "none" }}>
          <LogoContainer>
            <LogoImg src={LogoIcon} alt={"로고 이미지"} />
            <BuddTypo>Budd</BuddTypo>
          </LogoContainer>
        </Link>
      </ItemContainer>
      <MenuContainer>
        <Link to="/userlist" style={{ textDecoration: "none" }}>
          <Menu
            onClick={() => setSelectedMenu("DB 조회")}
            selected={selectedMenu === "DB 조회"}
          >
            DB 조회
          </Menu>
        </Link>
        <Link to="/data" style={{ textDecoration: "none" }}>
          <Menu
            onClick={() => setSelectedMenu("Data")}
            selected={selectedMenu === "Data"}
          >
            Data
          </Menu>
        </Link>
        <Link to="/setting" style={{ textDecoration: "none" }}>
          <Menu
            onClick={() => setSelectedMenu("Settings")}
            selected={selectedMenu === "Settings"}
          >
            Settings
          </Menu>
        </Link>

        {role === "admin" ? (
          <LogoutButton onClick={() => setModalVisible(true)}>
            로그아웃
          </LogoutButton>
        ) : (
          <LogoutButton onClick={handleLoginNavigate}>로그인</LogoutButton>
        )}
      </MenuContainer>

      <Modal
        title="로그아웃"
        open={modalVisible}
        onOk={handleLogout}
        onCancel={() => setModalVisible(false)}
        okText="로그아웃"
        cancelText="취소"
      >
        <p>정말 로그아웃하시겠습니까?</p>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  background-color: white;
  display: flex;
  border-bottom: 1px #c9c9c9 solid;
  box-shadow: 0 1px 2px rgba(57, 63, 72, 0.2);
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 100;
`;

const ItemContainer = styled.div`
  width: ${CONTAINER_WIDTH}px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoImg = styled.img`
  width: 50px;
  height: 40px;
  padding-right: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const MenuContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Menu = styled(Button)`
  margin-left: 20px;
  border: 1.5px solid;
  color: ${({ selected }) => (selected ? BLUE.DARK : GRAY.DARK)};
  border-color: ${({ selected }) => (selected ? BLUE.DARK : GRAY.DEFAULT)};

  &:hover {
    color: ${BLUE.DEFAULT};
    border-color: ${BLUE.DEFAULT};
  }
`;

const LogoutButton = styled(Button)`
  margin-left: 20px;
  background-color: ${BLUE.DEFAULT};
  color: white;

  &:hover {
    background-color: ${GRAY.DEFAULT} !important;
    color: white !important;
  }
`;

const BuddTypo = styled(Typography)`
  font-size: 24px;
  font-weight: bold;
  color: ${GRAY.DARK};
`;

export default Header;
