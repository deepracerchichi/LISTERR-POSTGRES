import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import api from '../lib/axios';

const UpdateForm = ({setIsUpdate, table, employee, setTable}) => {

    const [email, setEmail]= useState(employee.email);
    const [name, setName]= useState(employee.name);
    const [job, setJob]= useState(employee.job);
    const [division, setDivision]= useState(employee.division);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState(employee.status);

    const handleChange = (e) => {
        setStatus(e.target.value) 
    }

    

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!email.trim() || !name.trim() || !job.trim() || !division.trim()) {
            toast.error("Fill all the fields before submission");
            return;
        }
        setIsLoading(true);
        try {
            
            const employeeData = {name, email, job, division, status};
            const response = await api.put(`/api/emp/${employee.id}`, employeeData);

            setTable(prev => prev.map(emp => 
                emp.id === employee.id ? response.data : emp
            ))

            toast.success("Employee Updated!");
            setIsUpdate(false)
        } catch (error) {
            toast.error("Error updating employee");
            console.log("Error updating employee", error);
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <dialog className='modal modal-open font-goog'>
        <div className='modal-box'>
            <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Edit the Employee</h3>
                <div className="modal-action mb-2">
                        <button className="btn" onClick={() => setIsUpdate(false)}>
                            <X size={22}/>
                        </button>
                </div>
            </div>
            <form className="p-4" onSubmit={handleSubmit}>
                <label className="input input-primary my-2 rounded-3xl">
                    <h1 className='text text-primary text-[16px]'>Name</h1>
                    <input type="text"  value={name} onChange={(e)=> setName(e.target.value)}/>
                </label>
                <label className="input input-primary my-2 rounded-3xl">
                    <h1 className="text text-primary text-[16px]">Email</h1>
                    <input type="text"  value={email} onChange={(e)=> setEmail(e.target.value)}/>
                </label>
                <label className="input input-primary my-2 rounded-3xl">
                    <h1 className="text text-primary text-[16px]">Job</h1>
                    <input type="text"  value={job} onChange={(e)=> setJob( e.target.value)}/>
                </label>
                <label className="input input-primary my-2 rounded-3xl">
                    <h1 className="text text-primary text-[16px]">Division</h1>
                    <input type="text"  value={division} onChange={(e)=> setDivision( e.target.value)}/>
                </label>
                {/* <h1>Status</h1> */}
                <select value={status} className="select select-primary my-2 flex items-center text-[16px] rounded-3xl" onChange={handleChange}>
                    <option className="text text-primary text-[16px]">oncall</option>
                    <option className="text text-primary text-[16px]">offcall</option>
                </select>
                <div className="modal-action">
                    <button className="btn btn-primary" type="submit" disabled={isLoading}>
                        {isLoading? "Updating..." : "Update Employee"}
                    </button>
                </div>
            </form>
        </div>
    </dialog>
  )
}

export default UpdateForm