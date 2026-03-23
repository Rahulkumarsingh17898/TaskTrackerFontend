import { useRef, useState, useEffect } from "react"
import Input from "./Input";
import Modal from "./Modal";
import api from "../services/api";

export default function NewTask({ onAdd, onDelete, project }) {
    const [enteredTask, setEnteredTask] = useState('');
    const [users, setUsers] = useState([]); // State to hold our fetched users
    const modalRef = useRef();

    const title = useRef();
    const description = useRef();
    const startDate = useRef();
    const dueDate = useRef();
    const assignedToDropdown = useRef();
    const owner = useRef(); // This will now point to our <select> dropdown

    // Fetch users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get("/user"); // Fetches from your UserController
                setUsers(response.data);
            } catch (error) {
                console.error("Failed to fetch users for dropdown", error);
            }
        };
        fetchUsers();
    }, []);

    function handleChange(event) {
        setEnteredTask(event.target.value);
    }

    function handleClick() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredStartDate = startDate.current.value;
        const enteredDueDate = dueDate.current.value;
        const enteredAssignedTo = assignedToDropdown.current.value;
        const enteredOwner = owner.current.value;

        // Add validation 
        if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredStartDate.trim() === '' || enteredDueDate.trim() === '' || enteredOwner.trim() === ''|| enteredAssignedTo.trim() === '') {
            modalRef.current.open();
            return;
        }

        const taskData = {
            name: enteredTitle,
            description: enteredDescription,
            startDate: enteredStartDate,
            endDate: enteredDueDate,
            ownerId: enteredOwner, // This will now securely be the User's ID!
            assignedToId: enteredAssignedTo,
            projectId: project.id
        }

        createTaskApi(taskData);
    }

    const createTaskApi = async (data) => {
        try {
            const response = await api.post("/task", data);
            const resData = response.data;
            const taskResData = {
                name: resData.name,
                description: resData.description,
                startDate: resData.startDate,
                endDate: resData.dueDate,
                status: resData.status,
                id: resData.id,
                assignedToName: resData.assignedToName
            }

            onAdd(taskResData);
            resetTaskForm();

        } catch (error) {
            console.error("Error Creating tasks", error);
        }
    }

    function resetTaskForm() {
        title.current.value = '';
        description.current.value = '';
        startDate.current.value = '';
        dueDate.current.value = '';
        owner.current.value = '';
        assignedToDropdown.current.value = '';
    }

    return (
        <div className="w-full">
            <Modal ref={modalRef}>
                <h2 className="text-xl font-bold text-stone-700 my-4" >Invalid Input</h2>
                <p className="text-stone-600 mb-4">Oops... looks like you forgot to enter a value.</p>
                <p className="text-stone-600 mb-4">Please make sure you provide a valid value for every input field.</p>
            </Modal>
            
            <div className="bg-stone-100 p-6 rounded-lg shadow-sm border border-stone-200">
                <h3 className="text-lg font-bold text-stone-700 mb-4 border-b border-stone-300 pb-2">
                    Create New Task
                </h3>
                
                <div className="flex flex-col gap-3">
                    <Input ref={title} label="Task Name" placeholder="Task Name" />
                    <Input ref={description} label="Description" placeholder="Task Description" textarea={true} />
                    <div className="flex gap-4">
                        <Input ref={startDate} label="Start Date" type="date" />
                        <Input ref={dueDate} label="Due Date" type="date" />
                    </div>
                    
                    {/* The NEW Task Owner Dropdown */}
                    <div className="flex flex-col gap-1 mt-2">
                        <label className="text-sm font-bold uppercase text-stone-500">Created By</label>
                        <select 
                            ref={owner} 
                            className="w-full p-2 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                            defaultValue=""
                        >
                            <option value="" disabled>Select User to Assign</option>
                            {users.map((u) => (
                                // Uses either userId or id depending on what your backend sends
                                <option key={u.userId || u.id} value={u.userId || u.id}>
                                    {u.userName || u.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1 mt-2">
                        <label className="text-sm font-bold uppercase text-stone-500">Assign Task Owner</label>
                        <select 
                            ref={assignedToDropdown} // Updated ref
                            className="w-full p-2 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
                            defaultValue=""
                        >
                            <option value="" disabled>Select User to Assign</option>
                            {users.map((u) => (
                                <option key={u.userId || u.id} value={u.userId || u.id}>
                                    {u.userName || u.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
                
                <menu className="flex items-center justify-end gap-4 mt-6">
                    <li>
                        <button
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 transition-colors shadow-sm w-full"
                            onClick={handleClick}
                        >
                            Add Task
                        </button>
                    </li>
                </menu>
            </div>
        </div>
    )
}