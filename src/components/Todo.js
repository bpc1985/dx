import React from 'react'
import TodoDetail from './TodoDetail';

export default function Todo({ todo, details, index, seeDetail, completeTodo, undoTodo }) {
  const checkDetail = () => {
    return details && parseInt(details.id) === index;
  };

  const title = todo.details ? <div>{todo.text}</div> : <li>{todo.text}</li>;

  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}
    >
      {title}
      { checkDetail() &&
        <TodoDetail
          todos={details.todos}
          parentIndex={index}
          completeTodo={completeTodo}
          undoTodo={undoTodo}
        />
      }
      <div>
        { seeDetail && <button onClick={() => seeDetail(index)}>Details</button>}
        { !todo.isCompleted && <button onClick={() => completeTodo(todo, index)}>Done</button> }
        { todo.isCompleted && <button onClick={() => undoTodo(todo, index)}>Undo</button> }
      </div>
    </div>
  );
}
