import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Input from '../Input';

const SemDetails = ({sem,setSem, dates, setDates}) => {
    const [newDateStart, setNewDateStart] = useState("01-08-2021");
    const [newDateEnd, setNewDateEnd] = useState("31-12-2021");
    
    
   
    const addDate = (e) => {
        e.preventDefault();
        const dateObject = {
            startDate: newDateStart,
            endDate: newDateEnd,
            sem: sem
        }
        setDates(dateObject)
        console.log(dates)

        axios.post(`http://localhost:5000/dates`, dateObject)
            .then(response => {
                console.log(response)
            })
        setNewDateStart("")
        setNewDateEnd("")
    }
    return (
        <div>
            <h1>Semester Information</h1>
            <li key={0}>Start: {dates.startDate}</li>
            <li key={1}>End: {dates.endDate}</li>
            <li key={2}>Sem: {dates.sem}</li>

            <form>
                <Input type="date" label="select start date:" value={newDateStart} newDetail={setNewDateStart}/>
                <Input type="date" label="select end date:" newDetail={setNewDateEnd} value={newDateEnd} />
                <Input label="odd" type="radio" id="odd" name="sem" value="odd" newDetail={setSem} />
                <Input label="even" type="radio" id="even" name="sem" value="even" newDetail={setSem} />
                <button type="submit" onClick={addDate}>submit</button>
            </form>

        </div>
    )
}

export default SemDetails
