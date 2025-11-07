import NewTask from "./NewTask";

export default function Tasks({tasks,onAdd,onDelete}){
    return(
        <section>
            <div className="flex mx-4">
                <div>
            <h2 className="text-2xl font-bold text-stone-700 mb-4" >Tasks</h2>

            {   tasks.length === 0 && 
                (<p className="text-stone-800 my-4">This project does not have any tasks yet.</p>)}
                
            {   tasks.length>0 && (
                  <ul className="p-4 mt-8 rounded-md bg-stone-100 ">
                    {tasks.map((task) => (
                        <li key={task.id} className=" flex justify-between my-4  ">
                            <span>{task.name}</span>
                            <button 
                                className="text-stone-700 hover:text-red-500"
                                onClick={()=>onDelete(task.id)}
                            >
                                Clear
                            </button>
                        </li>
                    ))}
                  </ul>)
            }
            </div>
            <NewTask onAdd={onAdd} onDelete={onDelete} />
            </div>
        </section>
        
    );
}

/* With some issue
<section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4" >Tasks</h2>
            <NewTask onAdd={onAdd} onDelete={onDelete} />
            {   tasks.length === 0 ? 
                (<p className="text-stone-800 my-4">This project does not have any tasks yet.</p>)
                :
                (<ul className="p-4 mt-8 rounded-md bg-stone-100 ">
                    {tasks.map((task) => (
                        <li key={task.id} className=" flex justify-between my-4  ">
                            <span>{task.title}</span>
                            <button 
                            className="text-stone-700 hover:text-red-500"
                            onClick={() => onDelete(task.id)}
                            >Clear</button>
                        </li>
                    ))}
                </ul>)
            }
        </section>
*/