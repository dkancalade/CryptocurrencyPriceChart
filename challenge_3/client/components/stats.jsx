import React, {Fragment} from 'react';

const Stats = ({currentFrame}) => {
  return (
    <table id='stats' >
      <thead>
        <tr>
          <th>Current Game Statistics</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Current Frame</td>
          <td>Total Score</td>
        </tr>
        <tr id='currentStats'>
          <td id='frame'>{currentFrame.number}</td>
          <td id='score'>0</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Stats;