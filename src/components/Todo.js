import React from 'react';
import { isEmpty } from 'lodash';
import { StyledTreeNode, StyledButton } from './Todo.styled';

const Todo = ({ todo, level = 0, onShowHide, onToggle, onRemove }) => {
  const displayLabel = () => todo.isOpen ? 'Collapse' : 'Expand';
  return (
    <React.Fragment>
      <StyledTreeNode level={level}>
        <div style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>
          {todo.text}
        </div>
        <div>
          { !isEmpty(todo.children)
              && <StyledButton color="blue" onClick={() => onShowHide(todo)}>{(displayLabel())}</StyledButton> }
          { !todo.isCompleted
              && <StyledButton color="green" onClick={() => onToggle(todo)}>Done</StyledButton> }
          { todo.isCompleted
              && <StyledButton color="orange" onClick={() => onToggle(todo)}>Undo</StyledButton> }
          <StyledButton color="red" onClick={() => onRemove(todo)}>Delete</StyledButton>
        </div>
      </StyledTreeNode>

      { !isEmpty(todo.children) && todo.isOpen && todo.children.map(childTodo => (
        <Todo
          key={childTodo.id}
          todo={childTodo}
          level={level + 1}
          onShowHide={onShowHide}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </React.Fragment>
  );
}

export default Todo;