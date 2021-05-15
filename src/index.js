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
      };
    }

    handleClick(i) {
      const history = this.state.history;
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
        xIsNext: !this.state.xIsNext, //if a square is clicked, xIsNext will change its value opposite to the current value
      });
    }

    render() {
      //display game's status
      const history = this.state.history;
      const current = history[history.length - 1];
      const winner = calculateWinner(current.squares);
      let status;
      const float1 = .1;
      const float2 = .2;
      const float3 = float1 + float2;
      if (winner) {
        status = 'Winner: ' + winner + ' Answer to float .1 + .2 is: ' + float3;
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
            <div>{ status }</div>
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
  