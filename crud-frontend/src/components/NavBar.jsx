import React from 'react'
import { NavLinks } from '../../public/constants/NavLinks'
import { Link } from 'react-router-dom'
// Add useState to the import
import  { useState } from 'react'

import { Search, SearchAlert } from 'lucide-react'


const NavBar = ({pagetitle, setIsModal, setSearchTerm}) => {
    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    
  return (

    <div className=' bg-base-300'>
        <div className=' flex justify-between items-center mx-5 p-4 text-primary'>
            <div>
                <h1 className=' text-5xl font-pix text text-primary'>{pagetitle}</h1>
            </div>

            

            <div className='form-control'> 
                <input type='text' placeholder='Search' className='rounded-3xl font-goog input input-secondary w-48 md:w-auto' onChange={handleChange} />
            </div>

            <div>
                <button className='btn btn-secondary font-goog rounded-3xl' onClick = { () => setIsModal(true) }>Add Employee</button>
            </div>

            {/* <div>
                <ul className='gap-3 flex'>
                    {NavLinks.map(({name, link})=> (
                        <li key={name}>
                            <Link to={link} >
                                <h1>{name}</h1>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>

    </div>

  )
}

export default NavBar