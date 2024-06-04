import React, {useState} from 'react'

export const PeoForm = ({addPeo}) => {
    const [value, setValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        addPeo(value);
        setValue("")
    }
  return (
    <form className='ObeForm' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor="" className='input-label'>PEO:</label>
        <input type="text" className='form-input form-control' placeholder='Enter Peo' value={value} onChange={(e) => setValue(e.target.value)} required/>
        <button type='submit' className='form-btn btn'>Add Peo</button>
      </div>
       
    </form>
  )
}
