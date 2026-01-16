import {useEffect, useState, useRef} from 'react';
import "./SnakeGame.css";

const GRID_SIZE = 15;
const GAMEGRID = Array.from({ length: GRID_SIZE }, () =>
  new Array(GRID_SIZE).fill("")
);


const SnakeGame = () => {

    const [snakeBody, setSnakeBody] = useState([
        [5, 4],
        [5, 3],
        [5, 2]
    ]);
    let directionRef = useRef([0, 1]);
    let directionLockedRef = useRef(false);
    // let [lock, setLock] = useState(false);



    const isSnakeBodyDiv = (rowIndex, colIndex) => {
        return snakeBody.some(
            ([r, c]) => r === rowIndex && c === colIndex
        );
    }

    // const gamePause = () => {
    //     setLock(true);
    // }


    useEffect(() => {
        const handleKeyDown = (e) => {
            if(directionLockedRef.current) return;
            const [dx, dy] = directionRef.current;

            switch (e.key) {
            case "ArrowUp":
                if(dx !== 1) directionRef.current = [-1, 0];
                directionLockedRef.current = true;
                break;
            case "ArrowDown":
                directionLockedRef.current = true;
                if(dx !== -1) directionRef.current = [1, 0];
                break;
            case "ArrowLeft":
                directionLockedRef.current = true;
                if(dy !== 1) directionRef.current = [0, -1];
                break;
            case "ArrowRight":
                directionLockedRef.current = true;
                if(dy !== -1) directionRef.current = [0, 1];
                break;
            default:
                break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);

        const interval = setInterval(() => {
            setSnakeBody((prevSnakeBody) => {
                const newSnakeBody = prevSnakeBody.map((arr) => [...arr]);
                newSnakeBody.pop();
                const newHead = [newSnakeBody[0][0] + directionRef.current[0], newSnakeBody[0][1] + directionRef.current[1]];
                if(newHead[0]<0 || newHead[0]>=GRID_SIZE || newHead[1]<0 || newHead[1]>=GRID_SIZE) {
                    setSnakeBody([
                        [5, 4],
                        [5, 3],
                        [5, 2]
                    ]);
                    directionRef.current = [0, 1];
                    directionLockedRef.current = false;
                }
                newSnakeBody.unshift(newHead);
                
                directionLockedRef.current = false;
                return newSnakeBody;
            })
        }, 1000);

        return () => clearInterval(interval);
    }, []);
  return (
    <div className="container">
        <div className="boardContainer">
            <div className="score">
                <h1 className="currentScore">000</h1>
                <h1 className="highScore">000</h1>
            </div>
            <div className="board">
                <div className="playground">
                    {GAMEGRID.map((row, rowIndex) => (
                        <div className="row" key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <div className={`cell ${isSnakeBodyDiv(rowIndex, colIndex)? "snakeBodyDiv": ""}`} key={colIndex}>
                                    
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default SnakeGame;