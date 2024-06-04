import React, {useState} from 'react'

export const EditPloForm = ({editPlo, descriptionPLO}) => {
    const [value, setValue] = useState(descriptionPLO.descriptionPLO)

    const handleSubmit = (e) => {
        e.preventDefault();
        editPlo(value,descriptionPLO.id);
        setValue("")
    }

  return (
    <>
        <tr>
          <td colSpan={3}>
          <form className='ObeForm' onSubmit={handleSubmit}>
            <div className='form-group'>
              <input type="text" className='form-input form-control' placeholder='Update Plo' value={value} onChange={(e) => setValue(e.target.value)} required/>
              <button type='submit' className='form-btn btn'>Update</button>
            </div>
          </form>
          </td>
        </tr>
        
    </>
  )
}
