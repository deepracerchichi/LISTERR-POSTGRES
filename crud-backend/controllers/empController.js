import { createNewEmployee, deleteNewEmployee, getAllEmployees, searchNewEmployee, updateNewEmployee } from "../services/empServices.js";


export const getEmployees = async(req, res) => {
    try {
        const employees = await getAllEmployees();
        res.status(200).json(employees);
        console.log("Successfully got all the employees")
    } catch (error) {
        console.log("Error in db", error)
        res.status(500).json({message: "There was an error in the db"});
    }
}

export const createEmployee = async(req, res) => {
    try {
        const employeeData = req.body;
        const newEmployee = await createNewEmployee(employeeData);
        res.status(200).json(newEmployee);
    } catch (error) {
        console.log("error creating the employee: ", error);
        res.status(500).json({message:"Unable to create new employee"});
    }
}

export const updateEmployee = async(req, res) => {
    try {
        const employeeData = req.body;
        const employeeId = req.params.id;
        const updatedEmployee = await updateNewEmployee(employeeData, employeeId);

        if(!updatedEmployee) {
            return res.status(404).json({message: "Employee not found"});
        }

        res.status(200).json(updatedEmployee);

    } catch (error) {
        console.log("Error in the update", error);
        res.status(500).json({message: "Error Updating Employee"});
    }


}

export const deleteEmployee= async(req, res) => {
    try {
        const employeeId = req.params.id
        const deleted = await deleteNewEmployee(employeeId);
        if (!deleted) {
            return res.status(404).json({message: "Employee not found"});
        }
        res.status(200).json(deleted);
    } catch (error) {
        console.log("Errror deleteing employee", error)
        res.status(500).json({message: "Unable to delete Employee"});

    }
}

export const searchEmployee = async(req, res) => {
    try {
        const searchTerm = req.query.q;
        const employees = await searchNewEmployee(searchTerm);
        res.status(200).json(employees)
    } catch (error) {
        console.log("Error searching", error);
        res.status(500).json({message: "Error in performing search"});
    }
}