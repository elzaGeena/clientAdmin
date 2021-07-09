import {useState,useEffect} from 'react'
import Courses from "./components/courses/Courses";
import SemDetails from "./components/semDetails/SemDetails";
import axios from 'axios'
import Students from './components/students/Students';
import Faculties from './components/faculties/Faculties';
function App() {
  const [dates, setDates] = useState({
    startDate: "01-08-2021",
    endDate: "31-12-2021" ,
    sem: "odd"
})
  const [sem, setSem] = useState(dates.sem)
  const [courses, setCourses] = useState([])
  const [students, setStudents] = useState([])
  const [faculties, setFaculties] = useState([])
 

  useEffect(() => {
    console.log("effect");
    axios.get('http://localhost:5000/dates').then(response => {
            console.log(response.data)
            setDates(response.data)
  })
    axios.get('http://localhost:5000/courses').then(response => {
        console.log(response.data)
        setCourses(response.data)  
    })
    axios.get('http://localhost:5000/students').then(response => {
      console.log(response.data)
      setStudents(response.data)
  })
  axios.get('http://localhost:5000/faculties').then(response => {
    console.log(response.data)
    setFaculties(response.data)
})
}, []);
  return (
    <div>
     hello admin
     <SemDetails sem={sem} setSem={setSem} dates={dates} setDates={setDates}/>
     <Courses sem={sem} courses={courses} setCourses={setCourses}/>
     <Students sem={sem} students={students} setStudents={setStudents}/>
     <Faculties faculties={faculties} setFaculties={setFaculties}
     courseFetch ={courses} />
    </div>
  );
}


export default App;
