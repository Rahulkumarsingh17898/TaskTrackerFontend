import Tasks from "./Tasks";

export default function SelectedProject({projectSelected,onDelete,onAddTask,onDeleteTask,projects,tasks}) {
   const formattedDate = new Date(projectSelected.endDate).toLocaleDateString('en-US',{
    year:'numeric',
    month:'long',
    day:'numeric'
   });

   console.log("tasks:",tasks)
   
    return (
        <div className="w-[35rem] mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-stone-600 mb-2" >{projectSelected.name}</h1>
                <button 
                className="text-stone-600 hover:text-stone-950"
                onClick={onDelete}
                >Delete</button>
                </div>
                <p className="mb-4 text-stone-400">{formattedDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">{projectSelected.description}</p>
            </header>
            <Tasks onAdd={onAddTask} onDelete={onDeleteTask} tasks={tasks}/>
        </div>
    )
}