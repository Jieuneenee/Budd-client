import styled from "styled-components";
import { CONTAINER_WIDTH, HEADER_HEIGHT } from "../utils/layouts";
import Header from "../components/Header";
import { GRAY } from "../utils/colors";

const Setting = () => {
  const role = sessionStorage.getItem("role");

  if (role !== "admin") {
    return (
      <Root>
        <Header />
          <h3>로그인 후 접근할 수 있습니다.</h3>
      </Root>
    );
  }

  return (
    <Root>
      <Header />
      <Container>
        <MainContainer></MainContainer>
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
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  display: flex;
`;

export default Setting;
