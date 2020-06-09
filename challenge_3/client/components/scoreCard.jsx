import React, {Component, Fragment} from 'react';
import InputTable from './inputTable.jsx';
import StatTable from './statTable.jsx';

class ScoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreboard: this.emptyBoard,
      currentFrame: 1,
      currentScore: 0
    };
    this.emptyBoard = this.makeScoreBoard(10);
  }

  makeScoreBoard(frames) {
    const newBoard = [];
    for (let i = 1; i <= frames; i++) {
      newBoard.push[i, ['', '']];
    }
    return newBoard;
  }





  render() {
    return (
      <Fragment>
        <div id='statContainer'>
          <StatTable/>
        </div>
        <div id='inputContainer'>
          <InputTable/>
        </div>
      </Fragment>
    );

  }
}


export default ScoreCard;