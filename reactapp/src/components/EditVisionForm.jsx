import React, {useState} from 'react'

export const EditVisionForm = ({editVision, description}) => {
    const [value, setValue] = useState(description.description)

    const handleSubmit = (e) => {
        e.preventDefault();
        editVision(value,description.id);
        setValue("")
    }

  return (
    <>
        <tr>
          <td colSpan={3}>
          <form className='ObeForm' onSubmit={handleSubmit}>
            <div className='form-group'>
                <input type="text" className='form-input form-control' placeholder='Update Vision' value={value} onChange={(e) => setValue(e.target.value)} required/>
            <button type='submit' className='form-btn btn'>Update</button>
            </div>
          </form>
          </td>
        </tr>
        
    </>
  )
}
