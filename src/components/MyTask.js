import { isEmpty, parseInt } from 'lodash';
import React, { useReducer, useEffect } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import graph, { Node } from '../graph';
import { StyledApp, StyledTodoList, StyledTodo } from './MyTask.styled';

const MyTask = (props) => {
  const reducer = (state, newState) => [...newState];
  const [graphData, setGraphData] = useReducer(reducer, graph.transfrom());

  useEffect(() => {
    localStorage.setItem(`savedTodos`, JSON.stringify(graph.graph));
  }, [graphData]);

  useEffect(() => {
    if (props.match.params.taskId) {
      const taskId = props.match.params.taskId;
      graph.findPathAndOpen(taskId);
      setGraphData(graph.transfrom());
    }
    // eslint-disable-next-line
    }, [props.match.params.taskId]
  );

  const addTodo = (todo) => {
    const lastKey = graph.getLastKey();
    const chars = lastKey.split('t');
    const node = new Node({
      id: `t${parseInt(chars[1]) + 1}`,
      text: todo.value,
      isCompleted: false
    });
    graph.addNode(node);
    if (isEmpty(todo.parentId)) {
      graph.addConnection('t0', node.id);
    } else {
      graph.addConnection(todo.parentId, node.id);
    }
    setGraphData(graph.transfrom());
  };

  const showHideTodo = todoId => {
    const todo = graph.get(todoId);
    todo.isOpen = !todo.isOpen;
    setGraphData(graph.transfrom());
  }

  const toggleTodo = todoId => {
    const todo = graph.get(todoId);
    todo.isCompleted = !todo.isCompleted;
    setGraphData(graph.transfrom());
  }

  const removeTodo = todoId => {
    graph.removeNode(todoId);
    setGraphData(graph.transfrom());
  }

  return (
    <StyledApp>
      <StyledTodoList>
        {graphData.map(todo => (
          <StyledTodo key={todo.id}>
            <Todo
              todoId={todo.id}
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