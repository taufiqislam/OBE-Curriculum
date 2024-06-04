import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const Mission = ({ description, index, deleteMission, editMission, accessId }) => {
  return (
    <tr>
      <td>M{index + 1}</td>
      <td>{description.description}</td>
      {accessId === '0' && (
        <td>
          <FontAwesomeIcon icon={faPenToSquare} onClick={() => editMission(description.id)} />
          <FontAwesomeIcon icon={faTrash} onClick={() => deleteMission(description.id)} />
        </td>
      )}
    </tr>
  );
};

export default Mission;
