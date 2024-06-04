import React, {useState} from 'react'

export const CourseObjectiveForm = ({addCourseObjective}) => {
    const [value, setValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        addCourseObjective(value);
        setValue("")
    }
  return (
    <form className='ObeForm' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor="" className='input-label'>Course Objective:</label>
        <input type="text" className='form-input form-control' placeholder='Enter Course Objective' value={value} onChange={(e) => setValue(e.target.value)} required/>
        <button type='submit' className='form-btn btn'>Add Course Objective</button>
      </div>
       
    </form>
  )
}
