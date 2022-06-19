import React from "react";
import TodoInput from "./TodoInput";
import { v4 as uuid } from "uuid";
import TodoList from "./TodoList";

const Todo = () => {
  const [data, setData] = React.useState([]);
  const [showAll, setShowAll] = React.useState("true");

  const [page, setPage] = React.useState(1);

  const toggle = (id) => {
    let currStatus = data.filter((todo) => todo.id === id);
    currStatus = currStatus[0].status;

    if (currStatus) currStatus = false;
    else currStatus = true;
    (async () => {
      try {
        const res = await fetch(`http://localhost:3004/todos/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ status: currStatus }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        await res.json();
        return getData();
      } catch (error) {
        console.log(error);
      }
    })();
  };
  const deleteElement = (id) => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:3004/todos/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        await res.json();
        return getData();
      } catch (error) {
        console.log(error);
      }
    })();
  };

  const getData = async (page = 1) => {
    const res = await fetch(
      `http://localhost:3004/todos?_page=${page}&_limit=2`
    );
    const result = await res.json();
    setData(result);
  };
  React.useEffect(() => {
    getData(page);
  }, [page]);
  const addData = (title, setTitle) => {
    const payload = {
      title,
      status: false,
      id: uuid(),
    };

    (async () => {
      try {
        const res = await fetch("http://localhost:3004/todos", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        await res.json();

        return getData();
      } catch (error) {
        console.log(error);
      }
    })();

    setTitle("");
  };
  return (
    <>
      <TodoInput addData={addData} />
      <TodoList
        data={data}
        toggle={toggle}
        deleteElement={deleteElement}
        showAll={showAll}
      />
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show only Unfinished Task" : "Show All Task"}
      </button>
      <h4> Page : {page}</h4>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        PREV
      </button>

      <button
        disabled={data.length < 2}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        NEXT
      </button>
    </>
  );
};

export default Todo;
