import ProjectSidebar from "./ProjectSidebar";
import NewProject from "./NewProject";
import NoProjectSelected from "./NoProjectSelected";
import { useEffect, useState } from "react";
import SelectedProject from "./selectedProject";
import api from "../services/api";
import { format } from 'date-fns';

export default function Dashboard(){

    const[projectState, setProjectState] = useState({
          selectedProjectId: undefined,
          projects:[],
          tasks:[],
        });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
      // const { currentUser } = useMyContext(); // todo for only the current user we should show the projects
   

    const fetchProjects = async () => {
        setLoading(true);
        try{
          // console.log("currentUser:",JSON.stringify(currentUser));
          const response = await api.get("/project");

          console.log("Projects from backend:",JSON.stringify(response));
          addProjectsFromApi(response.data);
          console.log(projectState);

        } catch(error){
          // setError(error.response.data,message);
          console.error("Error fetching notes", error);
        } finally{
          setLoading(false);
        }

    }

    useEffect(() => {
      fetchProjects();
    },[])
    
    
        function handleAddTask(taskData){

           setProjectState(prevState => {
          
    
          // const projectId = Math.random().toString();
         
    
            return {
              ...prevState,
             tasks: [taskData, ...prevState.tasks],
              
            };
        });
        }
    
        function handleDeleteTask(id){
            setProjectState(prevState => {
          return {
            ...prevState,
            tasks: prevState.tasks.filter(
              (task) => task.id !== id),
          };
        });
        }
    
    
    
    
      function handleSelectProject(id){
        getTaskFromProjectApi(id);
      }
      
      const getTaskFromProjectApi = async (id) => {
        setLoading(true);
        try{
          // console.log("currentUser:",JSON.stringify(currentUser));
          const response = await api.get(`/task?projectId=${id}`);

         
          const data = response.data;
        
           console.log("task from project id from backend:",JSON.stringify(data));
          //  const taskArray = data.map((task)=> {
          //   return  {
          //       id: task.id,
          //       name: task.name,
          //       description: task.description,
          //       dueDate: task.dueDate,
          //       status: task.status,
          //       projectId: task.projectId

          //   }

          //  })
          

         setProjectState(prevState => {
          return {
            ...prevState,
            selectedProjectId: id,
            tasks:[...data]
          };
      });

        } catch(error){
          // setError(error.response.data,message);
          console.error("Error fetching Task from projectId", error);
        } finally{
          setLoading(false);
        }

    }
    
      function handleStartAddProject() {
        setProjectState(prevState => {
          return {
            ...prevState,
            selectedProjectId:null,
          };
      });
      }
    
      function handleAddProject(projectData){

         const newProject ={
            ...projectData,
               ownerId:1
            // id:projectId
          };

          createProjectApi(newProject)

        
      }


    const createProjectApi = async (data) => {
        setLoading(true);
        try{
          // console.log("currentUser:",JSON.stringify(currentUser));
          const response = await api.post("/project",data);
          const resData =  response.data;
          console.log("Create Projects res from backend:",JSON.stringify(resData));
          const newProject = {
            name:resData.name,
            description:resData.description,
            startDate:resData.startDate,
            endDate:resData.endDate,
            id:resData.id,
          }
          setProjectState(prevState => {
          
    
          // const projectId = Math.random().toString();
         
    
            return {
              ...prevState,
              selectedProjectId:undefined,
              projects: [...prevState.projects, newProject],
              
            };
        });

        } catch(error){
          // setError(error.response.data,message);
          console.error("Error Creating projects", error);
        } finally{
          setLoading(false);
        }

    }

      

      function addProjectsFromApi(projectResponse){
        console.log("adding the project data directly to ProjectState",projectResponse)
        setProjectState(prevState => {
          // const newProject = {
          //   title:projectData.title,
          //   description:projectData.description,
          //   dueDate:projectData.dueDate,
          //   id:Math.random().toString(),
          // }     
          // const formattedStartDate = format(new Date(project.startDate), 'MMM dd, yyyy');
        const projectsData = projectResponse.map((project)=> ({
          ...project,
        startDate: format(new Date(project.startDate), 'MMM dd, yyyy'),
        endDate: format(new Date(project.endDate), 'MMM dd, yyyy'),
        }));
    
          return {
            ...prevState,
            selectedProjectId:undefined,
            projects: [...projectsData],
            
          };
        });
      }
    
      function handleCancelAddProject(){
        setProjectState(prevState => {
          return {
            ...prevState,
            selectedProjectId:undefined,
          };
      });
      }
    
      function handleDeleteProject(){

        deleteProjectApi(projectState.selectedProjectId)
        
      }

      async function  deleteProjectApi(id){
        console.log("deleting project id:",id);
        try{
           setLoading(true);
           const response = await api.delete(`/project?projectId=${id}`);
           console.log("Project deleted successfully");
           setProjectState(prevState => {
              return {
                ...prevState,
                selectedProjectId: undefined,
        
                projects: prevState.projects.filter(
                  (project) => project.id !== prevState.selectedProjectId)
              };
            });
            
        }catch(error){
          // toast.error("error deleting Project");
        }finally{
          setLoading(false);
        }

      }
    
      
    
      console.log("projectState",projectState);
    
      const selectedProject = projectState.projects.find(
        (project) => project.id === projectState.selectedProjectId  
      );
    
      let content =<SelectedProject 
                   projectSelected={selectedProject}
                   onDelete={handleDeleteProject} 
                   onAddTask={handleAddTask} 
                   onDeleteTask={handleDeleteTask}
                   projects={projectState.projects}
                   tasks={projectState.tasks}
                  />;
    
      if(projectState.selectedProjectId === null){
        content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
      } else if (projectState.selectedProjectId === undefined){
        content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
      } 

    return(
        <main className="h-screen my-8 flex gap-8" >
             <ProjectSidebar 
             onStartAddProject={handleStartAddProject}
             projects={projectState.projects}
             onSelectProject={handleSelectProject}
             selectedProjectId={projectState.selectedProjectId}
             />
             {content}
            </main>
    );
}