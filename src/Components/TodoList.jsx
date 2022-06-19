import React from "react";

const TodoList = (props) => {
  const { data, toggle, deleteElement, showAll } = props;

  return (
    <ul>
      {data
        .filter((todo) => (showAll ? true : todo.status === false))
        .map((todo) => (
          <li key={todo.id}>
            {`${todo.title} - ${todo.status}`}
            <button
              onClick={() => {
                toggle(todo.id);
              }}
            >
              Toggle
            </button>
            <button
              onClick={() => {
                deleteElement(todo.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
};
export default TodoList;
