const Input = ({id,type,name,value,label,newDetail,placeholder}) => {
    const addNewDetails = (e) => {
        console.log(e.target.value)
        newDetail(e.target.value)
    }
    return (
        <div>
            <label for={id}>{label}</label>
            <input type={type} id={id} name={name} value={value} onChange={addNewDetails}
             placeholder={placeholder}/>
        </div>
    )
}

export default Input
