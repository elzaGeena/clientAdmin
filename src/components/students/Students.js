import React, { useState } from 'react'
import axios from 'axios'
import Input from '../Input'
import Select from '../Select'

const Students = ({ sem, students, setStudents }) => {
    const [semester, setSemester] = useState(1)
    const [rollNo, setRollNo] = useState("")
    const [regNo, setRegno] = useState("")
    const [name, setName] = useState("")

    const addStudent = (e) => {
        e.preventDefault();
        const studentObject = {
            //id: Math.floor(Math.random()*30000),
            semester: semester,
            rollNo: rollNo,
            regNo: regNo,
            name: name,
        }
      

        axios.post(`http://localhost:5000/students`, studentObject)
            .then(response => {
                console.log(response.data)
                setStudents(students.concat(response.data))
                console.log(students)
            })
        setRollNo("")
        setRegno("")
        setName("")
    }
    const editHandler = (e) => {
        console.log(e.target.id)
        let studentToEdit = students.filter(i => i._id === e.target.id)
        setRollNo(studentToEdit[0].rollNo)
        setRegno(studentToEdit[0].regNo)
        setName(studentToEdit[0].name)
        axios.delete(`http://localhost:5000/students/${e.target.id}`)
            .then(response => setStudents(students.filter(f => f._id !== e.target.id)))
        console.log("calling children", students)
    }
    
    const deleteHandler = (e)=>{
        axios.delete(`http://localhost:5000/students/${e.target.id}`)
            .then(response => setStudents(students.filter(f => f._id !==e.target.id)))
    }
    const result = students.map(student =>
        <li key={student._id}>{student.name}
         <button id={student._id} onClick={editHandler} >Edit</button>
         <button id={student._id} onClick={deleteHandler} >delete</button></li>)
    return (
        <div>
            <h1>Student Information</h1>
            {result}

            <Select
                heading="Student Info"
                name="sem" id="sem"
                label="semester"
                setOption={setSemester}
                sem={sem} />
            <Input
                label="RollNo"
                type="text" name=""
                value={rollNo}
                id="rollNo" placeholder="type roll.no..."
                newDetail={setRollNo} />
            <Input
                label="Reg No"
                type="text" name=""
                value={regNo}
                id="regNo" placeholder="type reg.no..."
                newDetail={setRegno} />
            <Input label="Name"
                type="text" name="" id="name"
                value={name}
                placeholder="type name ...."
                newDetail={setName} />

            <button onClick={addStudent} >Add Student</button>
        </div>
    )
}

export default Students