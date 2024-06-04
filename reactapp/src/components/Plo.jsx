import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

export const Plo = ({descriptionPLO, index, deletePlo, editPlo, accessId}) => {
  return (
    <>
        <tr>
          <td>PLO{index+1}</td>
          <td>{descriptionPLO.descriptionPLO}</td>
          {accessId === '0' &&
            <td>
              <FontAwesomeIcon icon={faPenToSquare} onClick={() => editPlo(descriptionPLO.id)}/>
              <FontAwesomeIcon icon={faTrash} onClick={() => deletePlo(descriptionPLO.id)}/>
            </td>
          }
        </tr>
        
        
    </>
  )
}
