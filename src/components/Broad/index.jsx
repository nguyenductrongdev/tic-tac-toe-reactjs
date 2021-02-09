import { useState } from "react";

import Square from "../Square";
import './Broad.scss';

function Broad() {
    const [markCollect, setMarkCollect] = useState(Array(9).fill(null));
    const [nextMark, setNextMark] = useState(true)

    let handleSquareClick = (idx, mark) => {
        // update markCollet when square clicked
        setMarkCollect(() => {
            let result = [...markCollect]
            result[idx] = mark
            return result
        })
        // update nextMark when square clicked
        setNextMark(!nextMark)
    }

    return (
        <div className="Broad">
            <div className="Broad__tools">
                {/* set action for restart game */}
                <button
                    onClick={() => setMarkCollect(Array(9).fill(null))}>
                    new Game
                </button>
            </div>

            <div className="Broad__game">
                {
                    (function () {
                        console.log(markCollect);
                        return markCollect.map((value, index) => {
                            switch (value) {
                                case null:
                                    return <Square
                                        key={`square${index}`}
                                        mark={nextMark}
                                        onClickSquare={() => handleSquareClick(index, nextMark)}
                                    >
                                        {""}
                                    </Square>

                                case true:
                                case false:
                                    return <Square
                                        key={`square${index}`}
                                        mark={value}
                                        disabled={true}
                                    >
                                        {markCollect[index] ? "X" : "O"}
                                    </Square>
                            }
                        })
                    })()
                }
            </div>
        </div>)
}

export default Broad