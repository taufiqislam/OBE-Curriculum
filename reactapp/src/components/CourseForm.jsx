import React, {useState} from 'react'

export const CourseForm = ({addCourse}) => {
    const [code, setCode] = useState("")
    const [title, setTitle] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        addCourse(code,title);
        setCode("");
        setTitle("");
    }
  return (
    <form className='ObeForm' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor="" className='input-label'>Course Code:</label>
        <input type="text" className='form-input form-control' placeholder='Enter Course Code' value={code} onChange={(e) => setCode(e.target.value)} required/>
        <label htmlFor="" className='input-label'>Course Title:</label>
        <input type="text" className='form-input form-control' placeholder='Enter Course Title' value={title} onChange={(e) => setTitle(e.target.value)} required/>
        <button type='submit' className='form-btn btn'>Add Course</button>
      </div>
       
    </form>
  )
}
