import backButton from '../assets/images/backButton.png';
import styles from './Buttons.module.css'

function BackButton(props) {
    return(
        <button className={styles.backButton} {...props}>
            <img src={backButton} alt="Play Button" width={'40px'} height={'40px'}/> 
            Back
        </button>
    );
}

export default BackButton;