// import ProjectSidebar from "./components/ProjectSidebar";
// import NewProject from "./components/NewProject";
// import NoProjectSelected from "./components/NoProjectSelected";
// import { useState } from "react";
// import SelectedProject from "./components/selectedProject";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import Navbar from "./components/Layout/Navbar";
// import LandingPage from "./components/LandingPage";
import Login from "./components/Auth/Login.jsx";
import Signup from "./components/Auth/Signup.jsx";
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import Navbar from "./components/Layout/Navbar.jsx";
import AboutPage from "./components/Layout/AboutPage.jsx";
import Footer from "./components/Layout/Footer/Footer.jsx";
import ContactPage from "./components/Layout/contactPage/ContactPage.jsx";
import Dashboard from "./components/Dashboard.jsx";
import LandingPage from "./components/LandingPage.jsx";
import OAuth2RedirectHandler from "./components/Auth/OAuth2RedirectHandler.jsx";
import AccessDenied from "./components/Auth/AccessDenied.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";


function App() {
  //   const[projectState, setProjectState] = useState({
  //     selectedProjectId: undefined,
  //     projects:[],
  //     tasks:[],
  //   });


  //   function handleAddTask(text){
  //      setProjectState((prevState) => {
  //         let projectId = prevState.selectedProjectId;
  //         const taskId = Math.random();
  //         const newTask ={
  //         text:text,
  //         projectId:projectId,
  //         id:taskId
  //         };

  //         return {
  //           ...prevState,

  //           tasks: [newTask, ...prevState.tasks],
            
  //         };
  //     });
  //   }

  //   function handleDeleteTask(id){
  //       setProjectState(prevState => {
  //     return {
  //       ...prevState,
  //       tasks: prevState.tasks.filter(
  //         (task) => task.id !== id),
  //     };
  //   });
  //   }




  // function handleSelectProject(id){
  //    setProjectState(prevState => {
  //     return {
  //       ...prevState,
  //       selectedProjectId: id,
  //     };
  // });
  // }  

  // function handleStartAddProject() {
  //   setProjectState(prevState => {
  //     return {
  //       ...prevState,
  //       selectedProjectId:null,
  //     };
  // });
  // }

  // function handleAddProject(projectData){
  //   setProjectState(prevState => {
  //     // const newProject = {
  //     //   title:projectData.title,
  //     //   description:projectData.description,
  //     //   dueDate:projectData.dueDate,
  //     //   id:Math.random().toString(),
  //     // }

  //     const projectId = Math.random().toString();
  //     const newProject ={
  //       ...projectData,
  //       id:projectId
  //     };

  //     return {
  //       ...prevState,
  //       selectedProjectId:undefined,
  //       projects: [...prevState.projects, newProject],
        
  //     };
  //   });
  // }

  // function handleCancelAddProject(){
  //   setProjectState(prevState => {
  //     return {
  //       ...prevState,
  //       selectedProjectId:undefined,
  //     };
  // });
  // }

  // function handleDeleteProject(){
  //   setProjectState(prevState => {
  //     return {
  //       ...prevState,
  //       selectedProjectId: undefined,

  //       projects: prevState.projects.filter(
  //         (project) => project.id !== prevState.selectedProjectId),
  //     };
  //   });
  // }

  

  // console.log("projectState",projectState);

  // const selectedProject = projectState.projects.find(
  //   (project) => project.id === projectState.selectedProjectId  
  // );

  // let content =<SelectedProject 
  //              project={selectedProject}
  //              onDelete={handleDeleteProject} 
  //              onAddTask={handleAddTask} 
  //              onDeleteTask={handleDeleteTask}
  //              tasks={projectState.tasks}
  //             />;

  // if(projectState.selectedProjectId === null){
  //   content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  // } else if (projectState.selectedProjectId === undefined){
  //   content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  // } 

  return (
    // <main className="h-screen my-8 flex gap-8" >
    //  <ProjectSidebar 
    //  onStartAddProject={handleStartAddProject}
    //  projects={projectState.projects}
    //  onSelectProject={handleSelectProject}
    //  selectedProjectId={projectState.selectedProjectId}
    //  />
    //  {content}
    // </main>
    <Router>
      <Navbar />
        <Toaster position="bottom-center" reverseOrder={false} />

      <Routes>

          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={
             <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>} />
      
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/access-denied" element={<AccessDenied />} />


          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
