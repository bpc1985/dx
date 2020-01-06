import React, { useState } from 'react';
import { StyledInput, StyledButton } from './TodoForm.styled';

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState({
    value: '',
    parentId: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (!task.value) return;
    addTodo(task);
    setTask({ value: '', parentId: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        value={task.value}
        placeholder="Add New Task"
        onChange={e => setTask({...task, value: e.target.value})}
      />
      <StyledInput
        type="text"
        value={task.parentId}
        placeholder="Add Parent Task Key"
        onChange={e => setTask({...task, parentId: e.target.value})}
      />
      <StyledButton>Submit</StyledButton>
    </form>
  );
}

export default TodoForm;

