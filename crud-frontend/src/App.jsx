import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {DeleteForm, HomePage, ModalForm, NavBar, TableList, UpdateForm} from './components'
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <>
        <Toaster />
        <Routes>
          
            <Route path='/' element={<HomePage />} />
            <Route path='/nav' element={<NavBar />}/>
            <Route path='/table' element={<TableList />}/>
            <Route path='/modal' element={<ModalForm />}/>
            <Route path='/update' element={<UpdateForm />}/>
            <Route path='/delete' element={<DeleteForm />}/>
        </Routes>
    </>
  )
}

export default App