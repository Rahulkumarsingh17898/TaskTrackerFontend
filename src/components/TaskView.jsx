import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import SelectedProject from "./selectedProject"; 

export default function TaskView() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // 1. Grab the hidden project data passed from Dashboard
    const projectSelected = location.state?.project;
    
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Security check: If someone goes to /task-view directly without selecting a project,
        // kick them back to the dashboard to prevent crashes.
        if (!projectSelected) {
            navigate('/dashboard');
            return;
        }
        getTaskFromProjectApi(projectSelected.id);
    }, [projectSelected, navigate]);

    const getTaskFromProjectApi = async (id) => {
        setLoading(true);
        try {
            const response = await api.get(`/task?projectId=${id}`);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching Task from projectId", error);
        } finally {
            setLoading(false);
        }
    };

    // --- NEW REFRESH HANDLER ---
    // This will be called by the Tasks component when a status is updated!
    const handleRefreshTasks = () => {
        if (projectSelected) {
            getTaskFromProjectApi(projectSelected.id);
        }
    };

    const handleDeleteProject = async () => {
        try {
            setLoading(true);
            await api.delete(`/project?projectId=${projectSelected.id}`);
            // Go back to dashboard after deleting
            navigate('/dashboard'); 
        } catch (error) {
            console.error("error deleting Project", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = (taskData) => {
        setTasks(prev => [taskData, ...prev]);
    };

   const handleDeleteTask = async (taskId) => {
        try {
            // 1. Call the backend to delete the task permanently
            await api.delete(`/task/${taskId}`);
            
            // 2. Remove it from the local React state so it vanishes from the screen
            setTasks(prev => prev.filter(task => task.id !== taskId));
            
            // 3. Optional: Show a nice success toast!
            // toast.success("Task deleted successfully!");
            
        } catch (error) {
            console.error("Error deleting task", error);
            // toast.error("Failed to delete task.");
        }
    };
    // Show a blank screen briefly if redirecting
    if (!projectSelected) return null; 

    return (
        <main className="min-h-[calc(100vh-74px)] my-8 flex gap-8 pb-16">
            <SelectedProject
                projectSelected={projectSelected}
                onDelete={handleDeleteProject}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
                tasks={tasks}
                // --- PASS IT DOWN HERE ---
                onRefreshTasks={handleRefreshTasks} 
            />
        </main>
    );
}