import styled from "styled-components";
import { CONTAINER_WIDTH, HEADER_HEIGHT } from "../utils/layouts";
import Header from "../components/Header";
import { GRAY } from "../utils/colors";

const AccessErrorPage = () => {
  return (
    <Root>
      <Header />
      <Container>
        <MainContainer>
          <h3>로그인 후 접근할 수 있습니다.</h3>
        </MainContainer>
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
  padding: 30px;
`;

export default AccessErrorPage;
