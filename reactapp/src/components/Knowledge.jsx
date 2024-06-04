import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

export const Knowledge = ({description, index, deleteKnowledge, editKnowledge, accessId}) => {
  return (
    <>
        <tr>
          <td>a{index+1}</td>
          <td>{description.description}</td>
          {accessId === '0' &&
          <td>
          <FontAwesomeIcon icon={faPenToSquare} onClick={() => editKnowledge(description.id)}/>
          <FontAwesomeIcon icon={faTrash} onClick={() => deleteKnowledge(description.id)}/>
          </td>
          }
        </tr>
        
        
    </>
  )
}
