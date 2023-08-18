import React, { useState, useEffect } from 'react';
import Tile from './pure/piece';
import '../Styles/Styles.css';
import '../Styles/PiecesStyles/Styles.css';
import Stopwatch from './pure/timer';

const Puzzle = () => {
    const [puzzleState, setPuzzleState] = useState([]);
    const [isGameWon, setIsGameWon] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const size = 4;

    const imagePaths = [
        'Part_0.jpg', 'Part_1.jpg', 'Part_2.jpg', 'Part_3.jpg',
        'Part_4.jpg', 'Part_5.jpg', 'Part_6.jpg', 'Part_7.jpg',
        'Part_8.jpg', 'Part_9.jpg', 'Part_10.jpg', 'Part_11.jpg',
        'Part_12.jpg', 'Part_13.jpg', 'Part_14.jpg', 'Part_16.jpg'
    ];

    const resetAll = () => {
        setIsGameWon(false);
        setGameStarted(false);
        setLoading(true);

        setTimeout(() => {
            const shuffledImages = imagePaths.slice(0, -1).sort(() => Math.random() - 0.5);
            shuffledImages.push('Part_16.jpg');
            setPuzzleState(shuffledImages);
            setGameStarted(false);
            setLoading(false);
        }, 0);
    };

    useEffect(() => {
        resetAll();
    }, [resetKey]);

    const handleTileClick = (index) => {
        if (isGameWon) {
            return;
        }

        const emptyIndex = puzzleState.indexOf('Part_16.jpg');
        const adjacentIndexes = getAdjacentIndexes(emptyIndex);

        if (adjacentIndexes.includes(index)) {
            const newPuzzleState = [...puzzleState];
            [newPuzzleState[index], newPuzzleState[emptyIndex]] = [newPuzzleState[emptyIndex], newPuzzleState[index]];
            setPuzzleState(newPuzzleState);

            const hasWon = newPuzzleState.every((value, index) => value === imagePaths[index]);
            if (hasWon) {
                setIsGameWon(true);
            }
        }
    };

    const getAdjacentIndexes = (index) => {
        const row = Math.floor(index / size);
        const col = index % size;
        const adjacentIndexes = [];

        if (row > 0) adjacentIndexes.push(index - size);
        if (row < size - 1) adjacentIndexes.push(index + size);
        if (col > 0) adjacentIndexes.push(index - 1);
        if (col < size - 1) adjacentIndexes.push(index + 1);

        return adjacentIndexes;
    };

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )}

    return (
        <div className="puzzle">
            {gameStarted ? (
                isGameWon ? (
                    <>
                        <div className="win-message">
                            <h3>¡You Win!</h3>
                            <h5>Do you like play again ?</h5>
                        </div>
                        <button onClick={resetAll}>Reset</button>
                    </>
                ) : (
                    <>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <>
                                {puzzleState.map((value, index) => (
                                    <Tile key={index} imageUrl={`images/${value}`} onClick={() => handleTileClick(index)}>
                                        <img className="piece" src={`images/${value}`} alt={`Piece ${index}`}/>
                                    </Tile>
                                ))}
                                <div>
                                    <Stopwatch isActive={gameStarted}/>
                                    <button onClick={() => setResetKey(resetKey + 1)}>Reset</button>
                                </div>
                            </>
                        )}
                    </>
                )
            ) : (
                <div>
                    <span>Are You Ready ?</span>
                    <button onClick={() => setGameStarted(true)}>Start</button>
                </div>
            )}
        </div>
    );
}

export default Puzzle;