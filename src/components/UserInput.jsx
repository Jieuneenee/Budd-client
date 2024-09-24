import styled from "styled-components";

const UserInput = ({ type, placeholder, value, onChange, maxWidth }) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ maxWidth }}
    />
  );
};

const StyledInput = styled.input`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || "100%"};
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #7a6af3;
  }
`;

export default UserInput;
