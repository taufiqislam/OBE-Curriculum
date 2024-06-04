import React, {useState} from 'react'

export const SkillForm = ({addSkill}) => {
    const [value, setValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        addSkill(value);
        setValue("")
    }
  return (
    <form className='ObeForm' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor="" className='input-label'>Skill:</label>
        <input type="text" className='form-input form-control' placeholder='Enter Skill' value={value} onChange={(e) => setValue(e.target.value)} required/>
        <button type='submit' className='form-btn btn'>Add Skill</button>
      </div>
       
    </form>
  )
}

