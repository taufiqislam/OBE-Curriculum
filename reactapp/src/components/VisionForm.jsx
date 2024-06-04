import React, {useState} from 'react'

export const VisionForm = ({addVision}) => {
    const [value, setValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        addVision(value);
        setValue("")
    }
  return (
    <form className='ObeForm' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor="" className='input-label'>Vision:</label>
        <input type="text" className='form-input form-control' placeholder='Enter Vision' value={value} onChange={(e) => setValue(e.target.value)} required/>
        <button type='submit' className='form-btn btn'>Add Vision</button>
      </div>
       
    </form>
  )
}
