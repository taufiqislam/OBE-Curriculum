import React, {useState} from 'react'

export const EditCourseForm = ({editCourse, course}) => {
    const [code, setCode] = useState(course.code)
    const [title, setTitle] = useState(course.title)
    

    const handleSubmit = (e) => {
        e.preventDefault();
        editCourse(code,title,course.id);
        setTitle("")
        setCode("")
    }

  return (
    <>
        <tr>
          <td colSpan={4}>
          <form className='ObeForm' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">Course Code:</label>
              <input type="text" className='form-input form-control' placeholder='Update Course Code' value={code} onChange={(e) => setCode(e.target.value)} required/>
              <label htmlFor="">Course Title:</label>
              <input type="text" className='form-input form-control' placeholder='Update Course Title' value={title} onChange={(e) => setTitle(e.target.value)} required/>
              <button type='submit' className='form-btn btn'>Update</button>
            </div>
          </form>
          </td>
        </tr>
        
    </>
    
  )
}
