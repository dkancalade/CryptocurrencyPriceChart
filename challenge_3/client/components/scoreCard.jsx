import React, {Component, Fragment} from 'react';
import InputTable from './inputTable.jsx';
import StatTable from './statTable.jsx';

class ScoreCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreboard: this.makeScoreBoard(10),
      gameFinished: false,
      currentFrame: {
        number: 0,
        ball: 0,
        pinsDropped: 0,
        pinsLeft: 10
      }
    };
    this.inputClickHandler = this.inputClickHandler.bind(this);
    this.incrementRolls = this.incrementRolls.bind(this);
    this.makeScoreboard = this.makeScoreBoard.bind(this);
    this.updateScoreBoard = this.updateScoreBoard.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
  }

  incrementRolls(frame, ball, pins, pinsLeft) {
    if (frame === 0) {
      this.setState({
        scoreboard: this.makeScoreBoard(10),
        currentFrame: {
          number: frame,
          ball: ball,
          pinsDropped: pins,
          pinsLeft: pinsLeft
        }
      });
    } else {
      this.setState(
        {
          currentFrame: {
          number: frame,
          ball: ball,
          pinsDropped: pins,
          pinsLeft: pinsLeft
          }
        }, () => {
          this.updateScoreBoard(frame, ball, pins);
            // console.log('pins', this.state.currentFrame);
      });
    }
  }

  makeScoreBoard(frames) {
    const newBoard = [];
    for (let i = 1; i <= frames; i++) {
      if (i === 10) {
      newBoard.push([i, ['-', '-', '-'], '-']);
      } else {
        newBoard.push([i, ['-', '-'], '-']);
      }
    }
    return newBoard;
  }

  updateScoreBoard(frameNum, ball, droppedPins) {
    let previousScoreboard = [...this.state.scoreboard];
    let newScoreboard = previousScoreboard;
    newScoreboard[frameNum - 1][1][ball - 1] = droppedPins;
    const updatedScoreboard = this.calculateScore(newScoreboard, frameNum);
    this.setState({scoreboard: updatedScoreboard}, () => {
      // console.log('updated score', this.state);
    });
  };

  calculateScore(frame) {
    let currentBoard = [...this.state.scoreboard];
    let newBoard = currentBoard.map((round, i, oldBoard) => {
      console.log('round', round, i);
      if (round[2] === '-' || oldBoard[i + 1][1][0] === '-') {
        console.log('round', round);
        const firstBall = round[1][0];
        const secondBall = round[1][1];
        const thirdBall = round[1][2];
        if (firstBall !== 10) {
          //firstball only
          if (secondBall === '-') {
            round[2] = firstBall;
            return round;
          }
          // first and second ball
          if (secondBall < 10) {
            round[2] = firstBall + secondBall;
            return round;
          }
        }
      }
    });
    return newBoard;
  }

  inputClickHandler(target) {
    //restart
    if (target.innerHTML === 'Restart') {
      this.incrementRolls(0, 1, 0, 10);
    } else {
    //move forward game
      const previousFrame = this.state.currentFrame;
      const pins = Number.parseInt(target.innerHTML);
    //state will update as long as the pins inputted aren't more than possible to knock down
      if (( pins <= previousFrame.pinsLeft) || previousFrame.pinsLeft === 0 || previousFrame.ball === 2) {
        // for frames 1- 9 only
        if (previousFrame.number < 10) {
          console.log('frames 1 - 9');
          //for ball 1 if not a strike
          if (((previousFrame.ball === 0 || previousFrame.ball === 2) && pins < 10) || previousFrame.ball === 1 && previousFrame.pinsLeft === 0) {
            console.log('ball 1 not a strike');
            this.incrementRolls(previousFrame.number + 1, 1, pins, 10 - pins);
          //for ball 1 if a strike
          } else if (pins === 10 && (previousFrame.ball === 2 || previousFrame.ball === 0 || (previousFrame.ball === 1 && previousFrame.pinsLeft === 0))) {
            console.log('ball 1 a strike');
            console.log('previousFrame', previousFrame);
            this.incrementRolls(previousFrame.number + 1, 1, pins, 0);
          //for ball 2
          } else {
            console.log('ball 2');
            this.incrementRolls(previousFrame.number, 2, pins, 10 - pins - previousFrame.pinsDropped);
          }
        } else {
          // for frame 10
          // for ball 1
          if (previousFrame.ball === 1) {
            this.incrementRolls(previousFrame.number, 2, pins, 10 - pins);
          //for ball 2
          } else if (previousFrame.ball === 2) {
            //if strike or spare
            if (previousFrame.pinsLeft === 0) {
              this.incrementRolls(previousFrame.number, 3, pins, 10 - pins);
            }
          } else {
            // for ball 3
            this.incrementRolls(previousFrame.number, 3, pins, 10 - pins);
            this.setState({gameFinished: true}, () => {
              // console.log('this.state.gameFinished', this.state);
            })
          }
        }
      } else {
        // if invalid input is selected, cheating!!
        console.log('fallthrough', pins);
      }
    }
  }

  render() {
    return (
      <Fragment>
        <div id='statContainer'>
          <StatTable currentFrame={this.state.currentFrame} scoreboard={this.state.scoreboard}/>
        </div>
        <div id='inputContainer'>
          <InputTable
            remainingPins={this.state.currentFrame.pinsLeft}
            handleClick={this.inputClickHandler}
          />
        </div>
      </Fragment>
    );

  }
}


export default ScoreCard;