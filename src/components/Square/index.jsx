import "./Square.scss"

function Square(props) {
    const { disabled, onClickSquare } = props
    return (
        <span
            className="Square"
            onClick={() => {
                if (disabled === true) return;
                onClickSquare && onClickSquare()
            }}>
            {props.children}
        </span>)
}

export default Square