import Tasks from "./Tasks";
import NewTask from "./NewTask"; 

// 1. Add onRefreshTasks to the destructured props
export default function SelectedProject({ projectSelected, onDelete, onAddTask, onDeleteTask, projects, tasks, onRefreshTasks }) {
   const formattedDate = new Date(projectSelected.endDate).toLocaleDateString('en-US',{
    year:'numeric',
    month:'long',
    day:'numeric'
   });

   console.log("tasks:", tasks)
   
    return (
        <div className="w-full max-w-7xl mt-16 px-8"> 
            
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2" >{projectSelected.name}</h1>
                    <button 
                        className="text-stone-600 hover:text-stone-950 font-semibold"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
                <p className="mb-4 text-stone-400">{formattedDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">{projectSelected.description}</p>
            </header>
            
            <div className="flex gap-12 mt-8 items-start">
                
                <div className="flex-1">
                    {/* 2. Pass the onRefreshTasks function down to the Tasks component */}
                    <Tasks 
                        onDelete={onDeleteTask} 
                        tasks={tasks} 
                        project={projectSelected} 
                        onRefreshTasks={onRefreshTasks} 
                    />
                </div>

                <div className="w-[28rem] shrink-0">
                    <NewTask onAdd={onAddTask} project={projectSelected} />
                </div>

            </div>
        </div>
    )
}