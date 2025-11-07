import Input from "./Input";
import { useRef } from "react";
import Modal from "./Modal";

export default function NewProject({onAdd,onCancel}){ 
const modalRef = useRef();

   const title = useRef();
   const description = useRef();
   const startDate = useRef();
   const dueDate = useRef();

   function handleSave(){
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredStartDate = startDate.current.value;
    const enteredDueDate = dueDate.current.value;

    // add validation
    if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredStartDate.trim() === '' || enteredDueDate.trim() === ''){
        //show error modal
        modalRef.current.open();
        return;
    }

    onAdd({
        projectName:enteredTitle,
        description:enteredDescription,
        startDate:enteredStartDate,
        endDate:enteredDueDate,
    });

   }

    return (
        <>
        <Modal ref={modalRef}> 
            <h2 className="text-xl font-bold text-stone-700 my-4" >Invalid Input</h2>
            <p className="text-stone-600 mb-4">Oops... looks like you forgot to enter a value.</p>
            <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button 
                    className="text-stone-800 hover:text-stone-950"
                    onClick={onCancel}
                    >
                        Cancel
                        </button>
                    </li>
                <li>
                    <button 
                        className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                        onClick={handleSave}    
                        >Save
                    </button>
                </li>
            </menu>
            <div>
               <Input ref={title} label="Title" placeholder="Project Name" />
               <Input ref={description} label="Description" placeholder="Project Description" textarea={true} />
               <Input ref={startDate} label="Start Date" type="date" />
               <Input ref={dueDate} label="Due Date" type="date" />
                
            </div>
        </div>
        </>
    );
}