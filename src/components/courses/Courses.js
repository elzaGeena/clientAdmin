import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Input from '../Input'
import Select from '../Select'

const Courses = ({ sem, courses, setCourses }) => {
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const [semester, setSemester] = useState(1)
    const [res, setRes] = useState([])

    useEffect(() => {
        children()
        console.log("Hello from semester")
    }, [semester, courses])
    const addCourse = (e) => {
        e.preventDefault();
        const courseObject = {
           // id: courses.length,
            semester: semester,
            courseCode: code,
            courseName: name,
        }

        axios.post(`http://localhost:5000/courses`, courseObject)
            .then(response => {
                console.log(response.data)
                setCourses(courses.concat(response.data))
                console.log(courses)
            })
        setCode(" ")
        setName(" ")
    }
    const editHandler = (e) => {
        console.log(e.target.id)
        let courseToEdit = courses.filter(i => i._id == e.target.id)
        setCode(courseToEdit[0].courseCode)
        setName(courseToEdit[0].courseName)
        setCourses(courses.filter(f => f._id !== Number(e.target.id)))
        console.log("calling children", courses)
    }
    const deleteHandler = (e) => {
        setCourses(courses.filter(f => f._id !== Number(e.target.id)))
    }

    const children = () => setRes(courses.filter(item => item.semester == semester))
    const result = res.map(course =>
        <div><li key={course._id}>
            {course.semester}
            {course.courseName}
            {course.courseCode}
            <button id={course._id} onClick={editHandler} >Edit</button>
            <button id={course._id} onClick={deleteHandler}>Delete</button>
        </li> </div>)
    return (
        <div >
            <h1>Course Information</h1>
            {result}
            <Select
                heading="Course Info"
                name="sem" id="sem"
                label="semester"
                setOption={setSemester}
                sem={sem} />
            <Input type="text"
                label="Course Code"
                value={code} id="courseCode"
                placeholder="type course code here..."
                newDetail={setCode} />
            <Input label="Course Name"
                value={name} type="text"
                name="" id="courseName"
                placeholder="type course name here..."
                newDetail={setName} />

            <button onClick={addCourse} >Add</button>
        </div>
    )
}

export default Courses
