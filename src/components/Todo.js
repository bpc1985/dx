import React from 'react';
import { isEmpty } from 'lodash';
import { StyledTreeNode, StyledButton } from './Todo.styled';
import graph from '../graph';

const Todo = ({ todoId, level = 0, onShowHide, onToggle, onRemove }) => {
  const todo = graph.get(todoId);
  const displayLabel = () => todo.isOpen ? 'Collapse' : 'Expand';
  return (
    <React.Fragment>
      <StyledTreeNode level={level}>
        <div style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>
          {todo.text}
        </div>
        <div>
          { !isEmpty(todo.children)
              && <StyledButton color="blue" onClick={() => onShowHide(todoId)}>{(displayLabel())}</StyledButton> }
          { !todo.isCompleted
              && <StyledButton color="green" onClick={() => onToggle(todoId)}>Done</StyledButton> }
          { todo.isCompleted
              && <StyledButton color="orange" onClick={() => onToggle(todoId)}>Undo</StyledButton> }
          <StyledButton color="red" onClick={() => onRemove(todoId)}>Delete</StyledButton>
        </div>
      </StyledTreeNode>

      { !isEmpty(todo.children) && todo.isOpen
          && Object.keys(todo.children).map(childTodoId => (
        <Todo
          key={childTodoId}
          todoId={childTodoId}
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