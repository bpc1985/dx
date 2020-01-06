import React, { useReducer, useEffect } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import { StyledApp, StyledTodoList, StyledTodo } from './MyTask.styled';

const MyTask = (props) => {
  const reducer = (state, newState) => [...newState];
  const [todos, setTodos] = useReducer(reducer, []);

  useEffect(() => {
    localStorage.setItem(`savedTodos`, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (props.match.params.taskId) {
      const taskId = props.match.params.taskId;
    }
    // eslint-disable-next-line
    }, [props.match.params.taskId]
  );

  const addTodo = todo => {

  };

  const showHideTodo = todo => {

  }

  const toggleTodo = todo => {

  }

  const removeTodo = todo => {

  }

  return (
    <StyledApp>
      <StyledTodoList>
        {todos.map(todo => (
          <StyledTodo key={todo.id}>
            <Todo
              todo={todo}
              onShowHide={showHideTodo}
              onToggle={toggleTodo}
              onRemove={removeTodo}
            />
          </StyledTodo>
        ))}
        <TodoForm addTodo={addTodo} />
      </StyledTodoList>
    </StyledApp>
  );
}

export default MyTask;