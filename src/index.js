import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  function Square(props) {
    return (
      <button className="square" onClick = {props.onClick}>
        {props.value}
      </button>
    )
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  class Board extends React.Component {
    //method inside Board
    renderSquare(i) {
      return ( //what it will return
        <Square
        value={this.props.squares[i]} //sending states through props
        onClick= {() => this.props.onClick(i)} // will call props.onClick method
        />
        );
      }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    //setting up initial state within constructor
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
        //add state to know which step we are for rendering history
        stepNumber: 0,
      };
    }

    //method to change board history depending on the step
    jumpTo(step) {
      this.setState({
        //to update stepNumber
        stepNumber: step,
        //set boolean xIsNext if step is an even number
        xIsNext: (step % 2) === 0,
      });
    }

    handleClick(i) {
      //go back in one of the histories then throw away the future moves from the current stepNumber
      const history = this.state.history.slice(0, this.state.stepNumber +1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      //ignore clicks when square is already filled or someone already has won the round
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      // changes the letter to render on the square
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      //setting the state
      this.setState({
        history: history.concat([{ //how to concatenate arrays for immutability
          squares: squares,
        }]),
        stepNumber: history.length, //setting the stepNumber according to array history's length meaning we will show the most current step
        xIsNext: !this.state.xIsNext, //if a square is clicked, xIsNext will change its value opposite to the current value
      });
    }

    render() {
      //display game's status
      const history = this.state.history;
      const current = history[this.state.stepNumber];//show the current selected move accotding to stepNumber
      const winner = calculateWinner(current.squares);
      
      const moves = history.map((step, move) => {
        const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  