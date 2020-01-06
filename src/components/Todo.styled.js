import styled from 'styled-components';

const getPaddingLeft = level => level * 25;

export const StyledTreeNode = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 8px;
  padding-left: ${props => getPaddingLeft(props.level)}px;

  &:hover {
    background: lightgray;
  }
`;

export const StyledButton = styled.button`
  background-color: ${props => props.color};
  color: white;
  border: none;
  padding: 6px;
  margin-left: 10px;
  text-align: center;
  text-decoration: none;
`;