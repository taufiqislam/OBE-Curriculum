import React, {useState} from 'react'

export const KnowledgeForm = ({addKnowledge}) => {
    const [value, setValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        addKnowledge(value);
        setValue("")
    }
  return (
    <form className='ObeForm' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor="" className='input-label'>Knowledge:</label>
        <input type="text" className='form-input form-control' placeholder='Enter Knowledge' value={value} onChange={(e) => setValue(e.target.value)} required/>
        <button type='submit' className='form-btn btn'>Add Knowledge</button>
      </div>
       
    </form>
  )
}
