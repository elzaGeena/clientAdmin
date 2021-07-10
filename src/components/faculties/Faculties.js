import React, { useState } from 'react'
import axios from 'axios'
import Input from '../Input'

const Faculties = ({ faculties, setFaculties, courseFetch }) => {
    const [fId, setFId] = useState("")
    const [name, setName] = useState("")
    const [courseText, setCourseText] = useState("")
    const [courses, setCourses] = useState([])
    const [placeholder, setPlaceholder] = useState("Add course")
    const courseTextChanger = (e) => {
        console.log(e.target.value)
        setCourseText(e.target.value)
    }
    const courseChanger = (e) => {
        setCourses(courses.concat(courseText))
        setCourseText("")
        setPlaceholder("add another course")
    }

    const addFaculty = (e) => {
        e.preventDefault();
        const facultyObject = {
            id: Math.floor(Math.random() * 30000),
            fId: fId,
            name: name,
            courses: courses
        }


        setFaculties(faculties.concat(facultyObject))
        console.log(faculties)

        axios.post(`http://localhost:5000/faculties`, facultyObject)
            .then(response => {
                console.log(response)

            })

        setFId("")
        setName("")
        setCourses([])
        setPlaceholder("Add Course")
    }

    const editHandler = (e) => {
        console.log(e.target.id)
        let facultyToEdit = faculties.filter(i => i.id == e.target.id)
        setFId(facultyToEdit[0].fId)
        setName(facultyToEdit[0].name)
        setCourses([])
        setFaculties(faculties.filter(f => f.id !== Number(e.target.id)))
        console.log("calling children", faculties)
    }
    const deleteHandler = (e) => {
        console.log(e)
        setFaculties(faculties.filter(f => f.id !== Number(e.target.id)))
    }

    const options = courseFetch.map(item =>
        <option value={item.courseName} >{item.courseName}</option>)
    const result = faculties.map(faculty =>
        <li key={faculty.id}>  {faculty.name}
            <button id={faculty.id} onClick={editHandler} >Edit</button>
            <button id={faculty.id} onClick={deleteHandler} >Delete</button></li>
    )
    return (
        <div>
            <h1>Faculty Information</h1>
            {result}

            <Input label="Faculty Id "
                type="text" name="" id="fId"
                placeholder="type id"
                newDetail={setFId} />


            <Input label="Name "
                type="text" name="" id="name"
                placeholder="type name ...."
                newDetail={setName} />

            <label for="course">courses</label>
            <select name="course" id="course" onChange={courseTextChanger}>{options}</select>

            <button type="submit" onClick={courseChanger}>{placeholder}</button>
            <br />

            <button onClick={addFaculty} >Add faculty</button>

            <li>Fid:{fId} name:{name} Course Text: {courseText}
                Course Added:{courses.map(course => <li>{course}</li>)}</li>
        </div>
    )
}

export default Faculties
