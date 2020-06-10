import React, {Component, Fragment} from 'react';
import InputTable from './inputTable.jsx';
import StatTable from './statTable.jsx';

class ScoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreboard: this.emptyBoard,
      totalScore: 0,
      gameFinished: false,
      currentFrame: {
        number: 0,
        ball: 1,
        pinsDropped: 0,
        pinsLeft: 10
      },


    };
    this.emptyBoard = this.makeScoreBoard(10);
    this.inputClickHandler = this.inputClickHandler.bind(this);
    this.incrementRolls = this.incrementRolls.bind(this);
  }

  incrementRolls(frame, ball, pins, pinsLeft) {
    this.setState(
      {currentFrame: {
        number: frame,
        ball: ball,
        pinsDropped: pins,
        pinsLeft: pinsLeft
      }}, () => {
        console.log('pins', this.state.currentFrame);
    });
  }

  makeScoreBoard(frames) {
    const newBoard = [];
    for (let i = 1; i <= frames; i++) {
      newBoard.push[i, ['', '']];
    }
    return newBoard;
  }

  inputClickHandler(target) {
    const currentFrame = this.state.currentFrame;
    const pins = Number.parseInt(target.innerHTML);
    const scoreBoard = this.state.scoreboard;
    if (target.value === 'OK') {



    } else {
      if (currentFrame.number < 10) {
        if (currentFrame.ball === 1 && pins !== 10) {
          this.incrementRolls(currentFrame.number + 1, 1, pins, 10 - pins);
        } else if (currentFrame.ball === 1) {
          this.incrementRolls(currentFrame.number + 1, 1, pins, 0);
        } else {
          this.incrementRolls(currentFrame.number, 2, pins, 10 - pins - currentFrame.pinsDropped);
        }
      } else {
        console.log('10 frame state', this.state.currentFrame);
        if (currentFrame.ball === 1) {
          this.incrementRolls(currentFrame.number, 2, pins, 10 - pins);
        } else if (currentFrame.ball === 2) {
          if (currentFrame.pinsLeft === 0) {
            this.incrementRolls(currentFrame.number, 3, pins, 10 - pins);
          }
        } else {
          this.incrementRolls(currentFrame.number, 3, pins, 10 - pins);
          this.setState({gameFinished: true}, () => {
            console.log('this.state.gameFinished', this.state);
          })
        }
      }
    }
  }






  render() {
    return (
      <Fragment>
        <div id='statContainer'>
          <StatTable/>
        </div>
        <div id='inputContainer'>
          <InputTable
            handleClick={this.inputClickHandler}
          />
        </div>
      </Fragment>
    );

  }
}


export default ScoreCard;