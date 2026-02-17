import React, { useEffect, useState } from 'react'

import { Edit, FileWarning, Trash, TriangleAlert } from 'lucide-react'
import axios from "axios";



const TableList = ({searchTerm, table, setIsUpdate, setEmployee, setIsDelete}) => {


    const filterData = (table || []).filter( employee => 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
        employee.job.toLowerCase().includes(searchTerm.toLowerCase()) || 
        employee.division.toLowerCase().includes(searchTerm.toLowerCase()) || 
        employee.status.toLowerCase().includes(searchTerm.toLowerCase())
     )

  return (
    <div  className='mx-7 my-7'>
        
            {/* {error && 
                <div className='mx-auto w-3 md:w-5 lg:w-lvh bg-base-300 p-10 rounded-3xl'>
                    <div className='flex flex-col items-center justify-center'>
                        <TriangleAlert className='text text-primary' size={50}/>
                        <h1 className='text-xl'>Error displaying the Table</h1>
                        <h1>heol</h1>
                        <h1>heol</h1>
                    </div>
                </div>
            } */}
        <table  className='table table-zebra'>
            <thead>
                <tr className='font-goog text-[17px] text-secondary'>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Job</th>
                    <th>Division</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody className='hover font-goog'>
                {filterData.map((info)=> (
                    <tr key={info.id}>
                        <th>{info.id}</th>
                        <th>{info.name}</th>
                        <td>{info.email}</td>
                        <th>{info.job}</th>
                        <th>{info.division}</th>
                        <td>
                            <button className={`btn rounded-2xl ${info.status === "oncall"? 'btn-primary' : 'btn-active'} `}>{info.status}</button>
                        </td>
                        <td>
                            <button className='btn btn-outline rounded-3xl' onClick={()=> {setEmployee(info); setIsUpdate(true);}}>
                                <Edit  size={25} />
                            </button>
                        </td>
                        <td>
                            <button className='btn btn-outline rounded-3xl' onClick={() => {setEmployee(info); setIsDelete(true);}}>
                                <Trash size={20} />
                            </button>
                            
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default TableList