import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

export const Skill = ({description, index, deleteSkill, editSkill, accessId}) => {
  return (
    <>
        <tr>
          <td>b{index+1}</td>
          <td>{description.description}</td>
          {accessId === '0' &&
          <td>
          <FontAwesomeIcon icon={faPenToSquare} onClick={() => editSkill(description.id)}/>
          <FontAwesomeIcon icon={faTrash} onClick={() => deleteSkill(description.id)}/>
          </td>
          }
        </tr>
        
        
    </>
  )
}
