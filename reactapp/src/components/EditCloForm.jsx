import React, {useState} from 'react'

export const EditCloForm = ({editClo, descriptionCLO}) => {
    const [value, setValue] = useState(descriptionCLO.descriptionCLO)
    const [level, setLevel] = useState(descriptionCLO.knowledge_level)

    const handleSubmit = (e) => {
        e.preventDefault();
        editClo(value,level,descriptionCLO.id);
        setValue("")
    }

  return (
    <>
        <tr>
          <td colSpan={4}>
          <form className='ObeForm' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="">CLO Description:</label>
              <input type="text" className='form-input form-control' placeholder='Update CLO Description' value={value} onChange={(e) => setValue(e.target.value)} required/>
              <label htmlFor="">CLO Knowledge Level:</label>
              <input type="text" className='form-input form-control' placeholder='Update Knowledge Level' value={level} onChange={(e) => setLevel(e.target.value)} required/>
              <button type='submit' className='form-btn btn'>Update</button>
            </div>
          </form>
          </td>
        </tr>
        
    </>
    
  )
}
