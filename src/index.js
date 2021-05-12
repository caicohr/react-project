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
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
      };
    }

    handleClick(i) {
      const squares = this.state.squares.slice();
      //ignore clicks when square is already filled or someone already has won the round
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      // changes the letter to render on the square
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      //setting the state
      this.setState({
        squares: squares, //the square clicked
        xIsNext: !this.state.xIsNext, //if a square is clicked, xIsNext will change its value opposite to the current value
      });
    }

    //method inside Board
    renderSquare(i) {
      return ( //what it will return
      <Square value={this.state.squares[i]} //what square we're calling this method into
      onClick= {() => this.handleClick(i)} // calls handleClick(i) method inside this(Board)
      />
      );
    }
  
    render() { //what this Board renders
      const winner = calculateWinner(this.state.squares); // variable winner get its value using calculateWinner method
      let status;
      if (winner) { // if winner has value,
        status = 'Winner: ' + winner; //set status to the winner
      } else { // if we still don't have a value of the winner,
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); //Change player
      }
  
      return (
        <div>
          <div className="status">{status}</div>
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
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
  