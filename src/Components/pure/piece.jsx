import React from 'react';
import '../../Styles/Styles.css';

const Tile = ({ imageUrl, onClick }) => {
    return (
        <div className="tile" onClick={onClick}>
            {imageUrl && <img className='piece' src={imageUrl} alt="Tile" />}
        </div>
    );
};

export default Tile;