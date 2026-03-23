import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Modal from "./Modal";
import api from "../services/api"; 
import { useMyContext } from "../store/ContextApi";

export default function NewProject() { 
    const modalRef = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const title = useRef();
    const description = useRef();
    const startDate = useRef();
    const dueDate = useRef();

    // 2. GRAB THE CURRENT USER FROM CONTEXT
    const { currentUser } = useMyContext();

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredStartDate = startDate.current.value;
        const enteredDueDate = dueDate.current.value;

        // Validation
        if(enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredStartDate.trim() === '' || enteredDueDate.trim() === ''){
            modalRef.current.open();
            return;
        }

        const newProject = {
            projectName: enteredTitle,
            description: enteredDescription,
            startDate: enteredStartDate,
            endDate: enteredDueDate,
            ownerId: currentUser.id 
        };

        createProjectApi(newProject);
    }

    const createProjectApi = async (data) => {
        setLoading(true);
        try {
            const response = await api.post("/project", data);
            console.log("Create Projects res from backend:", response.data);
            
            // THE MAGIC STEP:
            // Send the user back to the dashboard. 
            // The dashboard will automatically re-fetch the updated list from the DB on load!
            navigate("/dashboard");

        } catch (error) {
            console.error("Error Creating projects", error);
            // Optionally show an error modal/toast here
        } finally {
            setLoading(false);
        }
    }

    function handleCancel() {
        navigate("/dashboard");
    }

    return (
        <>
            <Modal ref={modalRef}> 
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">Oops... looks like you forgot to enter a value.</p>
                <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field</p>
            </Modal>

            {/* Centered Card Layout */}
            <div className="w-full flex justify-center py-16">
                <div className="w-[40rem] bg-white p-8 rounded-md shadow-sm border border-stone-200">
                    
                    <h2 className="text-2xl font-bold text-stone-700 mb-6 border-b pb-2">
                        Create New Project
                    </h2>

                    <div className="flex flex-col gap-4">
                        <Input ref={title} label="Title" placeholder="Project Name" />
                        <Input ref={description} label="Description" placeholder="Project Description" textarea={true} />
                        <Input ref={startDate} label="Start Date" type="date" />
                        <Input ref={dueDate} label="Due Date" type="date" />
                    </div>

                    <menu className="flex items-center justify-end gap-4 mt-8">
                        <li>
                            <button 
                                className="text-stone-600 hover:text-stone-950 font-semibold transition-colors disabled:opacity-50"
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </li>
                        <li>
                            <button 
                                className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 transition-colors shadow-sm disabled:opacity-50"
                                onClick={handleSave}
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </li>
                    </menu>
                </div>
            </div>
        </>
    );
}