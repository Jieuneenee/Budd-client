import styled from "styled-components";

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'activeColor' && prop !== 'bgColor', // activeColor와 bgColor가 DOM으로 전달되지 않도록 필터링
})`
  width: 100%;
  padding: 12px;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 5px;
  background-color: ${(props) => props.bgColor || "#4763E4"};

  &:active {
    background-color: ${(props) => props.activeColor || "#b6b6b6"};
  }
`;


const Button = ({ onClick, title, bgColor, activeColor }) => {
  return (
    <StyledButton
      onClick={onClick}
      bgColor={bgColor}
      activeColor={activeColor}>
      {title}
    </StyledButton>
  );
};

export default Button;
