import React, { useState, useEffect } from 'react';
import Tile from './pure/piece';
import '../Styles/Styles.css';
import '../Styles/PiecesStyles/Styles.css';
import Stopwatch from './pure/timer';
import '../Styles/ButtonStyle/Styles.css'
import KonamiGif from './pure/KonamiCode';

const exampleImg = require('./../Img/Part_16.jpg');
const title1 = require('./../Img/titleName.png');
const title2 = require('./../Img/titleName2.png');
const title3 = require('./../Img/titleName3.png');

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
        <div>
            {gameStarted ? (
                isGameWon ? (
                    <>
                        <div className="title">
                            <img src={title1} alt="Title"/>
                        </div>
                        <div className="title animatedFast fadeIn">
                            <img src={title3} alt="Title2"/>
                        </div>
                        <div className="finish-Box animatedFast fadeIn">
                            <div className="box2">
                                <div className="win-message">
                                    <h3>¡You Win!</h3>
                                    <p>Congratulation you completed the puzzle and catch the powerfull dugtrio.</p>
                                    <p>Do you like play again ?</p>
                                </div>
                                <button className="btn-Reset animatedFast fadeIn"  onClick={resetAll}>Reset Game</button>
                                </div>
                            </div>
                    </>
                ) : (
                    <>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <>
                                <div className="title">
                                    <img src={title1} alt="Title"/>
                                </div>
                                <div>
                                    <img src={title2} alt="Title animatedFast fadeIn"/>
                                </div>
                                <div className="puzzle animatedFast fadeIn">
                                {puzzleState.map((value, index) => (
                                    <Tile key={index} imageUrl={`images/${value}`} onClick={() => handleTileClick(index)}>
                                        <img className="piece" src={`images/${value}`} alt={`Piece ${index}`}/>
                                    </Tile>
                                ))}
                                <div className="timer">
                                    <span>Time:</span>
                                    <Stopwatch isActive={gameStarted}/>
                                </div>
                                    <div>
                                    <button  className="btn-Skip" onClick={() => setResetKey(resetKey + 1)}>Skip Game</button>
                                </div>
                                </div>
                            </>
                        )}
                    </>
                )
            ) : (
                <>
                <div className="title">
                    <img src={title1} alt="Title"/>
                </div>
                    <KonamiGif/>
                <div className="text-Box animatedFast fadeIn">
                    <div className="box">
                        <h3>Dugtrio Puzzle Game</h3>
                        <p>
                            wellcome trainer:<br/> In this game you have that complete the puzzle, for can capture a powerful pokemon.
                        </p>
                        <p>
                            How to play:<br/> You can move the especial tile <img className="example" src={exampleImg} alt="Special Tile"/> up, down, left and right, move this for complete the puzzle.
                        </p>
                        <span>Are You Ready Trainer ?</span>
                        <div style={{paddingTop: '10px'}}>
                            <button className="btn-start" onClick={() => setGameStarted(true)}>Start Game</button>
                        </div>

                    </div>
                </div>
                </>
            )}
        </div>
    );
}

export default Puzzle;