import React, { useState, useEffect } from 'react';
import { every, find } from 'lodash';
import { data } from './mockData';
import Todo from './Todo';
import TodoForm from './TodoForm';

import "./MyTask.css";

function MyTask(props) {
  const savedState = JSON.parse(localStorage.getItem(`savedTodos`));
  const initialData = savedState ? savedState : data;

  const [todos, setTodos] = useState(initialData);
  const [details, setDetails] = useState();

  useEffect(
    () => {
      localStorage.setItem(`savedTodos`, JSON.stringify(todos));
    },
    [todos]
  );

  useEffect(
    () => {
      if (props.match.params.taskId) {
        setDetails({
          id: props.match.params.taskId,
          todos: todos[props.match.params.taskId].details
        });
      }
    },
    // eslint-disable-next-line
    [props.match.params.taskId]
  );

  const seeDetail = (index) => {
    props.history.push({pathname: `/${index}`});
  };

  const completeTodo = (todo, index) => {
    if (todo.details) {
      const newTodos = [...todos];
      newTodos[index].isCompleted = true;
      newTodos[index].details.forEach(tdo => tdo.isCompleted = true);
      setTodos(newTodos);
    } else {
      const newTodos = [...todos];
      newTodos[index].details.forEach(tdo => {
        if (tdo.text === todo.text) {
          tdo.isCompleted = true;
        }
      });
      // if all child todos are completed, parent todo should be completed also
      if (every(newTodos[index].details, { isCompleted: true })) {
        newTodos[index].isCompleted = true;
      }
      setTodos(newTodos);
    }
  };

  const undoTodo = (todo, index) => {
    if (todo.details) {
      const newTodos = [...todos];
      newTodos[index].isCompleted = false;
      newTodos[index].details.forEach(tdo => tdo.isCompleted = false);
      setTodos(newTodos);
    } else {
      const newTodos = [...todos];
      newTodos[index].details.forEach(tdo => {
        if (tdo.text === todo.text) {
          tdo.isCompleted = false;
        }
      });
      // if only one child todo are undone, parent todo should be undone also
      if (find(newTodos[index].details, { isCompleted: false })) {
        newTodos[index].isCompleted = false;
      }
      setTodos(newTodos);
    }
  }

  const addTodo = text => {
    const newTodos = [...todos, { text, details: [], isCompleted: false  }];
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            details={details}
            seeDetail={seeDetail}
            completeTodo={completeTodo}
            undoTodo={undoTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default MyTask;