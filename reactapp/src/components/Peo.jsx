import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

export const Peo = ({descriptionPEO, index, deletePeo, editPeo, accessId}) => {
  return (
    <>
        <tr>
          <td>PEO{index+1}</td>
          <td>{descriptionPEO.descriptionPEO}</td>
          {accessId === '0' &&
            <td>
              <FontAwesomeIcon icon={faPenToSquare} onClick={() => editPeo(descriptionPEO.id)}/>
              <FontAwesomeIcon icon={faTrash} onClick={() => deletePeo(descriptionPEO.id)}/>
            </td>
          }
        </tr>
        
        
    </>
  )
}
