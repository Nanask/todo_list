import React, { createContext, useContext, useRef, useState } from "react";

const AppContext = createContext();

export const useTodoContext = () => useContext(AppContext);

function AppContextProvider({ children }) {
  const [todo, setTodo] = useState({
    t_id: 0,
    t_text: "리액트 복습",
    t_comp: false,
  });

  const [todoList, setTodoList] = useState([]);

  const nextId = useRef(0);
  const inputId = useRef();

  const onChange = (e) => {
    const t_text = e.target.value;
    setTodo({ ...todo, t_text, t_id: nextId.current });
  };

  const todoInsert = () => {
    if (todo.t_text === "") {
      window.alert("할일을 입력하세요 ~~~");
      inputId.current.focus();
      return;
    }
    setTodoList([...todoList, todo]);
    nextId.current++;
    console.log(nextId.current);
    todoClear();
  };

  const todoClear = () => {
    setTodo({ t_id: nextId.current, t_text: "", t_comp: false });
  };

  const onClick = () => todoInsert();

  const onKeyPress = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      todoInsert();
    } else if (e.key === "Escape") {
      todoClear();
    }
  };

  const onDeleteClick = (e) => {
    if (window.confirm("삭제할까요?")) {
      const t_id = Number(e.target.dataset.todoId);
      alert(t_id);
      const _todoList = todoList.filter((todo) => todo.t_id !== t_id);
      setTodoList(_todoList);
    }
  };

  const onCompClick = (e) => {
    const t_id = Number(e.target.dataset.todoId);

    const index = todoList.findIndex((todo) => todo.t_id === t_id);
    const selectTodo = todoList[index];

    const _todoList = [...todoList];
    _todoList[index] = {
      ...selectTodo,
      t_comp: !selectTodo.t_comp,
    };
    setTodoList(_todoList);
  };

  const propsStrore = {
    todo,
    todoList,
    inputId,
    onChange,
    onClick,
    onKeyPress,
    onDeleteClick,
    onCompClick,
  };

  return <AppContext.Provider value={propsStrore}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
