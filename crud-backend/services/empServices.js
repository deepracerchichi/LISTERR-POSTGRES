import { query } from "../db.js";

 export const getAllEmployees = async() => {
    try {
        const result = await query("SELECT * FROM emp_tb ORDER by id ASC");
        return result.rows
       
    } catch (error) {
        console.log("ERROR in the services: ", error);
       
    }
}

export const createNewEmployee = async(employeeData) => {
    try {
        const {name, email, job, division, status} = employeeData;
        const {rows} = await query(`INSERT INTO emp_tb (name, email, job, division, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, email, job, division, status])
            return rows[0];
    } catch (error) {
        console.log("error creating employees", error);
    }
}

export const updateNewEmployee = async(employeeData, employeeId) => {
    try {
        const {name, email, job, division, status} = employeeData;
        const {rows} = await query(
            `UPDATE emp_tb SET name = $1, email = $2, job = $3, division = $4, status = $5 WHERE id = $6 RETURNING *`, 
            [name, email, job, division, status, employeeId]
        )
        return rows[0];
    } catch (error) {
        console.log("Error in the service update", error)
    }

}

export const deleteNewEmployee = async(employeeId) => {
    try {
        const {rowCount} = await query(`DELETE FROM emp_tb WHERE id = $1`, [employeeId])
        return rowCount > 0;

    } catch (error) {
        console.log("Error deleting it from the service", error)
    }
}

export const searchNewEmployee = async(searchTerm) => {
    try {
        const {rows} = await query(`SELECT * FROM emp_tb WHERE name ILIKE $1 OR email ILIKE $1`, [`%${searchTerm}%`])
            return rows;
    } catch (error) {
        console.log("ERROR SEARCH IN THE SERVICE", error)
    }
}

