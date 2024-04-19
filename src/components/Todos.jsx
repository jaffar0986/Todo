import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, updateTodo, toggleTodo } from "../features/todo/todoSlice";

function Todos() {
    const [editText, setEditText] = useState("");
    const [editId, setEditId] = useState(null);
    const dispatch = useDispatch();

    const todos = useSelector((state) => state.todos);

    const handleUpdateTodo = (id) => {
        dispatch(updateTodo({ id, newText: editText }));
        setEditId(null);
        setEditText("");
    };

    return (
        <>
            
            <ul className="list-none">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className={`mt-4 flex justify-between items-center px-4 py-2 rounded 
                        ${
                            todo.completed ? "bg-[#c6e9a7]" : " bg-gray-400"
                        }`}
                    >
                        <input
                            type="checkbox"
                            className="cursor-pointer"
                            onChange={() => {
                                dispatch(toggleTodo({ id: todo.id }));
                                if (editId === todo.id) setEditId(null); // Disable edit when checkbox is checked
                            }}
                            checked={todo.completed}
                        />

                        <div className={`flex-grow text-black ${todo.completed ? "line-through" : ""}`}>
                            {editId === todo.id ? (
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                            ) : (
                                <div>{todo.text}</div>
                            )}
                        </div>

                        <div className="flex justify-between items-center gap-2">
                            {editId === todo.id ? (
                                <button
                                    onClick={() => handleUpdateTodo(todo.id)}
                                    className="text-white bg-green-600 border-0 py-1 px-4 focus:outline-none hover:bg-green-300 rounded text-md"
                                >
                                    Update
                                </button>
                            ) : (
                                <button
                                    onClick={() => setEditId(todo.id)}
                                    disabled={todo.completed} // Disable edit button if todo is completed
                                    className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                                >
                                    Edit
                                </button>
                            )}

                            <button
                                onClick={() => dispatch(removeTodo(todo.id))}
                                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Todos;
