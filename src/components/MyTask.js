import React, { useReducer, useEffect } from 'react';
import tree from './Tree';
import Todo from './Todo';
import TodoForm from './TodoForm';
import { StyledApp, StyledTodoList, StyledTodo } from './MyTask.styled';

const MyTask = (props) => {
  const reducer = (state, newState) => [...newState];
  const [todos, setTodos] = useReducer(reducer, tree.root.children);

  useEffect(() => {
    localStorage.setItem(`savedTodos`, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (props.match.params.taskId) {
      const taskId = props.match.params.taskId;
      tree.showOnlyNode(taskId);
      setTodos(tree.root.children);
    }
    // eslint-disable-next-line
    }, [props.match.params.taskId]
  );

  const addTodo = todo => {
    const newTodo = {
      id: `t${tree.root.count + 1}`,
      text: todo.value,
      isCompleted: false
    };
    tree.addNode(newTodo, todo.parentId);
    setTodos(tree.root.children);
  };

  const showHideTodo = todo => {
    tree.showHideNode(todo);
    setTodos(tree.root.children);
  }

  const toggleTodo = todo => {
    tree.toggleNode(todo, !todo.isCompleted);
    setTodos(tree.root.children);
  }

  const removeTodo = todo => {
    tree.removeNode(todo);
    setTodos(tree.root.children);
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