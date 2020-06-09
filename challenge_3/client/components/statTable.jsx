import React, {Fragment} from 'react';
import Stats from './stats.jsx'
import ScoreBoard from './scoreBoard.jsx';

const StatTable = (props) => {
  return (
    <Fragment>
      <Stats/>
      <ScoreBoard/>
    </Fragment>
  );
};

export default StatTable;