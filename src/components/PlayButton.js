import playButton from '../assets/images/playButton.svg';

function PlayButton(props) {
    return(
        <button {...props}>
             <img src={playButton} alt="Play Button" />
        </button>
    );
}

export default PlayButton;