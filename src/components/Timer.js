import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SettingsButton from './SettingsButton';
import { useContext, useState, useEffect, useRef } from 'react';
import SettingsContext from './SettingsContext';
import styles from './Timer.module.css';
import ButtonStyles from './Buttons.module.css';

const white = '#FFFFFF';
const yellow = '#F7D44C';

function Timer() {
    const settingsInfo = useContext(SettingsContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work'); // work, break, null
    const [secondsLeft, setSecondsLeft] = useState(settingsInfo.workMinutes * 60);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);
    const lastUpdateTimeRef = useRef(Date.now());

    const tick = () => {
        const now = Date.now();
        const delta = Math.floor((now - lastUpdateTimeRef.current) / 1000);
        if (delta > 0) {
            const updatedSeconds = secondsLeftRef.current - delta;
            lastUpdateTimeRef.current = now;
            secondsLeftRef.current = updatedSeconds;

            if (updatedSeconds <= 0) {
                switchMode();
            } else {
                setSecondsLeft(updatedSeconds);
            }
        }
        if (!isPausedRef.current) {
            requestAnimationFrame(tick);
        }
    };

    const switchMode = () => {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

        setMode(nextMode);
        modeRef.current = nextMode;

        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;

        setIsPaused(true);
        isPausedRef.current = true;
    };

    useEffect(() => {
        secondsLeftRef.current = settingsInfo.workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);

        if (!isPausedRef.current) {
            requestAnimationFrame(tick);
        }

        return () => { isPausedRef.current = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settingsInfo]);

    const totalSeconds = mode === 'work'
        ? settingsInfo.workMinutes * 60
        : settingsInfo.breakMinutes * 60;
    const percentage = Math.round((secondsLeft / totalSeconds) * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if (seconds < 10) seconds = '0' + seconds;

    return (
        <div className={styles.timer}>
            <CircularProgressbar
                className={styles.CircularProgressbar}
                value={percentage}
                text={`${minutes}:${seconds}`}
                strokeWidth={0}
                styles={buildStyles({
                    textSize: '38px',
                    textColor: mode === 'work' ? white : yellow,
                    pathColor: mode === 'work' ? white : yellow
                })}
            />
            <div className={ButtonStyles.timerButton}>
                {isPaused
                    ? <PlayButton onClick={() => {
                          if (secondsLeftRef.current <= 0) {
                              switchMode();
                          }
                          setIsPaused(false);
                          isPausedRef.current = false;
                          lastUpdateTimeRef.current = Date.now();
                          requestAnimationFrame(tick);
                      }} />
                    : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
                <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
            </div>
        </div>
    );
}

export default Timer;