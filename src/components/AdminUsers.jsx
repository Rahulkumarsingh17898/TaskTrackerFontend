import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../services/api"; // Adjust import path as needed

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Form state for creating a user
    const [formData, setFormData] = useState({
        name: "", // Note: Maps to your Java 'Name'
        email: "",
        department: ""
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get("/user");
            setUsers(response.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            // Keys match your CreateUserRequest model in Spring Boot
            const payload = {
                name: formData.name, 
                email: formData.email,
                department: formData.department
            };

            await api.post("/user", payload);
            toast.success("User created successfully!");
            setIsCreateModalOpen(false);
            setFormData({ name: "", email: "", department: "" }); // reset form
            fetchUsers(); // Refresh the table
        } catch (error) {
            console.error("Error creating user", error);
            toast.error("Failed to create user");
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            // Calls the PUT endpoint we added to Spring Boot
            await api.put(`/user/${userId}/role?roleName=${newRole}`);
            toast.success("Role updated successfully!");
            fetchUsers(); // Refresh to show new role
        } catch (error) {
            console.error("Error updating role", error);
            toast.error("Failed to update role");
        }
    };

    return (
        // <div className="p-8 max-w-7xl mx-auto">
        <div className="min-h-[calc(100vh-74px)] p-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-stone-800">Manage Users</h1>
                    <p className="text-stone-500 mt-1">View all users, create new accounts, and assign roles.</p>
                </div>
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-stone-800 text-white px-6 py-2 rounded-md hover:bg-stone-900 transition-colors shadow-sm"
                >
                    + Create New User
                </button>
            </div>

            {/* Users Table */}
            <div className="bg-white shadow-sm border border-stone-200 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-stone-50 text-stone-600 border-b border-stone-200 text-sm uppercase tracking-wider">
                            <th className="p-4 font-semibold">Name</th>
                            <th className="p-4 font-semibold">Email</th>
                            {/* <th className="p-4 font-semibold">Department</th> */}
                            <th className="p-4 font-semibold">Current Role</th>
                            <th className="p-4 font-semibold">Assign Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" className="text-center p-8 text-stone-500">Loading users...</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan="5" className="text-center p-8 text-stone-500">No users found.</td></tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.userId || user.id} className="border-b border-stone-100 hover:bg-stone-50">
                                    <td className="p-4 font-medium text-stone-800">{user.userName || user.name}</td>
                                    <td className="p-4 text-stone-600">{user.email}</td>
                                    {/* <td className="p-4 text-stone-600">{user.department || 'N/A'}</td> */}
                                    <td className="p-4">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                            {/* Adjust based on how your backend sends the role */}
                                            {user.role?.roleName || "NO_ROLE"}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <select 
                                            className="border border-stone-300 rounded p-1 text-sm bg-white"
                                            onChange={(e) => handleRoleChange(user.userId || user.id, e.target.value)}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Change Role...</option>
                                            <option value="ROLE_USER">User</option>
                                            <option value="ROLE_ADMIN">Admin</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create User Modal / Overlay */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl w-[400px]">
                        <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b pb-2">Add New User</h2>
                        
                        <form onSubmit={handleCreateUser} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-stone-600 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    required
                                    className="w-full border border-stone-300 p-2 rounded focus:outline-none focus:border-stone-500"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-stone-600 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    required
                                    className="w-full border border-stone-300 p-2 rounded focus:outline-none focus:border-stone-500"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-stone-600 mb-1">Department</label>
                                <input 
                                    type="text" 
                                    className="w-full border border-stone-300 p-2 rounded focus:outline-none focus:border-stone-500"
                                    value={formData.department}
                                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button 
                                    type="button" 
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="px-4 py-2 text-stone-600 hover:text-stone-900 font-medium"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-4 py-2 bg-stone-800 text-white rounded hover:bg-stone-900 font-medium"
                                >
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}