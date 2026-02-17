import { X } from "lucide-react";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../lib/axios";

const ModalForm = ({ setIsModal, setTable}) => {
    const [email, setEmail]= useState('');
    const [name, setName]= useState('');
    const [job, setJob]= useState('');
    const [division, setDivision]= useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState("oncall");
    

    const handleChange = (e) => {
        setStatus(e.target.value) 
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!email.trim() || !name.trim() || !division.trim() || !job.trim()) {
            toast.error("Please fill in the required fields");
            return;
        }

        setIsLoading(true)

        try {
            
            const employeeData = {name, email, job, division, status};
             const response= await api.post("/api/emp", employeeData);
             console.log("POST response:", response.data)
            toast.success("Employee created!");
            
            setTable(prev => [...prev, response.data])

            setIsModal(false)
            



        } catch (error) {
            toast.error("Error creating employee");
            console.log("Error creating employee", error);
        } finally {
            setIsLoading(false)
        }
        
    }



  return (
    <dialog className="modal modal-open font-goog">
        <div className="modal-box">
            <div className="flex items-center justify-between ">
                <h3 className="font-bold text-lg">Enter Employee Information</h3>
                <div className="modal-action mb-2">
                        <button className="btn" onClick={() => setIsModal(false)}>
                            <X size={22}/>
                        </button>
                </div>
            </div>
            
            <form className="p-4" onSubmit={handleSubmit}>
                <h1>Name</h1>
                <label className="input input-secondary my-2 rounded-3xl">
                    <input type="text" placeholder="Enter Name" value={name} onChange={(e)=> setName(e.target.value)}/>
                </label>
                <h1>Email</h1>
                <label className="input input-secondary my-2 rounded-3xl">
                    
                    <input type="text" placeholder="Enter Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </label>
                <h1>Job</h1>
                <label className="input input-secondary my-2 rounded-3xl">
                    
                    <input type="text" placeholder="Enter Job"value={job} onChange={(e)=> setJob(e.target.value)} />
                </label>
                <h1>Division</h1>
                <label className="input input-secondary my-2 flex items-center w-full rounded-3xl">
                    
                    <input type="text" placeholder="Enter Division" value={division} onChange={(e)=> setDivision(e.target.value)}/>
                </label>
                <h1>Status</h1>
                <select value={status} className="select select-secondary my-2 flex items-center rounded-3xl" onChange={handleChange}>
                    <option className="">oncall</option>
                    <option className="">offcall</option>
                </select>
                <div className="modal-action">
                    <button className="btn btn-primary rounded-3xl" type="submit" disabled={isLoading}>
                        {isLoading? "Creating..." : "Create Employee"}
                    </button>
                </div>
            </form>
        </div>
        <div className="modal-backdrop" onClick={() => setIsModal(false)}/>
    </dialog>
  )
}

export default ModalForm;