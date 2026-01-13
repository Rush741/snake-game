import React from 'react';
import "./SnakeGame.css";

const SnakeGame = () => {
  return (
    <div className="container">
        <div className="boardContainer">
            <div className="score">
                <h1 className="currentScore">000</h1>
                <h1 className="highScore">000</h1>
            </div>
            <div className="board">
                <div className="playground">
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default SnakeGame;