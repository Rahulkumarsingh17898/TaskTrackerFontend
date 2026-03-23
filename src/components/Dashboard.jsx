import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import api from "../services/api";

import ProjectSidebar from "./ProjectSidebar";
import NoProjectSelected from "./NoProjectSelected";
import { useMyContext } from "../store/ContextApi";

export default function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // 2. GRAB THE CURRENT USER FROM CONTEXT
        const { currentUser } = useMyContext();

    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, [currentUser]);

    const fetchProjects = async () => {
       const currentUserId = currentUser?.id;
        
        if (!currentUserId) {
          console.log("not fetching the project as current user is not assigned");
            return; // Don't make the API call if we don't know who the user is yet
        }

        setLoading(true);
        try {
            const response = await api.get(`/project/userId?userId=${currentUserId}`);
            const projectsData = response.data.map((project) => ({
                ...project,
                startDate: format(new Date(project.startDate), 'MMM dd, yyyy'),
                endDate: format(new Date(project.endDate), 'MMM dd, yyyy'),
            }));
            setProjects(projectsData);
        } catch (error) {
            console.error("Error fetching projects", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStartAddProject = () => {
        // Navigate to independent New Project page
        navigate('/new-project');
    };

    const handleSelectProject = (id) => {
        // Find the full project object
        const selectedProject = projects.find(p => p.id === id);
        
        // Navigate to TaskView and pass the project invisibly via router state
        navigate('/task-view', { state: { project: selectedProject } });
    };

    return (
        <main className="h-screen my-8 flex gap-8">
            <ProjectSidebar
                onStartAddProject={handleStartAddProject}
                projects={projects}
                onSelectProject={handleSelectProject}
                selectedProjectId={undefined} // Nothing selected on the main dashboard view
            />
            {/* The right side of the dashboard is just the empty state now */}
            <NoProjectSelected onStartAddProject={handleStartAddProject} />
        </main>
    );
}