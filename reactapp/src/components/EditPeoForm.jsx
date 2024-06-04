import React, {useState} from 'react'

export const EditPeoForm = ({editPeo, descriptionPEO}) => {
    const [value, setValue] = useState(descriptionPEO.descriptionPEO)

    const handleSubmit = (e) => {
        e.preventDefault();
        editPeo(value,descriptionPEO.id);
        setValue("")
    }

  return (
    <>
        <tr>
          <td colSpan={3}>
          <form className='ObeForm' onSubmit={handleSubmit}>
            <div className='form-group'>
              <input type="text" className='form-input form-control' placeholder='Update Peo' value={value} onChange={(e) => setValue(e.target.value)} required/>
              <button type='submit' className='form-btn btn'>Update</button>
            </div>
          </form>
          </td>
        </tr>
        
    </>
  )
}
