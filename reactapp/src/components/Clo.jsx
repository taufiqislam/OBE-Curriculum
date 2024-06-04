import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

export const Clo = ({descriptionCLO, index, deleteClo, editClo, accessId}) => {
  return (
    <>
        <tr>
          <td>CLO{index+1}</td>
          <td>{descriptionCLO.descriptionCLO}</td>
          <td>{descriptionCLO.knowledge_level}</td>
          {accessId === '0' &&
            <td>
            <FontAwesomeIcon icon={faPenToSquare} onClick={() => editClo(descriptionCLO.id)}/>
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteClo(descriptionCLO .id)}/>
            </td>
          }
        </tr>
        
        
    </>
  )
}
