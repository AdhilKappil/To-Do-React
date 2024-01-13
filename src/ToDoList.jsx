import { useState, useEffect } from "react";

function ToDoList() {
    const [task, setTask] = useState(JSON.parse(localStorage.getItem("TodoItems")) || []);
    const [newTask, setNewTask] = useState("");
    const [currentDay, setCurrentDay] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const currentDate = new Date();
        const dayOfWeek = daysOfWeek[currentDate.getDay()];
        setCurrentDay(dayOfWeek);
    }, []);

    useEffect(() => {
        localStorage.setItem("TodoItems", JSON.stringify(task));
    }, [task]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTask((tasks) => [...tasks, { text: newTask, completed: false }]);
            setNewTask("");
        }
    }

    function handleEnterKeyPress(event) {
        if (event.key === "Enter") {
            if (editIndex !== null) {
                // If editing, save the edit
                saveEdit(editIndex);
            } else {
                // If not editing, add a new task
                addTask();
            }
        }
    }

    function deleteTask(index) {
        const updatedTasks = task.filter((_, i) => i !== index);
        setTask(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...task];
            [updatedTasks[index], updatedTasks[index - 1]] = [
                updatedTasks[index - 1],
                updatedTasks[index],
            ];
            setTask(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < task.length - 1) {
            const updatedTasks = [...task];
            [updatedTasks[index], updatedTasks[index + 1]] = [
                updatedTasks[index + 1],
                updatedTasks[index],
            ];
            setTask(updatedTasks);
        }
    }

    function handleCompleteTask(index, event) {
        setTask((tasks) =>
            tasks.map((obj, i) => (i === index ? { ...obj, completed: event.target.checked } : obj))
        );
    }

    function editList(index) {
        setEditIndex(index);
        setNewTask(task[index].text); // Set the editing text to the original text
    }

    function saveEdit(index) {
        setTask((tasks) =>
            tasks.map((obj, i) => (i === index ? { ...obj, text: newTask } : obj))
        );
        setEditIndex(null);
        setNewTask("");
    }

    return (
        <div className="to-do-list">
            <h1>To Do List</h1>
            <h2>{`Whoops, it's ${currentDay} ☕😊`}</h2>
            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    placeholder={editIndex !== null ? "" : "Enter new task..."}
                    onChange={handleInputChange}
                    onKeyDown={handleEnterKeyPress}
                />
                <button className="add-button" onClick={addTask}>
                    <i className="fas fa-plus" style={{ color: "212121" }}></i>
                </button>
            </div>
            <ol>
                {task.map((taskItem, index) => (
                    <li key={index}>
                        {index === editIndex ? (
                            <div>
                                <input
                                    type="text"
                                    value={newTask}
                                    onChange={handleInputChange}
                                />
                                <button className="save-button" onClick={() => saveEdit(index)}>Save</button>
                            </div>
                        ) : (
                            <>
                                <input
                                    type="checkbox"
                                    onChange={(event) => handleCompleteTask(index, event)}
                                />
                                {taskItem.completed ? (
                                    <span className="text">
                                        <del>{taskItem.text}</del>{" "}
                                    </span>
                                ) : (
                                    <span className="text">{taskItem.text}</span>
                                )}
                                <button className="delete-button" onClick={() => deleteTask(index)}>
                                    <i className="fas fa-trash" style={{ color: "#fff" }}></i>
                                </button>
                                <button className="move-button" onClick={() => moveTaskUp(index)}>
                                    👆
                                </button>
                                <button className="move-button" onClick={() => moveTaskDown(index)}>
                                    👇
                                </button>
                                <button className="edit-button" onClick={() => editList(index)}>
                                <i className="fa-solid fa-pen-to-square" style={{color: "#fff"}}></i>
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
