import React, {Fragment} from 'react';

const ScoreBoard = ({scoreboard}) => {
  const renderScoreboard = scoreboard.map((frame, i) => {
    return (
    <td key={i.toString()}>
      <table className={`frame-board${i}`} style={{'border': '3px solid black'}}>
        <thead>
          <tr>
            <th>{frame[0]}</th>
          </tr>
        </thead>
        <tbody>
          <tr className={`ball-score${i}`}>
            <td>{frame[1][0]}</td>
            <td style={{border: '1px solid black', "backgroundColor": "#F5F5F5"}}>{frame[1][1]}</td>
            {frame[1][2] ? <td style={{'border': '1px solid black', "backgroundColor": "#F5F5F5"}}>{frame[1][2]}</td> : null}
          </tr>
          <tr className={`frame-score${i}`}>
    <td>{frame[2]}</td>
          </tr>
        </tbody>
      </table>
    </td>
    );
  });

  return (
    <Fragment>
      <h4>Scoreboard</h4>
      <table id='scoreboard'>
        <tbody>
          <tr>
            {renderScoreboard}
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
}

export default ScoreBoard;
