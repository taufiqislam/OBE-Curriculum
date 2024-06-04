import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

export const Attitude = ({description, index, deleteAttitude, editAttitude,accessId}) => {
  return (
    <>
        <tr>
          <td>c{index+1}</td>
          <td>{description.description}</td>
          {accessId === '0' &&
          <td>
          <FontAwesomeIcon icon={faPenToSquare} onClick={() => editAttitude(description.id)}/>
          <FontAwesomeIcon icon={faTrash} onClick={() => deleteAttitude(description.id)}/>
          </td>
          }
        </tr>
        
        
    </>
  )
}
