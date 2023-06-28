import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewTask, DeleteTask, UpdateTask } from "../Actions/listActions";

const AddList = ({ tasks }) => {
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState(tasks);

  const dispatch = useDispatch();

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskName.trim() !== "") {
      const newTask = {
        id: Date.now(),
        name: taskName,
        completed: false,
      };
      setTaskList([...taskList, newTask]);
      dispatch(createNewTask(newTask));
      setTaskName("");
    }
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = taskList.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updatedTasks);
    dispatch(UpdateTask(updatedTasks));
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = taskList.filter((task) => task.id !== taskId);
    setTaskList(updatedTasks);
    dispatch(DeleteTask(updatedTasks));
  };

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
      {taskList.length === 0 ? (
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
