import React, {Fragment} from 'react';
import Stats from './stats.jsx'
import ScoreBoard from './scoreBoard.jsx';

const StatTable = ({currentFrame, scoreboard}) => {

  return (
    <Fragment>
      <Stats currentFrame={currentFrame}/>
      <ScoreBoard scoreboard={scoreboard}/>
    </Fragment>
  );
};

export default StatTable;