import React, {useState} from 'react'

export const PloForm = ({addPlo}) => {
    const [value, setValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        addPlo(value);
        setValue("")
    }
  return (
    <form className='ObeForm' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor="" className='input-label'>PLO:</label>
        <input type="text" className='form-input form-control' placeholder='Enter Plo' value={value} onChange={(e) => setValue(e.target.value)} required/>
        <button type='submit' className='form-btn btn'>Add Plo</button>
      </div>
       
    </form>
  )
}
