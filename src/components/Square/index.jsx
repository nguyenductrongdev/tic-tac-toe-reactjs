import { useRef } from "react";
import "./Square.scss"

function Square(props) {
    const { disabled, mark, onClickSquare } = props
    return (
        <span
            className="Square"
            onClick={() => {
                !disabled && onClickSquare && onClickSquare()
            }}>
            {props.children}
        </span>)
}

export default Square