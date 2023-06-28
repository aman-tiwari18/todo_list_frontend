import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewTask,
  DeleteTask,
  UpdateTask,
  fetchListTaskAction,
} from "../Actions/listActions";

const AddList = ({ todoListId }) => {
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState([]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskName.trim() !== "") {
      console.log(todoListId);
      dispatch(
        createNewTask({ name: taskName, todoListId, token: state.user.token })
      );
      setTaskName("");
    }
  };

  const handleToggleComplete = (taskId) => {
    dispatch(UpdateTask(taskId));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(DeleteTask(taskId));
  };

  useEffect(() => {
    if (state.user) dispatch(fetchListTaskAction(todoListId));
  }, [dispatch, state.user, todoListId]);

  useEffect(() => {
    if (state.isTaskSuccess) {
      let tasks = state.tasks.filter((task) => task?.todo_list === todoListId);
      setTaskList(tasks);
    }
  }, [state.isTaskSuccess, state.tasks, todoListId]);

  if (state.isTaskLoading) return <p>Loading</p>;

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          className="border border-gray-400 px-2 py-1 rounded mr-2"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
      {taskList === null && taskList?.length === 0 ? (
        <p>No tasks added yet.</p>
      ) : (
        <ul className="list-disc pl-6">
          {taskList.map((task) => (
            <li
              key={task.id}
              className={`mb-2 ${task.completed ? "line-through" : ""}`}
            >
              {task.name}
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-[2px] px-1 rounded ml-2"
                onClick={() => handleToggleComplete(task.id)}
              >
                {task.completed ? "Incomplete" : "Complete"}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-[2px] px-1 rounded ml-2"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddList;
