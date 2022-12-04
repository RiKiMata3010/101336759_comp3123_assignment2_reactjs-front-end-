import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import ("./App.js");


function App (){

const [employeeList, setEmployeeList] = useState([])
const [newFName, setNewFName] = useState('')
const [newLName, setNewLName] = useState('')
const [newGender, setNewGender] = useState('')
const [newSalary, setNewSalary] = useState(0)
  
useEffect(() => {
    Axios.get("https://fullstack-backend.vercel.app/read").then((response) => {
    setEmployeeList(response.data)
    });
}, []);

const updateEmployee = (id) => {
    Axios.put("https://fullstack-backend.vercel.app/update", {
        id: id,
        newFName: newFName,
        newLName: newLName,
        newGender: newGender,
        newSalary: newSalary
    })
}
const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
}
return(

<div>

<h1>Employee List</h1>

{employeeList.map((val, key) => {
    return (
      <div key={key} className="employee"> 
        <h1>{val.first_name}</h1> 
        <h1>{val.last_name}</h1> 
        <h1>{val.gender}</h1> 
        <h1>{val.salary}</h1>{" "}

        <input 
          type="text" 
          placeholder="New First Name : "
          onChange={(event) => {
            setNewFName(event.target.value);
          }}
          />
          <input 
          type="text" 
          placeholder="New Last Name : "
          onChange={(event) => {
            setNewLName(event.target.value);
          }}
          />
          <input 
          type="text" 
          placeholder="New Gender : "
          onChange={(event) => {
            setNewGender(event.target.value);
          }}
          />
          <input 
          type="number" 
          placeholder="New Salary : "
          onChange={(event) => {
            setNewSalary(event.target.value);
          }}
          />
        <button onClick={()=> updateEmployee(val._id)}> Update</button>
        <button onClick={()=> deleteEmployee(val._id)}> Delete</button>
      </div>
    );
  })}
  </div>
)}
export default App
