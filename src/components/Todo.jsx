"use client";
import React, { useEffect, useRef, useState } from "react";
import Todoitems from "./Todoitems";
import confetti from 'canvas-confetti';

const Todo = () => {
  const [todoList, setTodoList] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
    }
    return [];
  });

  const inputRef = useRef();
  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const NewTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, NewTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prvTodos) => {
     return prvTodos.filter((todo) => todo.id !== id)
    })
  }

  const toggle = (id) => {
    const todo = todoList.find(todo => todo.id === id);
    if (todo && !todo.isComplete) {
      confetti  ({
        particleCount: 100,
        spread: 70,
        origin: {y: 0.6}
      })
    }
    setTodoList((prevTodos)=> {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {...todo, isComplete: !todo.isComplete}
        }
        return todo;
      })
    })
  }

  useEffect(() =>{
    localStorage.setItem("todos", JSON.stringify(todoList))

  }, [todoList])

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <div className="flex items-center mt-7 gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-layout-list text-black"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M4 14m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
        </svg>
        <h2 className="text-3xl font-semibold text-black">To-do App</h2>
      </div>
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="add your task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-blue-600 w-32 h-14 text-white text-lg font-medium cursor-pointer"
        >
          Add +
        </button>
      </div>
      <div>
      {todoList.map((item, index) => {
        return <Todoitems key={item.id} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}  />
      })}
      </div>
    </div>
  );
};

export default Todo;
