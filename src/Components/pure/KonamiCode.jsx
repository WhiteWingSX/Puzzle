import React, { Component } from 'react';
import KonamiPhoto from '../../Img/DittoConga.gif';
import Sound from '../../Audio/DittoConga.mp3';

class KonamiGif extends Component {
    constructor(props) {
        super(props);
        this.state = {
            konamiActivated: false,
            showGif: false
        };

        this.konamiCode = [
            38, 38, 40, 40, 37, 39, 37, 39, 66, 65
        ];
        this.konamiIndex = 0;

        this.timer = null;
        this.audio = new Audio(Sound);
        this.audio.volume = 0.1;
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        const { konamiCode, konamiIndex } = this;
        if (event.keyCode === konamiCode[konamiIndex]) {
            this.konamiIndex++;
            if (this.konamiIndex === konamiCode.length) {
                this.activateKonami();
            }
        } else {
            this.konamiIndex = 0;
        }
    };

    activateKonami = () => {
        this.audio.play();
        this.setState({ konamiActivated: true, showGif: true });

        this.timer = setTimeout(() => {
            this.audio.pause();
            this.audio.currentTime = 0;
            this.setState({ showGif: false });
        }, 9000);
    };

    render() {
        const { showGif } = this.state;

        return (
            <div className="konami-wrapper">
                {showGif && (
                    <img
                        src={KonamiPhoto}
                        alt="Animación Konami"
                        className="konami-gif"
                        style={{ width: '100px', position: 'absolute', marginTop: '80px' }}
                    />
                )}
            </div>
        );
    }
}

export default KonamiGif;
