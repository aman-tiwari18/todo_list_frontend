import React, { useState, useEffect } from "react";
import AddList from "./AddList";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewList,
  deleteList,
  fetchAllListAction,
} from "../Actions/listActions";

const TodoPage = () => {
  const [listName, setListName] = useState("");
  const [todoLists, setTodoLists] = useState([]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  const handleAddTodoList = () => {
    if (listName.trim() !== "") {
      const newTodoList = {
        name: listName,
      };
      dispatch(createNewList(newTodoList));
      setListName("");
    }
  };

  useEffect(() => {
    if (state.user?.token !== null) {
      dispatch(fetchAllListAction(state.user));
    }
  }, [dispatch, state.user, state.user?.token]);

  useEffect(() => {
    if (state.isListError) {
    }
  }, [state.isListError]);

  useEffect(() => {
    if (state.isListSuccess) {
      setTodoLists(state.list);
    }
  }, [state.isListSuccess, state.list]);

  const handleDeleteTodoList = (id) => {
    dispatch(deleteList(id));
  };

  if (state.isListLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="mt-8 mb-4">
          <input
            type="text"
            className="border border-gray-400 px-2 py-1 rounded mr-2"
            placeholder="Todo list name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
            onClick={handleAddTodoList}
          >
            Add Todo List
          </button>
        </div>
        <div className="flex flex-wrap justify-start -mx-4 ">
          {todoLists.length === 0 ? (
            <p>No todo lists added yet.</p>
          ) : (
            todoLists.map((list) => (
              <div
                key={list.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/3 px-12 mb-4"
              >
                <h2 className="text-lg font-semibold">{list.name}</h2>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 my-1 px-2 rounded"
                  onClick={() => {
                    handleDeleteTodoList(list.id);
                  }}
                >
                  Delete List
                </button>
                <AddList key={list.id} todoListId={list.id} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
