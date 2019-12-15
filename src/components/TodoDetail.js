import React from 'react';
import Todo from './Todo';

export default function TodoDetail({todos, parentIndex, completeTodo, undoTodo}) {
  if (!todos) {
    return null;
  }
  return (
    <div>
      {todos.map((todo, index) => (
        <Todo
          key={`${parentIndex}${index}`}
          index={index}
          todo={todo}
          completeTodo={() => completeTodo(todo, parentIndex)}
          undoTodo={() => undoTodo(todo, parentIndex)}
        />
      ))}
    </div>
  )
}
