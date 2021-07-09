import React from 'react'
const Select = ({ heading, name, id, label, setOption, sem }) => {
    const optionChanger = (e) => {
        console.log(e.target.value)
        setOption(Number(e.target.value))
    }
    const selectOptions = () => {
        let arr = sem === "odd" ? [1, 3, 5, 7] : [2, 4, 6, 8];
        const options = arr.map(item => <option value={item} >{item}</option>)
        return options;
    }
    return (
        <div>
            <h3>{heading}</h3>
            <label for="sem">{label}</label>
            <select name={name} id={id} onChange={optionChanger}>{selectOptions()}</select>
        </div>
    )
}

export default Select
