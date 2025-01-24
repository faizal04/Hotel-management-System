import styled from "styled-components";

const Input = styled.input`
  padding: 10px 15px;
  border: 2px solid #4caf50; /* A modern green shade */
  border-radius: 5px;
  font-size: 1rem;
  margin-left: 1rem;
  width: 100%;
  max-width: 300px;

  /* Placeholder styling */
  &::placeholder {
    color: #aaa;
    font-style: italic;
  }

  /* Focus state */
  &:focus {
    outline: none;
    border-color: #3c8c40;
    box-shadow: 0 0 5px rgba(60, 140, 64, 0.5); /* Add a subtle glow */
  }

  /* Hover state */
  &:hover {
    outline: none;
    border-color: #3c8c40;
  }

  /* Disabled state */
  &:disabled {
    background-color: #f5f5f5;
    border-color: #ddd;
    color: #aaa;
    cursor: not-allowed;
  }
`;

export default Input;
