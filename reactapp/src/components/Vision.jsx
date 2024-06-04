import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

export const Vision = ({description, index, deleteVision, editVision,accessId}) => {
  return (
    <>
        <tr>
          <td>V{index+1}</td>
          <td>{description.description}</td>
          {accessId === '0' && (
          <td>
            <div>
              <FontAwesomeIcon icon={faPenToSquare} onClick={() => editVision(description.id)}/>
              <FontAwesomeIcon icon={faTrash} onClick={() => deleteVision(description.id)}/>
            </div>
          </td>
          )}
        </tr>
        
        
    </>
  )
}
