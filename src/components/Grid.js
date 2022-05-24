const reverse = arr => {
    let newArr = JSON.parse(JSON.stringify(arr))
    newArr.reverse()
    return newArr
}

export default function Grid(props) {
    const {
        grid,
        handleColClick,
        isOver
    } = props

    return (
        <div className="grid">
            {grid.map(
                (row,i) => {
                    return (
                        <div tabindex="0" className={`grid-column ${isOver ? "" : "grid-column-accessible" }`} onClick={() => handleColClick(i)}>
                            {reverse(row).map(
                                col => (
                                    <div className="grid-box">
                                        <div className="grid-box-circle" style={{
                                            backgroundColor: col === "X" ? "var(--red)" : col === "O" ? "var(--yellow)" : isOver ? "lightgray" : "white"
                                        }}></div>
                                    </div>
                                )
                            )}
                        </div>
                    )
                }
            )}
        </div>
    )
}