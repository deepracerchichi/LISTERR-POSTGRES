import React, { useState } from 'react'
import NavBar from './NavBar'
import TableList from './TableList'
import ModalForm from './ModalForm'
import api from "../lib/axios"
import { useEffect } from 'react';
import UpdateForm from './UpdateForm';
import DeleteForm from './DeleteForm';


const HomePage = () => {
   const [table, setTable] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("")
    const [isUpdate, setIsUpdate] = useState(false)
    const [employee, setEmployee] = useState('')
    const [isDelete, setIsDelete] = useState(false)


    useEffect(()=> {

        const fetchTable = async() => {
            try {
                const response = await api.get("/api/emp");
                setTable(response.data);
                
            } catch (error) {
                console.log(error, "Error fetching the data to frontend")
                
            }
        };

        fetchTable();
    }, [])
  return (
    <main>
        <NavBar pagetitle={"LISTERR"} setIsModal={setIsModal} setSearchTerm={setSearchTerm} />
        <TableList searchTerm={searchTerm} table={table} setIsUpdate={setIsUpdate} setEmployee= {setEmployee} setIsDelete={setIsDelete}/>
        {isModal && <ModalForm  setIsModal={setIsModal} setTable={setTable}/>}
        {isUpdate && <UpdateForm setIsUpdate={setIsUpdate} table={table} employee= {employee} setTable={setTable}/>}
        {isDelete && <DeleteForm setIsDelete={setIsDelete} employee={employee} setTable={setTable}/>}
    </main>
  )
}

export default HomePage