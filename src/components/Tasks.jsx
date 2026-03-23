import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Tasks({ tasks, onDelete, onRefreshTasks }) {
    const [availableStatuses, setAvailableStatuses] = useState([]);

    // Fetch the list of statuses from the backend when the component loads
    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const response = await api.get("/task/statuses");
                setAvailableStatuses(response.data);
            } catch (error) {
                console.error("Failed to fetch task statuses", error);
            }
        };
        fetchStatuses();
    }, []);

    // Handle the dropdown change
    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await api.put(`/task/${taskId}/status?status=${newStatus}`);
            toast.success("Task status updated!");

            // If you pass down a function to refresh the tasks from the parent, call it here!
            if (onRefreshTasks) {
                onRefreshTasks();
            }
        } catch (error) {
            console.error("Error updating status", error);
            toast.error("Failed to update status");
        }
    };

    return (
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>

            {/* Empty State */}
            {tasks.length === 0 && (
                <p className="text-stone-600 my-4 italic">This project does not have any tasks yet.</p>
            )}

            {/* Task List */}
            {tasks.length > 0 && (
                <ul className="mt-4 space-y-4">
                    {tasks.map((task) => {
                        // const startDate = task.startDate
                        //     ? new Date(task.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        //     : 'No Date';
                        const endDate = task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : 'No Date';

                        return (
                            <li
                                key={task.id}
                                className="flex items-start justify-between p-5 bg-white rounded-md shadow-sm border border-stone-200"
                            >
                                <div className="flex flex-col w-full pr-6">
                                    <h3 className="text-lg font-bold text-stone-700">{task.name}</h3>

                                    {task.description && (
                                        <p className="text-sm text-stone-600 mt-2 whitespace-pre-wrap">
                                            {task.description}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap items-center gap-8 mt-4 pt-4 border-t border-stone-100">
                                        {/* <div className="flex flex-col">
                                            <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Start Date</span>
                                            <span className="text-sm text-stone-700 font-medium">{startDate}</span>
                                        </div> */}
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Due Date</span>
                                            <span className="text-sm text-stone-700 font-medium">{endDate}</span>
                                        </div>

                                        {/* NEW: ASSIGNED TO COLUMN */}
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">Assigned To</span>
                                            <span className="text-sm text-stone-700 font-medium capitalize">
                                                {task.assignedToName || "Unassigned"}
                                            </span>
                                        </div>

                                        {/* THE NEW EDITABLE STATUS DROPDOWN */}
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1">Status</span>
                                            <select
                                                className="border border-stone-300 rounded text-sm bg-stone-50 text-stone-700 px-2 py-1 font-medium focus:outline-none focus:border-stone-500"
                                                value={task.status || ""}
                                                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                            >
                                                <option value="" disabled>Select Status</option>
                                                {availableStatuses.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status.replace('_', ' ')}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="shrink-0 text-sm px-3 py-1 rounded bg-stone-100 text-stone-600 hover:bg-red-50 hover:text-red-600 border border-transparent hover:border-red-200 transition-colors"
                                    onClick={() => onDelete(task.id)}
                                >
                                    Delete Task
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}