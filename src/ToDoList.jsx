import { useState, useEffect } from "react";

function ToDoList() {
    const [task, setTask] = useState(JSON.parse(localStorage.getItem("TodoItems")) || []);
    const [newTask, setNewTask] = useState("");
    const [currentDay, setCurrentDay] = useState("");

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
            addTask();
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
        setTask(
            task.filter((obj, i) => {
                if (i === index) {
                    obj.completed = event.target.checked;
                }
                return obj;
            })
        );
    }

    return (
        <div className="to-do-list">
            <h1>To-DO-List</h1>
            <h2>{`Whoops, it's ${currentDay} ☕😊`}</h2>
            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    placeholder="Enter new task ..."
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
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
