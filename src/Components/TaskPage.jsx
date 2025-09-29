import React, { useState, useEffect } from "react";

const TaskPage = () => {
    const [showPopup, setShowPopup] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Low");
    const [tasks, setTasks] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null); // Track task being edited

    useEffect(() => {
        setShowPopup(true);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !priority || !dueDate) {
            alert("Please fill all fields!");
            return;
        }

        if (editTaskId) {
            // Editing existing task
            setTasks(
                tasks.map((task) =>
                    task.id === editTaskId
                        ? { ...task, title, description, priority, dueDate }
                        : task
                )
            );
            setEditTaskId(null);
        } else {
            // Adding new task
            const newTask = {
                id: Date.now(),
                title,
                description,
                priority,
                dueDate,
                status: "Pending",
            };
            setTasks([...tasks, newTask]);
        }

        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("Low");
        setShowPopup(false);
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate);
        setPriority(task.priority);
        setEditTaskId(task.id);
        setShowPopup(true);
    };

    const handleDelete = (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            setTasks(tasks.filter((task) => task.id !== taskId));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
            <h2 className="text-3xl font-bold mb-6">Task Management</h2>

            {/* Add Task Button */}
            <button
                onClick={() => {
                    setShowPopup(true);
                    setEditTaskId(null);
                    setTitle("");
                    setDescription("");
                    setDueDate("");
                    setPriority("Low");
                }}
                className="mb-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add Task
            </button>

            {/* Task Cards */}
            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`p-4 rounded-lg shadow-md border-l-4 bg-white ${task.priority === "High"
                                ? "border-red-500"
                                : task.priority === "Medium"
                                    ? "border-yellow-500"
                                    : "border-green-500"
                            }`}
                    >
                        <h3 className="text-xl font-semibold">{task.title}</h3>
                        <p className="text-gray-700">{task.description}</p>
                        <p className="text-gray-500">Due: {task.dueDate}</p>
                        <span
                            className={`inline-block mt-2 px-2 py-1 rounded text-white text-sm ${task.priority === "High"
                                    ? "bg-red-500"
                                    : task.priority === "Medium"
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                }`}
                        >
                            {task.priority} Priority
                        </span>
                        <p className="mt-1 text-gray-600">{task.status}</p>

                        {/* Edit & Delete Buttons */}
                        <div className="mt-3 flex justify-end gap-2">
                            <button
                                onClick={() => handleEdit(task)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(task.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                        <h3 className="text-2xl font-bold mb-4 text-center">
                            {editTaskId ? "Edit Task" : "Add Task"}
                        </h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 rounded mt-2 hover:bg-blue-600"
                            >
                                {editTaskId ? "Update Task" : "Add Task"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskPage;
