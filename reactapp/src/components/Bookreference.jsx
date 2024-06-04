import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

export const BookReference = ({bookReference, index, deleteBookReference, editBookReference, accessId}) => {
  return (
    <>
        <tr>
          <td>{index+1}</td>
          <td>{bookReference.name}</td>
          <td>{bookReference.author}</td>
          <td>{bookReference.publisher}</td>
          <td>{bookReference.year}</td>
          <td>{bookReference.edition}</td>
          {accessId === '0' &&
          <td>
          <FontAwesomeIcon icon={faPenToSquare} onClick={() => editBookReference(bookReference.id)}/>
          <FontAwesomeIcon icon={faTrash} onClick={() => deleteBookReference(bookReference.id)}/>
          </td>
          }
        </tr>
        
        
    </>
  )
}
