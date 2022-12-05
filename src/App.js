//Phoenix Armand Ani
import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import Axios from 'axios';


function Home() {

  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [gender, setGender] = useState('');
  const [salary, setSalary] = useState(0);

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

  const addEmployee = () =>{
    Axios.post("https://fullstack-backend.vercel.app/insert", {
      fName : fName,
      lName: lName,
      gender: gender,
      salary: salary
    })
  }

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
    Axios.delete(`https://fullstack-backend.vercel.app/delete/${id}`);
  }

  const [show, setShow] = useState(false)
  

  return (
    <div className="App">
      <h1>Full-Stack Assignment 02</h1>

      <label>First Name : </label>
      <input 
        type="text"
        onChange={(event) => {
          setFName(event.target.value);
        }} 
      />
      <label>Last Name : </label>
      <input 
        type="text"
        onChange={(event) => {
          setLName(event.target.value);
        }}  
      />
      <label>Gender : </label>
      <input 
        type="text"
        onChange={(event) => {
          setGender(event.target.value);
        }}  
      />
      <label>Salary : </label>
      <input 
        type="number"
        onChange={(event) => {
          setSalary(event.target.value);
        }}  
      />
      <button onClick={addEmployee}>Add Employee</button>
      

      <br/>

      <h1>Employees List</h1>
      
      <button onClick={()=>setShow(true)}>View List</button>
      <button onClick={()=>setShow(false)}>Hide List</button>
        
      <div className='Whole'>
      {employeeList.map((val, key) => {
        return (
          <div>{ show?
          <div key={key} className="employee">
            <h3>First Name : {val.first_name}</h3> 
            <h3>Last Name : {val.last_name}</h3> 
            <h3>Gender : {val.gender}</h3> 
            <h3>Salary : {val.salary}</h3>{" "}

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
      : null }</div>
        );
      })}
    </div>
    </div>   
  );
}

export default Home;
