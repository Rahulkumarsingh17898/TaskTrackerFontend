import { useRef, useState } from "react"
import Input from "./Input";
import Modal from "./Modal";
import api from "../services/api";

export default function NewTask({onAdd,onDelete}){

    const [enteredTask,setEnteredTask] = useState('');
    const modalRef = useRef();

    const title = useRef();
    const description = useRef();
    const startDate = useRef();
    const dueDate = useRef();
    const taskStatus = useRef();
    const owner = useRef();



    function handleChange(event){
        setEnteredTask(event.target.value);
    }

    function handleClick(){
         console.log("inside handleClick:");
        // Add the task
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredStartDate = startDate.current.value;
    const enteredDueDate = dueDate.current.value;
    const enteredTaskStatus = taskStatus.current.value;
    const enteredOwner = owner.current.value;
 console.log("enteredTitle :",enteredTitle);
 console.log("enteredDescription :",enteredDescription);
 console.log("enteredStartDate :",enteredStartDate);
 console.log("enteredDueDate :",enteredDueDate);
 console.log("enteredTaskStatus :",enteredTaskStatus);
 console.log("enteredOwner :",enteredOwner);
        //Add validdation 
        if(enteredTitle.trim()==='', enteredDescription.trim() === '',enteredStartDate.trim() === '', enteredDueDate.trim() === '', enteredTaskStatus.trim() === '', enteredOwner.trim() ===''){
             
              modalRef.current.open();
            return;
        }

        const taskData = {
            name: enteredTitle,
            description : enteredDescription,
            startDate : enteredStartDate,
            endDate : enteredDueDate,
            ownerId : enteredOwner,
            projectId : 1 // todo withut hardcoding
        }

        createTaskApi(taskData);


        
        

    }

    const createTaskApi = async (data) => {
        try{
        //   console.log("calling:",JSON.stringify(currentUser));
          const response = await api.post("/task",data);
          const resData =  response.data;
          console.log("Create Task res from backend:",JSON.stringify(resData));
          const taskResData = {
            name:resData.name,
            description:resData.description,
            startDate:resData.startDate,
            endDate:resData.endDate,
            id:resData.id,
          }

          onAdd(taskResData);
          resetTaskForm();
         

        } catch(error){
          // setError(error.response.data,message);
          console.error("Error Creating projects", error);
        } 

    }

    function resetTaskForm() {
        title.current.value = '';
        description.current.value = '';
        startDate.current.value = '';
        dueDate.current.value = '';
        // Note: You probably want a <select> or radio buttons for status/owner,
        // but for <input> elements, setting value = '' is the reset.
        taskStatus.current.value = ''; 
        owner.current.value = '';
    }


    return(
        <div>
         <Modal ref={modalRef}> 
                    <h2 className="text-xl font-bold text-stone-700 my-4" >Invalid Input</h2>
                    <p className="text-stone-600 mb-4">Oops... looks like you forgot to enter a value.</p>
                    <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field</p>
        </Modal>
        <div className="w-[35rem] mt-16">
                  
                    <div>
                       <Input ref={title} label="Task Name" placeholder="Task Name" />
                       <Input ref={description} label="Description" placeholder="Task Description" textarea={true} />
                       <Input ref={startDate} label="Task Start Date" type="date" />
                       <Input ref={dueDate} label="Task Due Date" type="date" />
                       <Input ref={taskStatus} label="Task Status" placeholder="status" />
                       <Input ref={owner} label="Task Owner" placeholder="Task Assigned To" /> 
                    </div>
                      <menu className="flex items-center justify-end gap-4 my-4">
                        <li>
                            <button 
                                className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                                onClick={handleClick}    
                                >Add Task
                            </button>
                        </li>
                    </menu>
        </div>

       {/* <div className="flex gap-4 items-center mb-4">
        <input 
            type="text" 
            className="w-64 px-2 py-1 rounded-sm bg-stone-200"
            onChange={handleChange}
            value={enteredTask}
         />
        <button 
            className="text-stone-700 hover:text-stone-950"
            onClick={handleClick}
            >Add Task</button>
       </div> */}
       </div> 
    )
}