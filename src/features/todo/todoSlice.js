import {createSlice, nanoid} from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState = {
    todos: 
         JSON.parse(localStorage.getItem("todos"))
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state,action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },
        removeTodo: (state,action) => {
            state.todos = state.todos.filter((todo) => todo.id 
            !== action.payload)
            localStorage.setItem("todos", JSON.stringify(state.todos));
        },
        updateTodo: (state, action) => {
            const { id, newText } = action.payload;
            const todoToUpdate = state.todos.find(todo => todo.id === id);
            if (todoToUpdate) {
                todoToUpdate.text = newText;
                localStorage.setItem("todos", JSON.stringify(state.todos));
            }
        },
        toggleTodo: (state, action) => {
            const { id } = action.payload;
            const toggleTodo = state.todos.find((todo) => todo.id === id);
            if (toggleTodo) {
                toggleTodo.completed = !toggleTodo.completed;
                localStorage.setItem("todos", JSON.stringify(state.todos));
            }
        },
    }
})

export const {addTodo, removeTodo, updateTodo, toggleTodo} = todoSlice.actions

export default todoSlice.reducer