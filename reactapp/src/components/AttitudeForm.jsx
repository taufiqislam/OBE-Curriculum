import React, {useState} from 'react'

export const AttitudeForm = ({addAttitude}) => {
    const [value, setValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        addAttitude(value);
        setValue("")
    }
  return (
    <form className='ObeForm' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor="" className='input-label'>Attitude:</label>
        <input type="text" className='form-input form-control' placeholder='Enter Attitude' value={value} onChange={(e) => setValue(e.target.value)} required/>
        <button type='submit' className='form-btn btn'>Add Attitude</button>
      </div>
       
    </form>
  )
}
