import React, {useState} from 'react'

export const CloForm = ({addClo}) => {
    const [value, setValue] = useState("")
    const [level, setLevel] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        addClo(value,level);
        setValue("")
        setLevel("")
    }
  return (
    <form className='ObeForm' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor="" className='input-label'>CLO Description:</label>
        <input type="text" className='form-input form-control' placeholder='Enter CLO Description' value={value} onChange={(e) => setValue(e.target.value)} required/>
        <label htmlFor="" className='input-label'>CLO Knowledge Level:</label>
        <input type="text" className='form-input form-control' placeholder='Enter Knowledge level' value={level} onChange={(e) => setLevel(e.target.value)} required/>
        <button type='submit' className='form-btn btn'>Add CLO</button>
      </div>
       
    </form>
  )
}
