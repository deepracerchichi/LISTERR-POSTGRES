import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import api from '../lib/axios'

const DeleteForm = ({setIsDelete, employee, setTable}) => {

  const handleSubmit = async() => {
    try {
      
      const response = await api.delete(`/api/emp/${employee.id}`);
      setTable(prev => prev.filter(emp => emp.id !== employee.id ));
      toast.success("Successfully Dleted the Employee");
      setIsDelete(false);
    } catch (error) {
      console.log("Error Dleting it from table", error)
      toast.error("Errror Deleting Employee from Table")
    } 
  }

  return (
    <dialog className='modal modal-open font-goog'>
      <div className='modal-box'>
        <div className='flex flex-col gap-8'>
          <h3 className='text text-primary text-[20px] font-bold text-center'>Are you sure you would like to delete {employee.name} from the Employees Table?</h3>

          <div className='flex flex-col items-center justify-between gap-4'>
            <button className='btn btn-secondary btn-outline rounded-3xl w-70' onClick={handleSubmit}>Yes</button>
            <button className='btn btn-primary rounded-3xl w-70' onClick={() => setIsDelete(false) }>No</button>
          </div>
        </div>
        
      </div>
    </dialog>
  )
}

export default DeleteForm