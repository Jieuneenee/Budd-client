import styled from "styled-components";
import { CONTAINER_WIDTH, HEADER_HEIGHT } from "../utils/layouts";
import { Typography, Button } from "antd";
import LogoIcon from "../assets/images/logo.png"

const Header = () => {

  return (
    <Container>
      <ItemContainer>
        <LogoContainer>
          <LogoImg src={LogoIcon} alt={"로고 이미지"}/>
          <BuddTypo>Budd</BuddTypo>
        </LogoContainer>
      </ItemContainer>
      <MenuContainer>
        <Menu>DB 조회</Menu>
        <Menu>Settings</Menu>
      </MenuContainer>      
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
  width: 30px;
  height: 20px;
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
`;

const BuddTypo = styled(Typography)`
  
`

export default Header;
