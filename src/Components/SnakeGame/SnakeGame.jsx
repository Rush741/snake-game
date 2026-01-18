import {useEffect, useState, useRef} from 'react';
import "./SnakeGame.css";

const GRID_SIZE = 15;
const GAMEGRID = Array.from({ length: GRID_SIZE }, () =>
  new Array(GRID_SIZE).fill("")
);
const INITIAL_SNAKE = [
        [5, 4],
        [5, 3],
        [5, 2]
    ];


const SnakeGame = () => {

    const [snakeBody, setSnakeBody] = useState(INITIAL_SNAKE);
    let directionRef = useRef([0, 1]);
    let directionLockedRef = useRef(false);
    
    const generateFood = (snakeBody) => { 
        let x, y; 
        let onSnakeBody = true; 
        
        while(onSnakeBody) { 
            x = Math.floor(Math.random()*GRID_SIZE); 
            y = Math.floor(Math.random()*GRID_SIZE); 
            // eslint-disable-next-line
            onSnakeBody = snakeBody.some( 
                ([r, c]) => r === x && c === y ); 
        } 

        return [x, y]; 
    }

    let foodRef = useRef(null);
    if (foodRef.current === null) {
        foodRef.current = generateFood(snakeBody);
    }

    const isSnakeBodyDiv = (rowIndex, colIndex) => {
        return snakeBody.some(
            ([r, c]) => r === rowIndex && c === colIndex
        );
    }


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
                if(dx !== -1) directionRef.current = [1, 0];
                directionLockedRef.current = true;
                break;
            case "ArrowLeft":
                if(dy !== 1) directionRef.current = [0, -1];
                directionLockedRef.current = true;
                break;
            case "ArrowRight":
                if(dy !== -1) directionRef.current = [0, 1];
                directionLockedRef.current = true;
                break;
            default:
                break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        
        const interval = setInterval(() => {
            setSnakeBody((prevSnakeBody) => {
                const newSnakeBody = prevSnakeBody.map((arr) => [...arr]);
                
                const newHead = [newSnakeBody[0][0] + directionRef.current[0], newSnakeBody[0][1] + directionRef.current[1]];
                
                if(newHead[0]<0 || newHead[0]>=GRID_SIZE || newHead[1]<0 || newHead[1]>=GRID_SIZE || prevSnakeBody.some(([x, y]) => x === newHead[0] && y === newHead[1])) {
                    
                    //RESET CODE
                    setSnakeBody(INITIAL_SNAKE);         

                    directionRef.current = [0, 1];
                    directionLockedRef.current = false;
                    
                }


                const ateFood =
                    newHead[0] === foodRef.current[0] &&
                    newHead[1] === foodRef.current[1];

                if (ateFood) {
                    foodRef.current = generateFood(prevSnakeBody);
                } else {
                    newSnakeBody.pop();
                }
                
                newSnakeBody.unshift(newHead);
                
                directionLockedRef.current = false;
                return newSnakeBody;
            })
        }, 100);
        
        
        return () => {
            clearInterval(interval);
            window.removeEventListener("keydown", handleKeyDown)
        }
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
                                <div className={`cell ${isSnakeBodyDiv(rowIndex, colIndex)? "snakeBodyDiv": ""} ${foodRef.current[0] === rowIndex && foodRef.current[1] === colIndex? "foodBodyDiv": ""}`} key={colIndex}>
                                    
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