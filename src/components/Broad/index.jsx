import { useState, useEffect } from "react";

import Square from "../Square";
import './Broad.scss';

function isEndTurn(broadSquares) {
    console.log('>>', broadSquares);
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
    // case tie
    if (broadSquares.filter(value => value !== null).length === 0) {
        return { endGame: false, isTie: false }
    }
    // case win or gaming
    else {
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if ([broadSquares[a], broadSquares[b], broadSquares[c]].every(item =>
                broadSquares[a] !== null && item === broadSquares[a])) {
                return { endGame: true, isTie: false };
            }
        }
        return { endGame: false, isTie: false };
    }
}

function Broad() {
    const [markCollect, setMarkCollect] = useState(Array(9).fill(null));
    const [nextMark, setNextMark] = useState(true)
    // const [isEndGame, setIsEndGame] = useState(false)
    const [gameStatus, setGameStatus] = useState({ isEndGame: false, isTie: false })

    useEffect(() => {
        // case default call by component did mount
        if (markCollect.every(item => item === null)) return;

        // check current step can do end game or not
        let checkResult = isEndTurn(markCollect);
        if (checkResult['endGame']) {
            // setIsEndGame(true);
            setGameStatus({
                isEndGame: checkResult['endGame'],
                isTie: checkResult['isTie']
            })
        } else {
            // update nextMark when square clicked
            setNextMark(!nextMark)
        }
    }, [markCollect])

    return (
        <div className="Broad">
            <div className="Broad__tools">
                {!gameStatus.isEndGame && <span><b> Next: {nextMark ? "X" : "O"}</b></span>}

                {gameStatus.isEndGame && !gameStatus.isTie && <span>Winner: {nextMark ? "X" : "O"}</span>}

                {gameStatus.isTie && <span>Tie</span>}

                {/* set action for restart game */}
                <button
                    onClick={() => {
                        setGameStatus({ isEndGame: false, isTie: false })
                        setMarkCollect(Array(9).fill(null))
                        setNextMark(true)
                    }}>
                    new Game
                </button>
            </div>

            <div className="Broad__game">
                {
                    (function () {
                        let resultSquares = [];
                        for (let i = 0; i < markCollect.length; i++) {
                            if (gameStatus.isEndGame || markCollect[i] !== null) {
                                resultSquares.push(<Square
                                    key={`square${i}`}
                                    disabled={true}
                                >
                                    {markCollect[i] === true && "X"}
                                    {markCollect[i] === false && "O"}
                                </Square>)
                            } else {
                                resultSquares.push(<Square
                                    key={`square${i}`}
                                    disabled={false}
                                    onClickSquare={() => {
                                        // update markCollet when square clicked
                                        setMarkCollect(() => {
                                            let result = [...markCollect]
                                            result[i] = nextMark
                                            return result
                                        })
                                    }}
                                >
                                    {""}
                                </Square>)
                            }
                        }
                        return resultSquares;
                    })()
                }
            </div>
        </div >)
}

export default Broad