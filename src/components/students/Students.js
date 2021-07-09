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
            id: students.length + 1,
            semester: semester,
            rollNo: rollNo,
            regNo: regNo,
            name: name,
        }
        setStudents(students.concat(studentObject))
        console.log(students)

        axios.post(`http://localhost:5000/students`, studentObject)
            .then(response => {
                console.log(response)

            })
        setRollNo("")
        setRegno("")
        setName("")
    }

    const result = students.map(student =>
        <li key={student.id}>{student.name}</li>)
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
                id="rollNo" placeholder="type roll.no..."
                newDetail={setRollNo} />
            <Input
                label="Reg No"
                type="text" name=""
                id="regNo" placeholder="type reg.no..."
                newDetail={setRegno} />
            <Input label="Name"
                type="text" name="" id="name"
                placeholder="type name ...."
                newDetail={setName} />

            <button onClick={addStudent} >Add Student</button>
        </div>
    )
}

export default Students