import React from "react";

const TodoInput = (props) => {
  const [title, setTitle] = React.useState("");
  const { addData } = props;

  return (
    <>
      <input
        placeholder="Enter data"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={() => {
          addData(title, setTitle);
        }}
      >
        Add Something
      </button>
    </>
  );
};

export default TodoInput;
