import React, {useState} from 'react';

export const MissionForm = ({addMission}) => {
    const [value, setValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        addMission(value);
        setValue("")
    }
  return (
    <form className='ObeForm' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor="" className='input-label'>Mission:</label>
        <input type="text" className='form-input form-control' placeholder='Enter Mission' value={value} onChange={(e) => setValue(e.target.value)} required/>
        <button type='submit' className='form-btn btn'>Add Mission</button>
      </div>
       
    </form>
  )
}